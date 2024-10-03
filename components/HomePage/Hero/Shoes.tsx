"use client";

import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
gsap.registerPlugin(useGSAP);

export default function Shoes() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".box", {
        y: 40,
        yoyo: true,
        repeat: -1,
        duration: 3.5,
      });
    },
    { scope: container }
  );
  return (
    <div ref={container} className="app">
      <div className="box">
        <Image
          src={"/images/shoes.webp"}
          width={500}
          height={500}
          alt="shoes"
          priority
          className="-mt-5 md:-mt-10"
        />
      </div>
    </div>
  );
}
