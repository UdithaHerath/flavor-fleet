import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, total, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      setIsOpen(false);
      navigate("/auth");
      return;
    }
    setPlacing(true);
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      items: JSON.parse(JSON.stringify(items)),
      subtotal: total,
      delivery_fee: 2.99,
      total: total + 2.99,
    });
    setPlacing(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      clearCart();
      setIsOpen(false);
      toast({ title: "Order placed!", description: "Your food is on the way 🎉" });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col animate-slide-in">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-display font-bold">Your Order</h2>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-2 p-8">
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm">Add items from a restaurant to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <p className="text-sm text-muted-foreground">{items[0]?.restaurantName}</p>
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-secondary/50 rounded-lg p-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-primary font-semibold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">${(total + 2.99).toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {placing ? "Placing..." : user ? "Place Order" : "Sign in to Order"}
              </button>
              <button onClick={clearCart} className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors">
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
