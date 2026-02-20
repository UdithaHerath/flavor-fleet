import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryScroll from "@/components/CategoryScroll";
import RestaurantGrid from "@/components/RestaurantGrid";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <HeroBanner />
      <CategoryScroll />
      <RestaurantGrid />
      <footer className="border-t border-border py-8 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 BiteBolt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
