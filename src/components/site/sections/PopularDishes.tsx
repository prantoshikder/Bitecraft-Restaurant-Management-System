import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import DishCard from "@/components/site/DishCard";
import { list } from "@/lib/db";

export default function PopularDishes() {
  const dishes = list("dishes").filter((d) => d.featured).slice(0, 8);

  return (
    <section className="bg-cream-2 py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Chef's Recommendation" title="Popular Dishes" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/menu" className="btn btn-outline">
            View Full Menu <FiArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
