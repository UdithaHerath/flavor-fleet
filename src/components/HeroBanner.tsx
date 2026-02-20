import { Search } from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";

const HeroBanner = () => {
  return (
    <section className="relative h-[420px] md:h-[480px] overflow-hidden">
      <img
        src={heroImg}
        alt="Delicious food spread"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-3 max-w-lg">
          Cravings delivered <span className="text-gradient">fast</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">
          Your favorite restaurants, delivered to your door in minutes.
        </p>

        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search restaurants, cuisines, dishes..."
            className="w-full bg-secondary border border-border rounded-full py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
