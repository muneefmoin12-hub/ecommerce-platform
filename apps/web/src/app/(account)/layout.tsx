import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
