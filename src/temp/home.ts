import type { IconType } from "react-icons";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  TbAward,
  TbBellRinging,
  TbChefHat,
  TbHeadset,
  TbHeart,
  TbLeaf,
  TbSalad,
  TbSoup,
  TbToolsKitchen2,
  TbTruckDelivery,
  TbUsers,
} from "react-icons/tb";

/** Static content for the home page sections. */

export type FeatureItem = { icon: IconType; title: string; text: string };
export type ContactItem = { icon: IconType; label: string; value: string };

/** Hero — the three perk chips under the call-to-action buttons. */
export const HERO_PERKS: FeatureItem[] = [
  { icon: TbTruckDelivery, title: "Free Delivery", text: "On orders over $30" },
  { icon: TbLeaf, title: "100% Fresh", text: "Premium quality" },
  { icon: TbHeadset, title: "24/7 Support", text: "We're here to help" },
];

/** "What We Do" — four value cards. Also rendered on the About page. */
export const WHAT_WE_DO_ITEMS: FeatureItem[] = [
  {
    icon: TbSalad,
    title: "Fresh Ingredients",
    text: "We use only the freshest seasonal produce, sourced from local farms every morning.",
  },
  {
    icon: TbChefHat,
    title: "Expert Chefs",
    text: "Our chefs bring years of fine-dining experience to every single plate they send out.",
  },
  {
    icon: TbToolsKitchen2,
    title: "Unique Recipes",
    text: "Signature flavours you simply will not find anywhere else in the city.",
  },
  {
    icon: TbBellRinging,
    title: "Perfect Service",
    text: "Warm, attentive and unhurried — hospitality the way it was meant to be.",
  },
];

/** "Our Story" — the ticked bullet list. */
export const OUR_STORY_POINTS: string[] = [
  "Locally sourced ingredients",
  "Sustainable & ethical practices",
  "Award winning restaurant",
];

/** "Why Choose Us" — four features beside the steak photo. */
export const WHY_CHOOSE_US_FEATURES: FeatureItem[] = [
  { icon: TbAward, title: "Quality Food", text: "We serve only the best quality food, every plate, every time." },
  { icon: TbSoup, title: "Hygienic Kitchen", text: "Cleanliness and safety are our top priority in the kitchen." },
  { icon: TbHeart, title: "Cozy Ambience", text: "Enjoy your meal in a warm, welcoming environment." },
  { icon: TbUsers, title: "Happy Customers", text: "Thousands of happy customers served daily and counting." },
];

/** Booking banner — contact info panel next to the reservation form. */
export const BOOKING_CONTACT: ContactItem[] = [
  { icon: FiPhone, label: "Call Us", value: "(+123) 456 7890" },
  { icon: FiMail, label: "Email Us", value: "hello@platecraft.com" },
  { icon: FiMapPin, label: "Visit Us", value: "123 Food Street, Melbourne" },
];
