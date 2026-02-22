import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, ShoppingBag, User, LogOut, ClipboardList } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const { itemCount, setIsOpen } = useCart();
  const { user, signOut } = useAuth();
  const [addressLabel, setAddressLabel] = useState("Current Location");

  useEffect(() => {
    if (!user) { setAddressLabel("Current Location"); return; }
    const fetchAddr = async () => {
      const { data } = await supabase
        .from("delivery_addresses")
        .select("label, address_line1, city")
        .eq("user_id", user.id)
        .eq("is_default", true)
        .maybeSingle();
      if (data) {
        setAddressLabel(`${data.address_line1}, ${data.city}`);
      }
    };
    fetchAddr();
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-gradient">BiteBolt</span>
        </Link>

        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground max-w-xs">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="flex-shrink-0">Delivering to</span>
          <span className="font-medium text-foreground truncate">{addressLabel}</span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/orders"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ClipboardList className="h-4 w-4" />
                <span className="hidden md:inline">Orders</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Profile</span>
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          )}
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
      </div>
    </nav>
  );
};

export default Navbar;
