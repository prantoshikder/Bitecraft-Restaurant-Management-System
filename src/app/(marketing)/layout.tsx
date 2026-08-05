import JsonLd from "@/components/seo/JsonLd";
import { CartButton, CartDrawer } from "@/components/site/CartDrawer";
import { CartProvider } from "@/components/site/CartProvider";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import ScrollToTop from "@/components/site/ScrollToTop";
import { list } from "@/lib/db";
import { restaurantSchema, websiteSchema } from "@/lib/seo";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Business + site identity, emitted once on every public page. Individual
  // pages add their own (breadcrumbs, FAQ, articles) on top of this.
  const reviews = list("reviews");

  return (
    <CartProvider>
      <JsonLd data={[restaurantSchema(reviews), websiteSchema()]} />
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
