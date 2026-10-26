import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ignivo.vn"),
  title: {
    default: "IGNIVO | Nền Tảng Giám Sát An Toàn & Cảnh Báo AIoT",
    template: "%s | IGNIVO"
  },
  description: "Giải pháp nâng tầm camera IP hiện hữu thành hệ thống an toàn chủ động với AI Edge Box RK3576, mô hình Computer Vision và ứng dụng giám sát WebRTC thời gian thực.",
  keywords: [
    "IGNIVO", 
    "Camera AI", 
    "Báo cháy thông minh", 
    "Computer Vision", 
    "Edge Computing", 
    "RK3576 NPU", 
    "SafetyTech", 
    "AIoT",
    "Cấp phép công nghệ",
    "FPT University"
  ],
  authors: [{ name: "IGNIVO Team - FPT University" }],
  creator: "IGNIVO",
  openGraph: {
    title: "IGNIVO | Nền Tảng Giám Sát An Toàn & Cảnh Báo AIoT",
    description: "Biến camera IP có sẵn thành hệ thống an toàn thông minh bằng AI Edge Computing. Cảnh báo sớm, bảo vệ kịp thời.",
    url: "https://ignivo.vn",
    siteName: "IGNIVO SafetyTech",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "IGNIVO Logo"
      }
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNIVO | Nền Tảng Giám Sát An Toàn & Cảnh Báo AIoT",
    description: "Biến camera IP có sẵn thành hệ thống an toàn thông minh bằng AI Edge Computing.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
