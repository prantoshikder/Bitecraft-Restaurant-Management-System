export type ID = string;

export type Category = {
  id: ID;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  active: boolean;
};

export type Dish = {
  id: ID;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  categoryId: ID;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  spicy: 0 | 1 | 2 | 3;
  veg: boolean;
  prepTime: number;
  calories: number;
  available: boolean;
  featured: boolean;
  todaysMenu: boolean;
  createdAt: string;
};

export type OrderItem = {
  dishId: ID;
  name: string;
  price: number;
  qty: number;
};

export type OrderStatus = "pending" | "preparing" | "ready" | "served" | "completed" | "cancelled";
export type OrderType = "dine-in" | "takeaway" | "delivery";

export type Order = {
  id: ID;
  code: string;
  customerName: string;
  phone: string;
  address?: string;
  type: OrderType;
  tableId?: ID | null;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "cash" | "card" | "online";
  paid: boolean;
  note?: string;
  createdAt: string;
};

export type ReservationStatus = "pending" | "confirmed" | "seated" | "cancelled" | "completed";

export type Reservation = {
  id: ID;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableId?: ID | null;
  message?: string;
  status: ReservationStatus;
  createdAt: string;
};

export type Table = {
  id: ID;
  number: string;
  capacity: number;
  zone: "Indoor" | "Outdoor" | "Rooftop" | "VIP";
  status: "available" | "occupied" | "reserved" | "cleaning";
};

export type Customer = {
  id: ID;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  orders: number;
  spent: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  joinedAt: string;
};

export type Staff = {
  id: ID;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  salary: number;
  shift: "Morning" | "Evening" | "Night";
  status: "active" | "on-leave" | "inactive";
  joinedAt: string;
};

export type Chef = {
  id: ID;
  name: string;
  title: string;
  image: string;
  rating: number;
  experience: number;
  speciality: string;
  socials: { facebook?: string; instagram?: string; twitter?: string };
  featured: boolean;
};

export type InventoryItem = {
  id: ID;
  name: string;
  unit: string;
  quantity: number;
  threshold: number;
  costPerUnit: number;
  supplierId?: ID;
  updatedAt: string;
};

export type Supplier = {
  id: ID;
  name: string;
  contact: string;
  phone: string;
  email: string;
  items: string;
  status: "active" | "inactive";
};

export type Offer = {
  id: ID;
  title: string;
  subtitle: string;
  code: string;
  discount: number;
  image: string;
  validFrom: string;
  validTo: string;
  active: boolean;
};

export type Post = {
  id: ID;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: string;
  author: string;
  category: string;
  date: string;
  published: boolean;
};

export type GalleryImage = {
  id: ID;
  title: string;
  url: string;
  category: string;
  createdAt: string;
};

export type Review = {
  id: ID;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
};

export type RestaurantEvent = {
  id: ID;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  published: boolean;
};

export type Message = {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type Subscriber = {
  id: ID;
  email: string;
  createdAt: string;
};

export type Settings = {
  id: ID;
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  openHours: string;
  weekendHours: string;
  currency: string;
  taxRate: number;
  deliveryFee: number;
  socials: { facebook: string; instagram: string; twitter: string; youtube: string };
};

export type DB = {
  categories: Category[];
  dishes: Dish[];
  orders: Order[];
  reservations: Reservation[];
  tables: Table[];
  customers: Customer[];
  staff: Staff[];
  chefs: Chef[];
  inventory: InventoryItem[];
  suppliers: Supplier[];
  offers: Offer[];
  posts: Post[];
  gallery: GalleryImage[];
  reviews: Review[];
  events: RestaurantEvent[];
  messages: Message[];
  subscribers: Subscriber[];
  settings: Settings[];
};

export type Resource = keyof DB;
