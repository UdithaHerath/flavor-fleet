import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import sushiImg from "@/assets/sushi.jpg";
import tacosImg from "@/assets/tacos.jpg";
import chickenImg from "@/assets/chicken.jpg";
import pastaImg from "@/assets/pasta.jpg";
import pokeBowlImg from "@/assets/poke-bowl.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  featured?: boolean;
  menu: MenuItem[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  { id: "burgers", name: "Burgers", image: burgerImg },
  { id: "pizza", name: "Pizza", image: pizzaImg },
  { id: "sushi", name: "Sushi", image: sushiImg },
  { id: "tacos", name: "Mexican", image: tacosImg },
  { id: "chicken", name: "Chicken", image: chickenImg },
  { id: "pasta", name: "Pasta", image: pastaImg },
  { id: "bowls", name: "Bowls", image: pokeBowlImg },
];

export const restaurants: Restaurant[] = [
  {
    id: "burger-barn",
    name: "Burger Barn",
    image: burgerImg,
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    featured: true,
    menu: [
      { id: "bb-1", name: "Classic Smash Burger", description: "Double patty with American cheese, lettuce, tomato, special sauce", price: 12.99, image: burgerImg, popular: true },
      { id: "bb-2", name: "Bacon BBQ Burger", description: "Crispy bacon, cheddar, BBQ sauce, onion rings", price: 14.99, image: burgerImg },
      { id: "bb-3", name: "Mushroom Swiss Burger", description: "Sautéed mushrooms, Swiss cheese, truffle aioli", price: 13.99, image: burgerImg },
      { id: "bb-4", name: "Loaded Fries", description: "Cheese sauce, bacon bits, jalapeños, sour cream", price: 8.99, image: burgerImg },
    ],
  },
  {
    id: "pizza-palace",
    name: "Pizza Palace",
    image: pizzaImg,
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 1.99,
    featured: true,
    menu: [
      { id: "pp-1", name: "Margherita", description: "Fresh mozzarella, basil, San Marzano tomato sauce", price: 14.99, image: pizzaImg, popular: true },
      { id: "pp-2", name: "Pepperoni Supreme", description: "Loaded pepperoni, mozzarella, oregano", price: 16.99, image: pizzaImg },
      { id: "pp-3", name: "Truffle Mushroom", description: "Wild mushrooms, truffle oil, fontina cheese", price: 18.99, image: pizzaImg },
      { id: "pp-4", name: "Garlic Knots", description: "Fresh baked with garlic butter and parmesan", price: 6.99, image: pizzaImg },
    ],
  },
  {
    id: "sushi-zen",
    name: "Sushi Zen",
    image: sushiImg,
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: 3.99,
    menu: [
      { id: "sz-1", name: "Dragon Roll", description: "Eel, avocado, cucumber, unagi sauce", price: 16.99, image: sushiImg, popular: true },
      { id: "sz-2", name: "Salmon Sashimi", description: "12 pieces of fresh Atlantic salmon", price: 19.99, image: sushiImg },
      { id: "sz-3", name: "Spicy Tuna Roll", description: "Fresh tuna, spicy mayo, tempura crunch", price: 14.99, image: sushiImg },
      { id: "sz-4", name: "Edamame", description: "Steamed and lightly salted", price: 5.99, image: sushiImg },
    ],
  },
  {
    id: "taco-fiesta",
    name: "Taco Fiesta",
    image: tacosImg,
    cuisine: "Mexican",
    rating: 4.6,
    deliveryTime: "15-25 min",
    deliveryFee: 1.49,
    featured: true,
    menu: [
      { id: "tf-1", name: "Street Tacos (3)", description: "Carne asada, onion, cilantro, salsa verde", price: 11.99, image: tacosImg, popular: true },
      { id: "tf-2", name: "Burrito Bowl", description: "Rice, beans, your choice of protein, pico, guac", price: 13.99, image: tacosImg },
      { id: "tf-3", name: "Loaded Nachos", description: "Chips, cheese, jalapeños, sour cream, guacamole", price: 10.99, image: tacosImg },
      { id: "tf-4", name: "Churros", description: "Cinnamon sugar with chocolate dipping sauce", price: 7.99, image: tacosImg },
    ],
  },
  {
    id: "cluck-shack",
    name: "Cluck Shack",
    image: chickenImg,
    cuisine: "American",
    rating: 4.4,
    deliveryTime: "20-30 min",
    deliveryFee: 2.49,
    menu: [
      { id: "cs-1", name: "Crispy Chicken Sandwich", description: "Buttermilk fried chicken, pickles, spicy mayo", price: 11.99, image: chickenImg, popular: true },
      { id: "cs-2", name: "Wings (10 pc)", description: "Choice of buffalo, garlic parm, or BBQ", price: 14.99, image: chickenImg },
      { id: "cs-3", name: "Chicken Tenders", description: "Hand-breaded with honey mustard", price: 10.99, image: chickenImg },
      { id: "cs-4", name: "Coleslaw", description: "Creamy house-made coleslaw", price: 4.99, image: chickenImg },
    ],
  },
  {
    id: "pasta-co",
    name: "Pasta & Co.",
    image: pastaImg,
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    menu: [
      { id: "pc-1", name: "Carbonara", description: "Guanciale, egg yolk, pecorino, black pepper", price: 15.99, image: pastaImg, popular: true },
      { id: "pc-2", name: "Truffle Fettuccine", description: "Black truffle cream sauce, parmesan", price: 18.99, image: pastaImg },
      { id: "pc-3", name: "Bolognese", description: "Slow-cooked beef ragù, pappardelle", price: 16.99, image: pastaImg },
      { id: "pc-4", name: "Tiramisu", description: "Classic Italian dessert with espresso", price: 8.99, image: pastaImg },
    ],
  },
];
