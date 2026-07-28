import type { IconType } from "react-icons";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

/** Static content for the Contact page. */

export type ContactCard = {
  icon: IconType;
  label: string;
  value: string;
  sub: string;
};

/** The four info cards above the message form. */
export const INFO: ContactCard[] = [
  { icon: FiPhone, label: "Phone", value: "(+123) 456 7890", sub: "Mon - Sun, 10am - 11pm" },
  { icon: FiMail, label: "Email", value: "hello@bitecraft.com", sub: "We reply within 24 hours" },
  { icon: FiMapPin, label: "Address", value: "123 Food Street, Melbourne", sub: "Victoria, Australia" },
  { icon: FiClock, label: "Open Hours", value: "10:00 AM - 11:00 PM", sub: "Weekends till 12:00 AM" },
];

/** Embedded map iframe source (OpenStreetMap, centred on the restaurant). */
export const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=144.9531%2C-37.8186%2C144.9831%2C-37.8036&layer=mapnik&marker=-37.8111%2C144.9681";
