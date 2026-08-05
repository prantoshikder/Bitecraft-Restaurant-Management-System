/**
 * Static content for the Privacy Policy and Terms & Conditions pages.
 *
 * Both pages are required before you can run Google Ads, Meta Ads or a
 * newsletter in most jurisdictions, and the Footer already links to them.
 *
 * ⚠️ This is a starting template written for a restaurant, not legal advice.
 * Have a lawyer review it against the rules that apply where you trade (GDPR,
 * the Australian Privacy Principles, CCPA, …) and update LAST_UPDATED whenever
 * you change the substance.
 */

export type LegalSection = { heading: string; body: string[]; bullets?: string[] };

export const LAST_UPDATED = "6 August 2026";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "PlateCraft Restaurant operates this website and is the controller of the personal information collected through it. If you have any question about how your data is handled, email hello@platecraft.com or write to us at 123 Food Street, Melbourne.",
    ],
  },
  {
    heading: "What we collect",
    body: ["We only collect what we need to serve you, and we collect it directly from you:"],
    bullets: [
      "Booking details — your name, email, phone number, party size and any note you leave when reserving a table.",
      "Order details — the dishes you order, your delivery address where relevant, and the payment method used. Card numbers are handled by our payment provider and never stored on our servers.",
      "Contact and enquiry forms — the name, email, phone number and message you send us.",
      "Newsletter subscriptions — your email address, and the date you subscribed.",
      "Usage data — pages visited, approximate location derived from your IP address, device and browser type, collected through analytics cookies where you have allowed them.",
    ],
  },
  {
    heading: "How we use it",
    body: ["Your information is used to:"],
    bullets: [
      "Confirm and manage your reservations, orders and event enquiries.",
      "Contact you about a booking, including changes and reminders.",
      "Send marketing emails about offers, seasonal menus and events — only if you have subscribed.",
      "Improve the menu, the website and the service, using aggregated analytics.",
      "Meet our legal obligations, such as tax and food-safety record keeping.",
    ],
  },
  {
    heading: "Cookies and tracking",
    body: [
      "Essential cookies keep your cart and session working and cannot be switched off. Analytics and advertising cookies (Google Analytics, Google Ads and the Meta Pixel) are only loaded when the corresponding measurement ids are configured, and they help us understand which campaigns bring guests through the door.",
      "You can clear or block cookies in your browser settings at any time. Blocking analytics cookies will not stop you from booking or ordering.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "We never sell your personal information. We share it only with the service providers who make the restaurant work — our payment processor, delivery partners, email delivery provider and analytics providers — and only to the extent they need it to perform that service. We may also disclose information where the law requires it.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Booking and order records are kept for seven years to meet tax and accounting obligations. Enquiry messages are kept for two years. Newsletter subscriptions are kept until you unsubscribe, after which your email is removed from the active list within 30 days.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete it. Every marketing email carries a one-click unsubscribe link. To exercise any of these rights, email hello@platecraft.com — we respond within 30 days.",
    ],
  },
  {
    heading: "Security",
    body: [
      "Data is transmitted over encrypted connections and access to guest records is limited to staff who need it to do their job. No system is perfectly secure, but if a breach ever affects your information we will notify you and the relevant regulator as required by law.",
    ],
  },
  {
    heading: "Children",
    body: [
      "The website is not directed at children under 16 and we do not knowingly collect their information. Bookings for families are made by an adult on the child's behalf.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We update this policy when our practices change. The revision date at the top of the page always reflects the current version, and material changes are announced in the newsletter.",
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Agreement to these terms",
    body: [
      "By browsing this website, booking a table, placing an order or buying a gift card, you agree to these terms. If you do not agree with them, please do not use the site.",
    ],
  },
  {
    heading: "Reservations",
    body: [
      "A reservation is confirmed only once you receive a confirmation from us. Tables are held for 15 minutes past the booking time, after which they may be released to walk-in guests.",
      "Cancellations and changes are free up to 4 hours before the booking. Groups of ten or more require 24 hours' notice, and repeated no-shows on large bookings may attract a per-head fee, which is disclosed at the time of booking.",
    ],
  },
  {
    heading: "Orders and payment",
    body: [
      "Prices shown on the menu include applicable taxes unless stated otherwise. Delivery attracts a separate fee shown at checkout before you pay.",
      "We take payment at the time you place an online order. If a dish becomes unavailable after you have paid, we will offer a substitute or refund that item in full.",
      "Once preparation has started, an order cannot be cancelled. Call us straight away on (+123) 456 7890 if something is wrong and we will make it right.",
    ],
  },
  {
    heading: "Allergies and dietary requirements",
    body: [
      "We prepare food in a kitchen that handles nuts, gluten, dairy, shellfish and other common allergens. We take every reasonable precaution and will prepare dishes separately on request, but we cannot guarantee a completely allergen-free environment. Always tell us about an allergy before you order.",
    ],
  },
  {
    heading: "Promotional codes",
    body: [
      "One code applies per order or per table, and codes cannot be combined. Codes are valid only for the period shown, have no cash value and may be withdrawn at any time. Orders already placed under a code are unaffected by its withdrawal.",
    ],
  },
  {
    heading: "Gift cards",
    body: [
      "Gift cards are valid for three years from issue, can be redeemed on food, drinks, events and online orders, and cannot be exchanged for cash. Unused balances remain on the card until the expiry date printed on it.",
    ],
  },
  {
    heading: "Events and catering",
    body: [
      "Event bookings are confirmed by a signed quote and a 25% deposit. Deposits are refundable up to 30 days before the event date; inside 30 days the deposit is retained to cover committed supplier costs. Final guest numbers are due 72 hours before the event and are the number you will be charged for.",
    ],
  },
  {
    heading: "Behaviour in the restaurant",
    body: [
      "We ask every guest to treat our team and other diners with respect. We reserve the right to refuse service or ask a guest to leave in cases of abusive behaviour, intoxication or damage to property.",
    ],
  },
  {
    heading: "Website content",
    body: [
      "All text, photography, branding and code on this site belong to PlateCraft and may not be reproduced commercially without written permission. Dish photography is indicative; the plate you receive may differ as our produce changes with the season.",
      "Reviews you submit may be published on this site. Do not submit anything you do not have the right to share, and keep it free of personal attacks — we moderate every submission before it appears.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "Nothing in these terms limits any right you have under consumer law that cannot be excluded. Beyond that, our liability arising from your use of this website is limited to the amount you paid for the order or booking concerned.",
    ],
  },
  {
    heading: "Governing law and contact",
    body: [
      "These terms are governed by the laws of Victoria, Australia. Questions about them can be sent to hello@platecraft.com or raised with any member of our management team.",
    ],
  },
];
