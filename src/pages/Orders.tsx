import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

interface Order {
  id: string;
  items: any[];
  status: string;
  total: number;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  pending: "Confirmed",
  preparing: "Preparing",
  on_the_way: "On the Way",
  delivered: "Delivered",
};

const statusColors: Record<string, string> = {
  pending: "bg-primary/10 text-primary",
  preparing: "bg-accent text-accent-foreground",
  on_the_way: "bg-primary/20 text-primary",
  delivered: "bg-muted text-muted-foreground",
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setOrders(data as Order[]);
      setLoading(false);
    };
    fetch();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">My Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Package className="h-12 w-12" />
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm">Your order history will appear here</p>
            <Link to="/" className="mt-4 text-primary hover:underline text-sm font-medium">
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const itemNames = (order.items as any[])
                ?.map((i) => i.name)
                .slice(0, 3)
                .join(", ");
              const extra = (order.items as any[])?.length > 3 ? ` +${(order.items as any[]).length - 3} more` : "";
              const status = order.status || "pending";
              const date = new Date(order.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <Link
                  key={order.id}
                  to={`/order/${order.id}`}
                  className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[status] ?? statusColors.pending}`}>
                        {statusLabels[status] ?? status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {itemNames}{extra}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{date}</span>
                      <span className="font-medium text-foreground">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
