"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { TbTruckDelivery, TbLeaf, TbHeadset } from "react-icons/tb";
import SmartImage from "@/components/ui/SmartImage";
import { IMG } from "@/lib/images";

const PERKS = [
  { icon: TbTruckDelivery, title: "Free Delivery", text: "On orders over $30" },
  { icon: TbLeaf, title: "100% Fresh", text: "Premium quality" },
  { icon: TbHeadset, title: "24/7 Support", text: "We're here to help" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-32 lg:pt-44">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src={IMG.steakDark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80" />
        <div className="noise absolute inset-0 opacity-40" />
        <div className="absolute -left-40 top-10 size-[420px] rounded-full bg-brand/12 blur-[130px]" />
        <div className="absolute -right-24 bottom-0 size-[380px] rounded-full bg-accent/8 blur-[140px]" />
      </div>

      <div className="container-x grid items-center gap-14 pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-script text-4xl text-accent sm:text-5xl"
          >
            Delicious Food
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-2 text-[2.7rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]"
          >
            Made With
            <br />
            Love &amp; Passion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="mt-5 max-w-md text-sm leading-relaxed text-white/55"
          >
            Fresh ingredients, expert chefs and a cosy atmosphere come together to create
            unforgettable moments — one plate at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/reservation" className="btn btn-primary">
              Book A Table <FiArrowRight className="size-4" />
            </Link>
            <Link href="/menu" className="btn btn-ghost">
              <FiPlay className="size-3.5" /> Explore Menu
            </Link>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-12 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/6 sm:grid-cols-3"
          >
            {PERKS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3 bg-ink/70 px-4 py-4 backdrop-blur-sm">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-light">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-white">{title}</p>
                  <p className="truncate text-[11px] text-white/45">{text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative mx-auto aspect-square w-full max-w-[500px]"
        >
          {/* Rotating dotted ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-brand/25"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-white/8"
          />

          <div className="absolute inset-0 rounded-full bg-brand/12 blur-3xl" />

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 overflow-hidden rounded-full shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
          >
            <SmartImage
              src={IMG.hero}
              alt="Signature BiteCraft plate"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-cover"
            />
          </motion.div>

          {/* Floating stat chips */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease }}
            className="absolute -left-2 top-10 rounded-2xl border border-white/10 bg-ink/85 px-4 py-3 backdrop-blur-md sm:-left-6"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/40">Rated</p>
            <p className="text-lg font-extrabold text-white">
              4.9<span className="text-xs font-medium text-brand-light">/5.0</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease }}
            className="absolute -right-2 bottom-16 rounded-2xl border border-white/10 bg-brand px-4 py-3 shadow-[0_20px_50px_-20px_rgba(140,179,63,0.9)] sm:-right-6"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/70">Happy guests</p>
            <p className="text-lg font-extrabold text-white">12,400+</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
