import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, Plus } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <Link to="/" className="absolute top-5 left-5 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-background transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{restaurant.cuisine}</span>
            <div className="flex items-center gap-1 text-success">
              <Star className="h-4 w-4 fill-current" />
              {restaurant.rating}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {restaurant.deliveryTime}
            </div>
            <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
          </div>
        </div>

        {/* Menu */}
        <section className="pb-16">
          <h2 className="text-xl font-display font-bold mb-5">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurant.menu.map((item, i) => (
              <div
                key={item.id}
                className="flex gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    {item.popular && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                  <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                </div>
                <div className="relative flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                  <button
                    onClick={() => addItem(item, restaurant.id, restaurant.name)}
                    className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg hover:opacity-90 transition-opacity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantDetail;
