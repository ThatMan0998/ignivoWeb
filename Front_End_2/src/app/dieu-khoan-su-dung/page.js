import LegalDocument from '@/components/LegalDocument';
import content from './content.json';

export const metadata = {
  title: 'Điều khoản sử dụng | IGNIVO',
  description: 'Điều khoản về việc truy cập và sử dụng website, ứng dụng, thiết bị, phần mềm và dịch vụ của IGNIVO.',
};

export default function TermsOfUse() {
  return <LegalDocument markdown={content.markdown} title="Điều khoản sử dụng" eyebrow="ĐIỀU KHOẢN SỬ DỤNG" />;
}
