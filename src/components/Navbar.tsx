import { Link } from "react-router-dom";
import { MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { itemCount, setIsOpen } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-gradient">BiteBolt</span>
        </Link>

        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>Delivering to</span>
          <span className="font-medium text-foreground">Current Location</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
