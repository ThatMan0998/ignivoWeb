"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsultation } from './LandingExperience';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  Building2, 
  User, 
  Clock, 
  ShieldCheck, 
  Mail, 
  Phone,
  RotateCcw
} from 'lucide-react';

const initialFormData = {
  partnerType: 'company',
  organizationName: '',
  role: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  collaborationArea: '',
  message: '',
};

const fieldClass = 'w-full px-4 py-3 rounded-xl bg-[#F4F7FB] border border-[#E0E9F5] text-[#121212] focus:border-[#0075FF] focus:bg-white focus:ring-2 focus:ring-[#0075FF]/20 outline-none transition-all disabled:opacity-50 text-sm';

const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export default function ContactForm() {
  const consultation = useConsultation();
  const selectedPackage = consultation?.selectedPackage;

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const submissionIdRef = useRef(null);

  // Auto-adapt form whenever user clicks a CTA button from Pricing or other sections
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        partnerType: selectedPackage.type || 'company',
        message: prev.message ? prev.message : (selectedPackage.hint || '')
      }));
    }
  }, [selectedPackage]);

  const isPhoneValid = !formData.phoneNumber || /^(0[3|5|7|8|9])[0-9]{8}$/.test(formData.phoneNumber.replace(/\s+/g, ''));
  const isEmailValid = !formData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleResetForm = () => {
    setStatus('idle');
    setFormData(initialFormData);
    submissionIdRef.current = generateUUID();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      if (!submissionIdRef.current) {
        submissionIdRef.current = generateUUID();
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submissionId: submissionIdRef.current
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const seconds = retryAfter ? parseInt(retryAfter, 10) : 600;
          throw new Error(`Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${seconds} giây.`);
        }
        if (response.status === 409) {
          throw new Error(data?.error || 'Nội dung không khớp với yêu cầu trước đó. Vui lòng tải lại trang.');
        }

        const fallback = 'Chưa thể gửi đề xuất hợp tác. Vui lòng thử lại sau; thông tin của bạn vẫn được giữ nguyên.';
        throw new Error(data?.error && data.error !== 'Internal Server Error' ? data.error : fallback);
      }
      if (data?.success !== true) throw new Error('Chưa xác nhận được yêu cầu đã lưu. Vui lòng thử lại sau.');

      setStatus('success');
      submissionIdRef.current = generateUUID(); // Rotate UUID on success
      
      // Tự động ẩn thông báo thành công sau 8 giây
      setTimeout(() => {
        setStatus((cur) => (cur === 'success' ? 'idle' : cur));
      }, 8000);
      
    } catch (error) {
      console.error('Lỗi:', error);
      setStatus('error');
      setErrorMessage(error instanceof TypeError ? 'Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.' : error.message);
    }
  };

  return (
    <section id="contact" className="brand-dark contact-finale py-24 lg:py-32 scroll-mt-20 lg:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Cột trái: Giá trị cam kết và thông tin liên hệ trực tiếp */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-8 lg:sticky lg:top-32"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#A9CCFF]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00C2FF]" />
                KẾT NỐI CÙNG IGNIVO
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                Liên hệ hợp tác
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-lg">
                Dù bạn là doanh nghiệp phân phối, đối tác công nghệ hay nhà thầu triển khai, chúng tôi luôn sẵn sàng lắng nghe và xây dựng cơ hội hợp tác đôi bên cùng có lợi.
              </p>
            </div>

            {/* Các điểm cộng trải nghiệm */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-[#00C2FF]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Phản hồi nhanh trong 24h</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Đội ngũ sáng lập sẽ xem xét đề xuất và liên hệ trực tiếp qua điện thoại hoặc email.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-[#00C2FF]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Chính sách đối tác minh bạch</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Mức chiết khấu cạnh tranh, hỗ trợ đào tạo kỹ thuật và đồng hành thử nghiệm PoC thực tế.</p>
                </div>
              </div>
            </div>

            {/* Thông tin hỗ trợ trực tiếp */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Hoặc kết nối trực tiếp với chúng tôi</p>
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-white">
                <a href="mailto:contact@ignivo.vn" className="flex items-center gap-2 hover:text-[#00C2FF] transition-colors">
                  <Mail className="w-4 h-4 text-primary-light" />
                  contact@ignivo.vn
                </a>
                <a href="tel:19009999" className="flex items-center gap-2 hover:text-[#00C2FF] transition-colors">
                  <Phone className="w-4 h-4 text-primary-light" />
                  1900 9999 (Hotline)
                </a>
              </div>
            </div>
          </motion.div>

          {/* Cột phải: Form nhập liệu tối ưu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40 flex flex-col gap-5 text-[#121212] relative overflow-hidden">
              
              {/* Thông báo thành công */}
              {status === 'success' && (
                <div className="absolute inset-0 bg-white/98 z-20 flex flex-col items-center justify-center text-center p-8 backdrop-blur-md transition-all">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-4 shadow-lg shadow-green-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#121212] mb-2">Đã tiếp nhận đề xuất hợp tác!</h3>
                  <p className="text-sm text-[#4B5563] max-w-sm mb-6 leading-relaxed">
                    Cảm ơn bạn đã quan tâm hợp tác cùng IGNIVO. Chúng tôi đã nhận được thông tin và sẽ phản hồi trong vòng <strong>24 giờ làm việc</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-[#F4F7FB] text-sm font-semibold text-[#121212] hover:bg-border transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Gửi thêm đề xuất khác
                  </button>
                </div>
              )}

              {/* Thông báo lỗi */}
              {status === 'error' && (
                <div role="alert" className="p-4 rounded-xl bg-red-50 text-red-600 flex gap-3 items-start border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Banner ngữ cảnh gói dịch vụ khi được chuyển từ nút CTA */}
              <AnimatePresence>
                {selectedPackage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-primary/10 border border-primary/25 text-xs shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
                        {selectedPackage.type === 'company' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </span>
                      <div>
                        <p className="font-bold text-[#121212]">
                          Đang quan tâm: <span className="text-primary font-bold">{selectedPackage.title}</span>
                        </p>
                        <p className="text-[#666666] text-[11px]">Hệ thống đã tự động chọn tư cách và gợi ý nội dung phù hợp cho bạn.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => consultation?.clearPackage()}
                      className="text-[11px] font-bold text-primary hover:text-primary-dark shrink-0 underline ml-2"
                    >
                      Bỏ chọn
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Lựa chọn tư cách */}
              <fieldset disabled={status === 'loading'}>
                <legend className="block text-sm font-bold mb-2.5 text-[#121212]">
                  Bạn liên hệ với tư cách <span className="text-red-500">*</span>
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'company', label: 'Doanh nghiệp / Tổ chức', icon: Building2 },
                    { value: 'individual', label: 'Cá nhân / Chuyên gia', icon: User }
                  ].map(({ value, label, icon: Icon }) => (
                    <label 
                      key={value} 
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-all focus-within:ring-2 focus-within:ring-[#0075FF] focus-within:ring-offset-2 ${
                        formData.partnerType === value 
                          ? 'border-[#0075FF] bg-[#EAF3FF] text-[#004BCC] shadow-sm' 
                          : 'border-[#E0E9F5] bg-[#F4F7FB] text-[#4B5563] hover:border-[#0075FF]'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="partnerType" 
                        value={value} 
                        checked={formData.partnerType === value} 
                        onChange={() => setFormData(prev => ({ ...prev, partnerType: value, organizationName: '' }))} 
                        className="sr-only" 
                      />
                      <Icon className="w-4 h-4 shrink-0" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Tên công ty (chỉ hiện khi chọn Doanh nghiệp) */}
              {formData.partnerType === 'company' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label htmlFor="organizationName" className="block text-sm font-bold mb-1.5 text-[#121212]">
                    Tên công ty / tổ chức <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="organizationName" 
                    maxLength={150} 
                    required 
                    autoComplete="organization" 
                    value={formData.organizationName} 
                    onChange={handleChange} 
                    placeholder="Ví dụ: Công ty Cổ phần Công nghệ An Toàn Việt Nam" 
                    className={fieldClass} 
                    disabled={status === 'loading'} 
                  />
                </motion.div>
              )}

              {/* Họ tên & Chức vụ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-bold mb-1.5 text-[#121212]">
                    Người liên hệ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    maxLength={100}
                    required
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className={fieldClass}
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-bold mb-1.5 text-[#121212]">
                    {formData.partnerType === 'company' ? 'Chức vụ / Bộ phận' : 'Chuyên môn / Nghề nghiệp'}
                  </label>
                  <input 
                    type="text" 
                    id="role" 
                    maxLength={100} 
                    value={formData.role} 
                    onChange={handleChange} 
                    placeholder={formData.partnerType === 'company' ? 'Ví dụ: Giám đốc Kinh doanh' : 'Ví dụ: Kỹ sư PCCC, Nhà đầu tư'} 
                    className={fieldClass} 
                    disabled={status === 'loading'} 
                  />
                </div>
              </div>

              {/* SĐT & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="phoneNumber" className="text-sm font-bold text-[#121212]">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    {!isPhoneValid && (
                      <span className="text-[11px] text-amber-600 font-medium">10 số (03x, 05x, 07x, 08x, 09x)</span>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    maxLength={20}
                    required
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="09xx xxx xxx"
                    className={`${fieldClass} ${!isPhoneValid ? 'border-amber-400 focus:border-amber-500' : ''}`}
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="email" className="text-sm font-bold text-[#121212]">
                      Email <span className="text-red-500">*</span>
                    </label>
                    {!isEmailValid && (
                      <span className="text-[11px] text-amber-600 font-medium">Email chưa đúng định dạng</span>
                    )}
                  </div>
                  <input
                    type="email"
                    id="email"
                    maxLength={100}
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@company.com"
                    className={`${fieldClass} ${!isEmailValid ? 'border-amber-400 focus:border-amber-500' : ''}`}
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              {/* Lĩnh vực hợp tác */}
              <div>
                <label htmlFor="collaborationArea" className="block text-sm font-bold mb-1.5 text-[#121212]">
                  Lĩnh vực bạn quan tâm <span className="text-red-500">*</span>
                </label>
                <select 
                  id="collaborationArea" 
                  required 
                  value={formData.collaborationArea} 
                  onChange={handleChange} 
                  className={fieldClass} 
                  disabled={status === 'loading'}
                >
                  <option value="">Chọn lĩnh vực hợp tác phù hợp</option>
                  <option value="distribution">Đại lý & Phân phối thiết bị IGNIVO</option>
                  <option value="technology">Tích hợp phần mềm & Giải pháp công nghệ (API / IoT)</option>
                  <option value="deployment">Nhà thầu thi công, lắp đặt & bảo trì dự án</option>
                  <option value="investment">Đầu tư, đồng hành chiến lược hoặc tài trợ</option>
                  <option value="other">Hình thức hợp tác khác</option>
                </select>
              </div>

              {/* Nội dung đề xuất */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="message" className="text-sm font-bold text-[#121212]">
                    Nội dung đề xuất sơ bộ <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-[#6B7280]">
                    {formData.message.length}/4500 ký tự
                  </span>
                </div>
                <textarea
                  id="message"
                  maxLength={4500}
                  rows="3"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Chia sẻ ngắn gọn về quy mô, khu vực triển khai, hoặc mong muốn hợp tác cụ thể cùng IGNIVO..."
                  className={`${fieldClass} resize-y min-h-[90px]`}
                  disabled={status === 'loading'}
                ></textarea>
                <p className="mt-1 text-[11px] text-[#6B7280]">
                  💡 Càng cung cấp thông tin rõ ràng, đội ngũ chúng tôi càng chuẩn bị phương án trao đổi chu đáo nhất.
                </p>
              </div>

              {/* Nút gửi đề xuất */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-1 w-full flex items-center justify-center gap-2 bg-[#0075FF] text-white font-bold py-3.5 rounded-xl hover:bg-[#004BCC] transition-all shadow-lg shadow-[#0075FF]/25 hover:shadow-xl hover:shadow-[#0075FF]/30 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang gửi thông tin...
                  </>
                ) : (
                  <>
                    Gửi đề xuất hợp tác
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Cam kết bảo mật (Micro-copy) */}
              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#6B7280]">
                <Lock className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>IGNIVO cam kết bảo mật thông tin liên hệ và chỉ sử dụng cho mục đích trao đổi hợp tác.</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
