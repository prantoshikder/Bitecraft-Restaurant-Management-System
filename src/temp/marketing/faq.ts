/**
 * Static content for the FAQ page.
 *
 * These questions are also emitted as FAQPage structured data, so Google can
 * show them as expandable answers directly in the search results — keep the
 * answers self-contained (no "see above") and under ~300 characters.
 */

export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Reservations",
    items: [
      {
        q: "Do I need a reservation to eat at PlateCraft?",
        a: "Walk-ins are always welcome, but we recommend booking ahead for dinner and weekends — those sittings usually fill up two to three days in advance. You can reserve a table online in under a minute.",
      },
      {
        q: "How far in advance can I book a table?",
        a: "Tables can be booked up to 60 days ahead. For groups of eight or more, or for a specific area such as the rooftop or a VIP booth, please book at least a week ahead so we can set the room properly.",
      },
      {
        q: "What happens if I am running late?",
        a: "We hold every table for 15 minutes past the booking time. If you are running behind, call us on (+123) 456 7890 and we will do our best to keep it for you.",
      },
      {
        q: "Can I cancel or change my booking?",
        a: "Yes. Cancellations and changes are free up to 4 hours before your sitting — just reply to your confirmation email or call the restaurant. Groups of ten or more need 24 hours' notice.",
      },
    ],
  },
  {
    title: "Menu & Dietary",
    items: [
      {
        q: "Do you cater for vegetarian, vegan and gluten-free diets?",
        a: "Yes. Every menu marks vegetarian dishes, and most can be prepared vegan or gluten-free on request. Tell us about any allergies when you book and the kitchen will prepare your dishes separately.",
      },
      {
        q: "How often does the menu change?",
        a: "The core menu is refreshed every season, and the Today's Menu specials change daily based on what our growers and fishmongers deliver that morning.",
      },
      {
        q: "Do you have a kids' menu?",
        a: "We do — smaller portions of our most popular dishes at a reduced price, plus high chairs and colouring packs. Just ask your server when you sit down.",
      },
      {
        q: "Where do your ingredients come from?",
        a: "Around 80% of our produce comes from growers within 150 km of Melbourne, our seafood is line-caught and delivered daily, and our meat is free range from certified Victorian farms.",
      },
    ],
  },
  {
    title: "Orders & Delivery",
    items: [
      {
        q: "Can I order online for pickup or delivery?",
        a: "Yes. Add dishes to your cart from the menu and choose dine-in, takeaway or delivery at checkout. Delivery is available within a 10 km radius of the restaurant.",
      },
      {
        q: "How long does delivery take?",
        a: "Most orders arrive within 35 to 50 minutes. At peak times on Friday and Saturday evenings it can stretch to an hour — the confirmation screen always shows a live estimate.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Cash, all major credit and debit cards, and online payment at checkout. Split bills are no problem in the restaurant, just let your server know before you order.",
      },
    ],
  },
  {
    title: "Events & Groups",
    items: [
      {
        q: "Can I book PlateCraft for a private event?",
        a: "Yes. Our rooftop seats 40 for a seated dinner and 70 for a standing reception, and the whole restaurant can be booked exclusively. Send us your date through the catering enquiry form for a quote.",
      },
      {
        q: "Do you offer off-site catering?",
        a: "We cater weddings, corporate lunches and private parties anywhere in greater Melbourne, from drop-off platters to a full brigade on site.",
      },
      {
        q: "Do you sell gift cards?",
        a: "Digital gift cards are available from $50 to $500, are delivered by email within minutes and are valid for three years on food, drinks and events.",
      },
    ],
  },
  {
    title: "Visiting Us",
    items: [
      {
        q: "Where are you located and is there parking?",
        a: "We are at 123 Food Street, Melbourne. There is paid street parking on the block, a public car park two minutes' walk away, and the nearest tram stop is 200 metres from the door.",
      },
      {
        q: "Is the restaurant accessible?",
        a: "The ground floor, bar and bathrooms are step-free and wheelchair accessible, and there is lift access to the rooftop. Let us know when booking and we will reserve a suitable table.",
      },
      {
        q: "Is there a dress code?",
        a: "Smart casual. We want you comfortable — the only things we ask you to leave at home are activewear and beachwear.",
      },
    ],
  },
];

/** Flattened list used to build the FAQPage structured data. */
export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);
