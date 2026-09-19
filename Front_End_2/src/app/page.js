import LandingExperience from '@/components/LandingExperience';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Team from '@/components/Team';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LandingExperience><a href="#main-content" className="skip-link">Đến nội dung chính</a><main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Pricing />
      <Team />
      <FAQ />
      <ContactForm />
      <Footer />
    </main></LandingExperience>
  );
}
