import type { IconType } from "react-icons";
import { FiBriefcase, FiHeart, FiMusic, FiUsers } from "react-icons/fi";
import { IMG } from "@/lib/images";

/** Static content for the Catering & Private Events page. */

export type Package = {
  name: string;
  price: string;
  unit: string;
  summary: string;
  includes: string[];
  popular?: boolean;
};

export type Space = {
  name: string;
  seated: number;
  standing: number;
  image: string;
  description: string;
};

export type EventType = { icon: IconType; title: string; text: string };
export type ProcessStep = { step: string; title: string; text: string };

/** The three enquiry categories most guests arrive with. */
export const EVENT_TYPES: EventType[] = [
  {
    icon: FiBriefcase,
    title: "Corporate",
    text: "Boardroom lunches, client dinners, end-of-year parties and product launches — with AV, a private entrance and invoiced billing.",
  },
  {
    icon: FiHeart,
    title: "Weddings & Celebrations",
    text: "Engagements, receptions, birthdays and anniversaries, from an intimate table of twelve to a full rooftop takeover.",
  },
  {
    icon: FiMusic,
    title: "Social & Community",
    text: "Supper clubs, charity fundraisers and cooking classes, with a dedicated host looking after the room all night.",
  },
  {
    icon: FiUsers,
    title: "Off-site Catering",
    text: "We bring the kitchen to you anywhere in greater Melbourne — drop-off platters through to a full brigade and service team.",
  },
];

/** Menu packages. Prices are per person and exclude drinks unless stated. */
export const PACKAGES: Package[] = [
  {
    name: "Canapé Reception",
    price: "$55",
    unit: "per person",
    summary: "Standing service with roaming plates — best for launches and mingling crowds.",
    includes: [
      "8 canapés per person over 2 hours",
      "Seasonal vegetarian and vegan options",
      "Roaming service staff",
      "Cocktail tables and floor styling",
    ],
  },
  {
    name: "Seated Feast",
    price: "$89",
    unit: "per person",
    summary: "Our most-booked package — shared plates down the middle of a long table.",
    includes: [
      "3 shared courses plus sides",
      "Freshly baked bread and house butter",
      "Dedicated event host for the night",
      "Menu cards printed with your event name",
      "Complimentary cake service",
    ],
    popular: true,
  },
  {
    name: "Chef's Table",
    price: "$145",
    unit: "per person",
    summary: "A seven-course tasting menu served at the pass, paced by the head chef.",
    includes: [
      "7-course seasonal degustation",
      "Matched wine pairing available",
      "Kitchen tour and chef Q&A",
      "Exclusive use of the private dining room",
      "Personalised printed menus",
    ],
  },
];

/** Bookable spaces with real capacities — the first thing an event planner asks. */
export const SPACES: Space[] = [
  {
    name: "The Rooftop",
    seated: 40,
    standing: 70,
    image: IMG.interiors[1],
    description:
      "Open-air terrace with city views, retractable cover and its own bar. Comes into its own from October through March.",
  },
  {
    name: "Private Dining Room",
    seated: 18,
    standing: 25,
    image: IMG.interiors[4],
    description:
      "A closed room off the main floor with a single long table, a screen for presentations and its own service door.",
  },
  {
    name: "Whole Restaurant",
    seated: 120,
    standing: 200,
    image: IMG.interiors[2],
    description:
      "Exclusive use of every floor including the bar and rooftop, with the full kitchen brigade at your disposal.",
  },
];

/** What happens after the enquiry form is submitted. */
export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Tell us about the day",
    text: "Send through your date, guest numbers and what you have in mind. It takes two minutes.",
  },
  {
    step: "02",
    title: "We build a proposal",
    text: "Within one business day you get a menu, a room recommendation and an itemised quote.",
  },
  {
    step: "03",
    title: "Tasting and tweaks",
    text: "For events over 40 guests we invite you in for a complimentary tasting of the proposed menu.",
  },
  {
    step: "04",
    title: "We take it from here",
    text: "A 25% deposit locks the date. Your event host handles the run sheet, styling and suppliers.",
  },
];

/** Reassurance block — answers the objections that stall an enquiry. */
export const CATERING_NOTES: string[] = [
  "Minimum spend applies to exclusive-use bookings and varies by day of the week.",
  "All dietary requirements are catered for at no extra cost, with 72 hours' notice.",
  "Deposits are fully refundable up to 30 days before the event date.",
  "Corporate accounts can be invoiced on 30-day terms.",
];
