import type { IconType } from "react-icons";
import { FiCalendar, FiCreditCard, FiMail, FiRefreshCw } from "react-icons/fi";

/** Static content for the Gift Cards page. */

export type GiftAmount = { value: number; label: string; note?: string };
export type GiftPerk = { icon: IconType; title: string; text: string };
export type GiftStep = { step: string; title: string; text: string };

/** Preset denominations. The "popular" note nudges the average order value up. */
export const AMOUNTS: GiftAmount[] = [
  { value: 50, label: "$50", note: "Lunch for one" },
  { value: 100, label: "$100", note: "Dinner for two" },
  { value: 150, label: "$150", note: "Most popular" },
  { value: 250, label: "$250", note: "Dinner with wine" },
  { value: 500, label: "$500", note: "The full chef's table" },
];

export const PERKS: GiftPerk[] = [
  {
    icon: FiMail,
    title: "Delivered in minutes",
    text: "Digital cards land in the recipient's inbox within five minutes, with your personal message attached.",
  },
  {
    icon: FiCalendar,
    title: "Valid for three years",
    text: "No monthly fees and no expiry pressure — three full years from the day it is issued.",
  },
  {
    icon: FiRefreshCw,
    title: "Spend it on anything",
    text: "Food, drinks, events, catering deposits and online orders. Partial balances stay on the card.",
  },
  {
    icon: FiCreditCard,
    title: "Choose your own amount",
    text: "Pick a preset or name any value between $25 and $1,000 — schedule the delivery date if it is a gift.",
  },
];

export const HOW_IT_WORKS: GiftStep[] = [
  {
    step: "01",
    title: "Pick an amount",
    text: "Choose a preset value or enter your own, and tell us who it is for.",
  },
  {
    step: "02",
    title: "Add a message",
    text: "Write a note and choose whether to send it now or on a specific date.",
  },
  {
    step: "03",
    title: "We send the card",
    text: "The recipient gets a branded email with a unique code they can use in the restaurant or online.",
  },
];

/** Gift card terms — required on the page for card-scheme and consumer-law compliance. */
export const GIFT_TERMS: string[] = [
  "Gift cards are valid for 3 years from the date of issue and the expiry is printed on the card.",
  "Cards can be redeemed in the restaurant, on online orders and against event deposits.",
  "Any unused balance stays on the card and can be spent across multiple visits.",
  "Gift cards are not redeemable for cash and cannot be reloaded once the balance reaches zero.",
  "Lost or stolen cards can be replaced only if you can supply the original order reference.",
];
