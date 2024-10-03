"use client";
import { Button } from "@/components/ui/button";
import Shoes from "./Shoes";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-black/5 dark:bg-white/95 h-[55rem] rounded-xl flex flex-col justify-around items-center p-10">
      <Shoes />
      <div className="text-center">
        <h2 className="text-7xl dark:text-secondary">Black is Back</h2>
        <p className="text-muted-foreground max-w-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
          perspiciatis!
        </p>
        <div className="flex justify-center gap-2 mt-10 max-md:flex-col">
          <Link href={"/women"}>
            <Button size={"lg"} className="w-44">
              Shop Women
            </Button>
          </Link>
          <Link href={"/men"}>
            <Button size={"lg"} className="w-44">
              Shop Men
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
