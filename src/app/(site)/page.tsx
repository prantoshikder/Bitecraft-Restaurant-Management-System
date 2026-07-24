import Hero from "@/components/site/sections/Hero";
import WhatWeDo from "@/components/site/sections/WhatWeDo";
import OurStory from "@/components/site/sections/OurStory";
import Categories from "@/components/site/sections/Categories";
import PopularDishes from "@/components/site/sections/PopularDishes";
import TodaysMenu from "@/components/site/sections/TodaysMenu";
import BookingBanner from "@/components/site/sections/BookingBanner";
import Chefs from "@/components/site/sections/Chefs";
import WhyChooseUs from "@/components/site/sections/WhyChooseUs";
import GalleryStrip from "@/components/site/sections/GalleryStrip";
import Testimonials from "@/components/site/sections/Testimonials";
import Offers from "@/components/site/sections/Offers";
import LatestNews from "@/components/site/sections/LatestNews";
import { list } from "@/lib/db";

export default function HomePage() {
  const reviews = list("reviews").filter((r) => r.approved);

  return (
    <>
      <Hero />
      <WhatWeDo />
      <OurStory />
      <Categories />
      <PopularDishes />
      <TodaysMenu />
      <BookingBanner />
      <Chefs />
      <WhyChooseUs />
      <GalleryStrip />
      <Testimonials reviews={reviews} />
      <Offers />
      <LatestNews />
    </>
  );
}
