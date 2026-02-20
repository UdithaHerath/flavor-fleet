import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Restaurant } from "@/data/restaurants";

interface Props {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, index }: Props) => {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative h-44 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {restaurant.featured && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
              Featured
            </span>
          )}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-card to-transparent" />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded-full text-sm font-medium">
              <Star className="h-3.5 w-3.5 fill-current" />
              {restaurant.rating}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {restaurant.deliveryTime}
            </div>
            <span className="text-border">•</span>
            <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
