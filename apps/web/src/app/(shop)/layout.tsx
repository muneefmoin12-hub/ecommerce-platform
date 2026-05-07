import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
