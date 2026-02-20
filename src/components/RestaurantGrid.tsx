import { restaurants } from "@/data/restaurants";
import RestaurantCard from "./RestaurantCard";

const RestaurantGrid = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-display font-bold mb-5">Restaurants near you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {restaurants.map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantGrid;
