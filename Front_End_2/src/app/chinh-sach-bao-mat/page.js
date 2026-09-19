import LegalDocument from '@/components/LegalDocument';
import content from './content.json';

export const metadata = {
  title: 'Chính sách bảo mật | IGNIVO',
  description: 'Thông tin về cách IGNIVO thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ dữ liệu cá nhân, cùng các quyền của người dùng.',
};

export default function PrivacyPolicy() {
  return <LegalDocument markdown={content.markdown} title="Chính sách bảo mật" eyebrow="QUYỀN RIÊNG TƯ" />;
}
