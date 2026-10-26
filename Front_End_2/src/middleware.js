import { NextResponse } from 'next/server';

// Basic in-memory store for rate limiting (Note: In a true serverless/edge environment, 
// this is isolated per instance. For production with multiple instances, use Redis/KV).
const ipRateLimit = new Map();

// Cleans up old entries every minute to prevent memory leak
const CLEANUP_INTERVAL = 60000;
let lastCleanup = Date.now();

function cleanupRateLimit() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [ip, data] of ipRateLimit.entries()) {
      if (now > data.resetTime) {
        ipRateLimit.delete(ip);
      }
    }
    lastCleanup = now;
  }
}

export function middleware(request) {
  if (request.nextUrl.pathname === '/api/contact' && request.method === 'POST') {
    cleanupRateLimit();

    // 1. Trích xuất và chuẩn hóa IP an toàn
    // Lấy IP từ header, ưu tiên x-forwarded-for do Netlify/Vercel cung cấp
    let ip = request.ip || 
             request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
             request.headers.get('x-real-ip') || 
             'unknown';

    // 2. Kiểm tra Rate Limit
    const now = Date.now();
    const limit = 5; // 5 requests
    const windowMs = 10 * 60 * 1000; // 10 minutes

    const ipData = ipRateLimit.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > ipData.resetTime) {
      ipData.count = 1;
      ipData.resetTime = now + windowMs;
    } else {
      ipData.count += 1;
    }

    ipRateLimit.set(ip, ipData);

    if (ipData.count > limit) {
      const retryAfterSeconds = Math.ceil((ipData.resetTime - now) / 1000);
      return new NextResponse(
        JSON.stringify({ error: 'Too Many Requests' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfterSeconds.toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': ipData.resetTime.toString()
          }
        }
      );
    }
    
    // Thêm IP đã chuẩn hóa vào header để route.js có thể sử dụng lại mà không cần parse lại
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-sanitized-ip', ip);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/contact',
};
