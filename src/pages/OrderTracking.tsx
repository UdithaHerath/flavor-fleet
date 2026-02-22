import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, ChefHat, Bike, MapPin, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { restaurants } from "@/data/restaurants";
import Navbar from "@/components/Navbar";

interface OrderData {
  id: string;
  items: any;
  status: string;
  total: number;
  created_at: string;
}

const steps = [
  { key: "confirmed", label: "Order Confirmed", icon: CheckCircle2, description: "Your order has been received" },
  { key: "preparing", label: "Preparing Food", icon: ChefHat, description: "The restaurant is cooking your meal" },
  { key: "on_the_way", label: "On the Way", icon: Bike, description: "Your rider is heading to you" },
  { key: "delivered", label: "Delivered", icon: MapPin, description: "Enjoy your meal!" },
];

const OrderTracking = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      const { data } = await supabase.from("orders").select("*").eq("id", id).single();
      if (data) setOrder(data as OrderData);
    };
    const fetchAddress = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("delivery_addresses")
        .select("address_line1, city, state, zip_code")
        .eq("user_id", user.id)
        .eq("is_default", true)
        .maybeSingle();
      if (data) {
        setDeliveryAddress(`${data.address_line1}, ${data.city}, ${data.state} ${data.zip_code}`);
      }
    };
    fetchOrder();
    fetchAddress();
  }, [id, user]);

  // Simulate progression through steps
  useEffect(() => {
    if (!order) return;
    const timers = [
      setTimeout(() => setActiveStep(1), 3000),
      setTimeout(() => setActiveStep(2), 8000),
      setTimeout(() => setActiveStep(3), 15000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [order]);

  // Find restaurant from order items
  const restaurantId = order?.items?.[0]?.restaurantId;
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const restaurantQuery = restaurant
    ? encodeURIComponent(restaurant.address)
    : encodeURIComponent("New York, NY");

  const deliveryQuery = deliveryAddress
    ? encodeURIComponent(deliveryAddress)
    : null;

  // Build map URL: show directions from restaurant to delivery address when on the way
  const mapSrc = activeStep >= 2 && deliveryQuery
    ? `https://www.google.com/maps/embed/v1/directions?key=&origin=${restaurantQuery}&destination=${deliveryQuery}`
    : `https://www.google.com/maps?q=${restaurantQuery}&output=embed`;

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading order...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">Order Tracking</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Order #{order.id.slice(0, 8).toUpperCase()} • {restaurant?.name ?? "Restaurant"}
        </p>

        {/* Status Steps */}
        <div className="space-y-0 mb-10">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isDone = i < activeStep;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex gap-4">
                {/* Line + Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isDone
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground animate-pulse"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-12 transition-all duration-500 ${
                        isDone ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="pt-1.5 pb-6">
                  <h3
                    className={`font-semibold transition-colors ${
                      isDone || isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {isActive && (
                    <div className="flex items-center gap-1 text-xs text-primary mt-1">
                      <Clock className="h-3 w-3" />
                      In progress…
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Locations */}
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <div className="bg-card px-4 py-3 border-b border-border space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm"><span className="font-medium">Restaurant:</span> {restaurant?.address ?? "Unknown"}</span>
            </div>
            {deliveryAddress && (
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                <span className="text-sm"><span className="font-medium">Delivery to:</span> {deliveryAddress}</span>
              </div>
            )}
          </div>
          <iframe
            title="Delivery Map"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${restaurantQuery}&output=embed`}
          />
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2">
            {(order.items as any[])?.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}× {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
