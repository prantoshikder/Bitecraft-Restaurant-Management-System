import { IMG, avatar } from "./images";
import type { DB } from "./types";

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const daysAhead = (n: number) => new Date(Date.now() + n * 86400000).toISOString();
const dateOnly = (iso: string) => iso.slice(0, 10);

export function buildSeed(): DB {
  const categories: DB["categories"] = [
    { id: "cat-1", name: "Burger", slug: "burger", icon: "burger", image: IMG.categories[0], itemCount: 12, active: true },
    { id: "cat-2", name: "Pizza", slug: "pizza", icon: "pizza", image: IMG.categories[1], itemCount: 18, active: true },
    { id: "cat-3", name: "Pasta", slug: "pasta", icon: "pasta", image: IMG.categories[2], itemCount: 10, active: true },
    { id: "cat-4", name: "Salad", slug: "salad", icon: "salad", image: IMG.categories[3], itemCount: 14, active: true },
    { id: "cat-5", name: "Dessert", slug: "dessert", icon: "dessert", image: IMG.categories[4], itemCount: 9, active: true },
    { id: "cat-6", name: "Drinks", slug: "drinks", icon: "drinks", image: IMG.categories[5], itemCount: 16, active: true },
  ];

  const dishSpecs: Array<[string, string, number, number | undefined, string, number, number, string[], 0 | 1 | 2 | 3, boolean, number, number, boolean, boolean]> = [
    ["Grilled Salmon", "Classic with lemon butter sauce, served with seasonal greens.", 24.9, 29.9, "cat-4", 4.8, 128, ["Chef's Pick", "Healthy"], 0, false, 25, 480, true, false],
    ["Spaghetti Carbonara", "Classic Italian pasta with crispy pancetta and parmesan.", 18.5, undefined, "cat-3", 4.6, 96, ["Bestseller"], 1, false, 18, 620, true, true],
    ["Beef Burger", "Juicy patty with cheddar cheese, fries and house sauce.", 16.9, 19.9, "cat-1", 4.7, 214, ["Popular"], 1, false, 15, 780, true, true],
    ["Margherita Pizza", "Fresh basil, san marzano tomato & buffalo mozzarella.", 17.9, undefined, "cat-2", 4.5, 178, ["Vegetarian"], 0, true, 20, 690, true, true],
    ["Tomato Bruschetta", "Grilled bread with tomato & basil, drizzled with olive oil.", 7.9, undefined, "cat-4", 4.4, 62, ["Starter"], 0, true, 10, 210, false, true],
    ["Creamy Mushroom Soup", "Rich and creamy mushroom bisque with truffle oil.", 6.5, 8.0, "cat-4", 4.3, 54, ["Starter", "Warm"], 0, true, 12, 260, false, true],
    ["Grilled Chicken Steak", "Served with mashed potato & seasonal vegetables.", 19.5, 22.0, "cat-1", 4.9, 143, ["Chef's Pick"], 2, false, 28, 720, true, true],
    ["Chocolate Lava Cake", "Warm chocolate cake with molten centre & vanilla gelato.", 8.5, undefined, "cat-5", 4.9, 201, ["Dessert", "Sweet"], 0, true, 14, 420, true, true],
    ["Caesar Salad", "Crisp romaine, parmesan shavings and garlic croutons.", 11.9, undefined, "cat-4", 4.2, 87, ["Healthy"], 0, true, 10, 320, false, false],
    ["Pepperoni Pizza", "Double pepperoni, mozzarella and spicy tomato base.", 19.9, 23.5, "cat-2", 4.7, 165, ["Popular", "Spicy"], 2, false, 22, 860, true, false],
    ["Penne Arrabbiata", "Spicy tomato sauce, chilli flakes and fresh herbs.", 15.5, undefined, "cat-3", 4.4, 72, ["Spicy", "Vegetarian"], 3, true, 16, 540, false, false],
    ["Berry Cheesecake", "New York style cheesecake with mixed berry compote.", 9.5, undefined, "cat-5", 4.8, 119, ["Dessert"], 0, true, 8, 460, true, false],
    ["Iced Caramel Latte", "Double espresso, milk, caramel and a hint of sea salt.", 5.5, undefined, "cat-6", 4.6, 143, ["Cold"], 0, true, 6, 190, false, false],
    ["Fresh Mojito", "Lime, mint, soda and cane sugar — zero alcohol.", 6.9, undefined, "cat-6", 4.5, 98, ["Cold", "Refreshing"], 0, true, 5, 150, true, false],
    ["Buddha Bowl", "Quinoa, avocado, chickpea and tahini dressing.", 14.5, undefined, "cat-4", 4.7, 84, ["Vegan", "Healthy"], 0, true, 15, 430, false, false],
    ["Crispy Chicken Burger", "Buttermilk fried chicken, slaw and chipotle mayo.", 15.9, 18.5, "cat-1", 4.6, 156, ["Popular"], 2, false, 17, 810, false, false],
  ];

  const dishes: DB["dishes"] = dishSpecs.map((d, i) => ({
    id: `dish-${i + 1}`,
    name: d[0],
    slug: d[0].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: d[1],
    price: d[2],
    oldPrice: d[3],
    categoryId: d[4],
    image: IMG.dishes[i % IMG.dishes.length],
    rating: d[5],
    reviews: d[6],
    tags: d[7],
    spicy: d[8],
    veg: d[9],
    prepTime: d[10],
    calories: d[11],
    available: true,
    featured: d[12],
    todaysMenu: d[13],
    createdAt: daysAgo(60 - i),
  }));

  const tables: DB["tables"] = [
    { id: "tbl-1", number: "T-01", capacity: 2, zone: "Indoor", status: "available" },
    { id: "tbl-2", number: "T-02", capacity: 4, zone: "Indoor", status: "occupied" },
    { id: "tbl-3", number: "T-03", capacity: 4, zone: "Indoor", status: "available" },
    { id: "tbl-4", number: "T-04", capacity: 6, zone: "Outdoor", status: "reserved" },
    { id: "tbl-5", number: "T-05", capacity: 2, zone: "Outdoor", status: "available" },
    { id: "tbl-6", number: "T-06", capacity: 8, zone: "Rooftop", status: "occupied" },
    { id: "tbl-7", number: "T-07", capacity: 4, zone: "Rooftop", status: "cleaning" },
    { id: "tbl-8", number: "T-08", capacity: 10, zone: "VIP", status: "available" },
    { id: "tbl-9", number: "T-09", capacity: 2, zone: "Indoor", status: "available" },
    { id: "tbl-10", number: "T-10", capacity: 6, zone: "VIP", status: "reserved" },
  ];

  const customerNames = [
    "Emily Robinson", "Michael Turner", "Sarah Lawson", "David Kim", "Olivia Bennett",
    "James Carter", "Sophia Nguyen", "Daniel Foster", "Ava Mitchell", "Ethan Brooks",
    "Isabella Reed", "Liam Sullivan",
  ];

  const customers: DB["customers"] = customerNames.map((name, i) => {
    const orders = 3 + ((i * 7) % 26);
    const spent = Math.round((orders * (28 + (i % 5) * 11)) * 100) / 100;
    return {
      id: `cus-${i + 1}`,
      name,
      email: `${name.toLowerCase().split(" ")[0]}${i + 1}@example.com`,
      phone: `+1 (212) 555-${String(1000 + i * 37).slice(0, 4)}`,
      avatar: avatar(i + 5),
      orders,
      spent,
      tier: spent > 900 ? "Platinum" : spent > 600 ? "Gold" : spent > 300 ? "Silver" : "Bronze",
      joinedAt: daysAgo(400 - i * 21),
    };
  });

  const statuses: DB["orders"][number]["status"][] = ["pending", "preparing", "ready", "served", "completed", "cancelled"];
  const types: DB["orders"][number]["type"][] = ["dine-in", "takeaway", "delivery"];

  const orders: DB["orders"] = Array.from({ length: 42 }, (_, i) => {
    const customer = customers[i % customers.length];
    const itemCount = 1 + (i % 4);
    const items = Array.from({ length: itemCount }, (_, j) => {
      const dish = dishes[(i * 3 + j * 5) % dishes.length];
      const qty = 1 + ((i + j) % 3);
      return { dishId: dish.id, name: dish.name, price: dish.price, qty };
    });
    const subtotal = Math.round(items.reduce((s, it) => s + it.price * it.qty, 0) * 100) / 100;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const discount = i % 6 === 0 ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
    const type = types[i % 3];
    const status = i < 6 ? statuses[i % 4] : statuses[(i % 6)];
    return {
      id: `ord-${i + 1}`,
      code: `#BC${String(2401 + i)}`,
      customerName: customer.name,
      phone: customer.phone,
      address: type === "delivery" ? `${100 + i} Food Street, Melbourne` : undefined,
      type,
      tableId: type === "dine-in" ? tables[i % tables.length].id : null,
      items,
      subtotal,
      tax,
      discount,
      total: Math.round((subtotal + tax - discount) * 100) / 100,
      status,
      paymentMethod: (["cash", "card", "online"] as const)[i % 3],
      paid: status === "completed" || status === "served",
      note: i % 5 === 0 ? "Less spicy please" : undefined,
      createdAt: daysAgo(Math.floor(i / 2)),
    };
  });

  const reservations: DB["reservations"] = Array.from({ length: 16 }, (_, i) => {
    const customer = customers[(i + 3) % customers.length];
    const st: DB["reservations"][number]["status"][] = ["pending", "confirmed", "seated", "completed", "cancelled"];
    return {
      id: `res-${i + 1}`,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      date: dateOnly(i % 3 === 0 ? daysAhead(i % 9) : daysAgo(i % 5)),
      time: ["18:00", "19:30", "20:00", "12:30", "13:00"][i % 5],
      guests: 2 + (i % 8),
      tableId: tables[i % tables.length].id,
      message: i % 4 === 0 ? "Window seat if possible, celebrating a birthday." : undefined,
      status: st[i % st.length],
      createdAt: daysAgo(i),
    };
  });

  const staff: DB["staff"] = [
    ["Jonas Oliver", "Head Chef", 6200, "Morning"],
    ["Sophia Brown", "Sous Chef", 4800, "Morning"],
    ["Daniel Lee", "Grill Specialist", 4200, "Evening"],
    ["Emma White", "Pastry Chef", 4000, "Morning"],
    ["Marcus Hall", "Restaurant Manager", 7000, "Evening"],
    ["Nina Patel", "Head Waiter", 3200, "Evening"],
    ["Leo Alvarez", "Waiter", 2600, "Night"],
    ["Chloe Adams", "Bartender", 3000, "Night"],
    ["Ryan Cooper", "Cashier", 2800, "Morning"],
    ["Grace Turner", "Host", 2500, "Evening"],
  ].map((s, i) => ({
    id: `stf-${i + 1}`,
    name: s[0] as string,
    role: s[1] as string,
    email: `${(s[0] as string).toLowerCase().split(" ")[0]}@bitecraft.com`,
    phone: `+1 (212) 555-${String(2000 + i * 13).slice(0, 4)}`,
    avatar: avatar(i + 20),
    salary: s[2] as number,
    shift: s[3] as "Morning" | "Evening" | "Night",
    status: i === 7 ? "on-leave" : "active",
    joinedAt: daysAgo(700 - i * 45),
  }));

  const chefs: DB["chefs"] = [
    ["Jonas Oliver", "Head Chef", 4.9, 14, "French & Modern European"],
    ["Sophia Brown", "Sous Chef", 4.8, 10, "Italian & Mediterranean"],
    ["Daniel Lee", "Grill Specialist", 4.7, 8, "Steaks & BBQ"],
    ["Emma White", "Pastry Chef", 4.9, 9, "Desserts & Patisserie"],
    ["Marco Rossi", "Pizza Master", 4.6, 12, "Neapolitan Pizza"],
  ].map((c, i) => ({
    id: `chf-${i + 1}`,
    name: c[0] as string,
    title: c[1] as string,
    image: IMG.chefs[i % IMG.chefs.length],
    rating: c[2] as number,
    experience: c[3] as number,
    speciality: c[4] as string,
    socials: { facebook: "#", instagram: "#", twitter: "#" },
    featured: true,
  }));

  const suppliers: DB["suppliers"] = [
    ["Green Valley Farms", "Peter Hale", "Vegetables, Herbs"],
    ["Ocean Fresh Seafood", "Maria Lopez", "Fish, Shellfish"],
    ["Prime Meat Co.", "Tom Baker", "Beef, Chicken, Lamb"],
    ["Dairy Delight", "Anna Schmidt", "Milk, Cheese, Butter"],
    ["Bakers Union", "Sam Wright", "Bread, Buns, Pastry"],
  ].map((s, i) => ({
    id: `sup-${i + 1}`,
    name: s[0],
    contact: s[1],
    phone: `+1 (212) 555-${String(3000 + i * 29).slice(0, 4)}`,
    email: `orders@${s[0].toLowerCase().replace(/[^a-z]+/g, "")}.com`,
    items: s[2],
    status: "active" as const,
  }));

  const inventory: DB["inventory"] = [
    ["Tomato", "kg", 48, 20, 2.4, "sup-1"],
    ["Mozzarella Cheese", "kg", 12, 15, 9.8, "sup-4"],
    ["Salmon Fillet", "kg", 22, 10, 24.5, "sup-2"],
    ["Beef Patty", "pcs", 140, 60, 3.2, "sup-3"],
    ["Chicken Breast", "kg", 35, 20, 7.1, "sup-3"],
    ["Olive Oil", "ltr", 26, 10, 12.0, "sup-1"],
    ["Burger Buns", "pcs", 90, 100, 0.6, "sup-5"],
    ["Spaghetti", "kg", 30, 15, 2.1, "sup-5"],
    ["Fresh Basil", "bunch", 8, 12, 1.5, "sup-1"],
    ["Butter", "kg", 18, 8, 8.4, "sup-4"],
    ["Dark Chocolate", "kg", 6, 8, 15.0, "sup-4"],
    ["Coffee Beans", "kg", 14, 6, 21.0, "sup-5"],
  ].map((it, i) => ({
    id: `inv-${i + 1}`,
    name: it[0] as string,
    unit: it[1] as string,
    quantity: it[2] as number,
    threshold: it[3] as number,
    costPerUnit: it[4] as number,
    supplierId: it[5] as string,
    updatedAt: daysAgo(i % 7),
  }));

  const offers: DB["offers"] = [
    ["Lunch Special", "Up to 25% Off", "LUNCH25", 25, "Mon - Fri | 12PM - 4PM"],
    ["Family Combo", "Up to 30% Off", "FAMILY30", 30, "For Family of 4"],
    ["Weekend Offer", "Up to 20% Off", "WEEKEND20", 20, "Sat - Sunday"],
  ].map((o, i) => ({
    id: `off-${i + 1}`,
    title: o[0] as string,
    subtitle: o[1] as string,
    code: o[2] as string,
    discount: o[3] as number,
    image: IMG.offers[i % IMG.offers.length],
    validFrom: dateOnly(daysAgo(10)),
    validTo: dateOnly(daysAhead(40 + i * 10)),
    active: true,
  }));

  const posts: DB["posts"] = [
    ["New Summer Menu", "Try our new seasonal dishes crafted with the freshest produce of the season.", "Menu"],
    ["Chef's Special Night", "An evening of 7-course tasting hosted by our head chef Jonas Oliver.", "Events"],
    ["Restaurant Awarded", "BiteCraft named Best Restaurant in Melbourne for the third year running.", "News"],
    ["Behind The Scenes In Our Kitchen", "A rare look at how our brigade turns raw produce into plated art every night.", "Story"],
  ].map((p, i) => ({
    id: `post-${i + 1}`,
    title: p[0],
    slug: p[0].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    excerpt: p[1],
    content:
      `${p[1]}\n\nAt BiteCraft we believe great food starts long before the plate reaches your table. It starts at sunrise with our suppliers, continues through hours of preparation, and ends with a dish that carries the signature of the person who made it.\n\nOur team spends weeks developing every new recipe — tasting, adjusting, and tasting again — until the balance of flavour, texture and presentation feels effortless. That obsession is what keeps guests coming back season after season.\n\nCome and taste the difference for yourself. Book a table, bring the people you love, and let us take care of the rest.`,
    cover: IMG.blog[i % IMG.blog.length],
    author: ["Jonas Oliver", "Sophia Brown", "Marcus Hall", "Emma White"][i % 4],
    category: p[2],
    date: dateOnly(daysAgo(i * 6 + 2)),
    published: true,
  }));

  const gallery: DB["gallery"] = [
    ...IMG.interiors.map((url, i) => ({ id: `gal-${i + 1}`, title: `Restaurant Ambience ${i + 1}`, url, category: "Ambience", createdAt: daysAgo(i * 3) })),
    ...IMG.dishes.slice(0, 6).map((url, i) => ({ id: `gal-${i + 7}`, title: `Signature Dish ${i + 1}`, url, category: "Food", createdAt: daysAgo(i * 4) })),
  ];

  const reviews: DB["reviews"] = [
    ["Emily R.", "Food Blogger", 5, "Absolutely the best steak in town. The service was flawless and the ambience made our anniversary unforgettable."],
    ["Michael T.", "Regular Guest", 5, "The pasta here is perfect. I've been coming every week for two years and the quality has never dropped once."],
    ["Sarah L.", "Food Critic", 5, "Every dish we had was outstanding. Beautifully plated, generous portions and genuinely warm staff."],
    ["David K.", "Business Owner", 4, "Hosted a company dinner for 20 people. Everything ran on time and every single guest was impressed."],
    ["Olivia B.", "Traveller", 5, "Found this place by accident and it became the highlight of our trip to Melbourne. The lava cake is unreal."],
  ].map((r, i) => ({
    id: `rev-${i + 1}`,
    name: r[0] as string,
    avatar: avatar(i + 30),
    role: r[1] as string,
    rating: r[2] as number,
    message: r[3] as string,
    approved: true,
    createdAt: daysAgo(i * 5),
  }));

  const events: DB["events"] = [
    ["Live Jazz & Dinner Night", "An intimate evening of live jazz paired with a curated 4-course menu.", 20, "19:00", 60, 85],
    ["Chef's Table Experience", "Sit at the pass and watch our head chef build every course in front of you.", 32, "18:30", 12, 150],
    ["Sunday Family Brunch", "Bottomless brunch with a dedicated kids menu and garden seating.", 6, "11:00", 80, 45],
  ].map((e, i) => ({
    id: `evt-${i + 1}`,
    title: e[0] as string,
    description: e[1] as string,
    image: IMG.events[i % IMG.events.length],
    date: dateOnly(daysAhead(e[2] as number)),
    time: e[3] as string,
    seats: e[4] as number,
    price: e[5] as number,
    published: true,
  }));

  const messages: DB["messages"] = Array.from({ length: 8 }, (_, i) => ({
    id: `msg-${i + 1}`,
    name: customers[i].name,
    email: customers[i].email,
    phone: customers[i].phone,
    subject: ["Private event enquiry", "Feedback about last visit", "Catering request", "Job application"][i % 4],
    message: "Hi team, I would love to know more about hosting a private dinner for around 25 guests next month. Could you share the available packages and pricing?",
    read: i > 4,
    createdAt: daysAgo(i),
  }));

  const subscribers: DB["subscribers"] = Array.from({ length: 14 }, (_, i) => ({
    id: `sub-${i + 1}`,
    email: `subscriber${i + 1}@example.com`,
    createdAt: daysAgo(i * 2),
  }));

  const settings: DB["settings"] = [
    {
      id: "settings",
      name: "BiteCraft",
      tagline: "Delicious Food Made With Love & Passion",
      email: "hello@bitecraft.com",
      phone: "+1 (123) 456 7890",
      address: "123 Food Street, Melbourne, Australia",
      openHours: "Monday - Friday: 10:00 AM - 11:00 PM",
      weekendHours: "Saturday - Sunday: 09:00 AM - 12:00 AM",
      currency: "$",
      taxRate: 8,
      deliveryFee: 3.5,
      socials: { facebook: "#", instagram: "#", twitter: "#", youtube: "#" },
    },
  ];

  return {
    categories, dishes, orders, reservations, tables, customers, staff, chefs,
    inventory, suppliers, offers, posts, gallery, reviews, events, messages,
    subscribers, settings,
  };
}
