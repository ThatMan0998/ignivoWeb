"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Map input id to formData key
    const keyMap = {
      name: 'fullName',
      phone: 'phoneNumber',
      email: 'email',
      message: 'message'
    };
    
    setFormData(prev => ({
      ...prev,
      [keyMap[id]]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi gửi yêu cầu.');
      }

      setStatus('success');
      setFormData({ fullName: '', phoneNumber: '', email: '', message: '' }); // Reset form
      
      // Tự động ẩn thông báo thành công sau 5 giây
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Lỗi:', error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-foreground via-primary-dark to-primary text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              SẴN SÀNG BẢO VỆ KHÔNG GIAN?
            </h2>
            <p className="text-background-tertiary text-lg max-w-md">
              Để lại thông tin để chuyên gia của chúng tôi tư vấn giải pháp phù hợp nhất với nhu cầu của bạn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col gap-5 text-foreground relative overflow-hidden">
              
              {/* Thông báo thành công */}
              {status === 'success' && (
                <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Gửi Thành Công!</h3>
                  <p className="text-text-tertiary">Cảm ơn bạn đã liên hệ. Đội ngũ chuyên gia của chúng tôi sẽ gọi lại cho bạn trong thời gian sớm nhất.</p>
                </div>
              )}

              {/* Thông báo lỗi */}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 flex gap-3 items-start border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2">Họ và tên *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ tên của bạn"
                  className="w-full px-4 py-3 rounded-xl bg-background-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
                  disabled={status === 'loading'}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="09xx xxx xxx"
                    className="w-full px-4 py-3 rounded-xl bg-background-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-background-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
                    disabled={status === 'loading'}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2">Nhu cầu tư vấn</label>
                <textarea
                  id="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Bạn quan tâm đến gói dịch vụ nào?"
                  className="w-full px-4 py-3 rounded-xl bg-background-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none disabled:opacity-50"
                  disabled={status === 'loading'}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Gửi Yêu Cầu Tư Vấn
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
