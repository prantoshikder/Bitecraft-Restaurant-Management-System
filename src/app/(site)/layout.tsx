import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ScrollToTop from "@/components/site/ScrollToTop";
import { CartProvider } from "@/components/site/CartProvider";
import { CartButton, CartDrawer } from "@/components/site/CartDrawer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <CartButton />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
