
import React from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Slide from "./Slide";
import { getLatestProducts } from "@/app/zsa/product.action";

type SliderType = {
  title: string;
  subtitle?: string;
};


export default async function Slider({ title, subtitle }: SliderType) {
  const data = await getLatestProducts();
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h4 className="text-3xl capitalize">{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="gap-x-8 pl-5">
          {data &&
            data[0] &&
            data[0].map((item, index) => (
              <Slide
                key={index}
                id={item?.id}
                name={item?.name}
                price={item?.price}
                description={item?.description}
                image={item?.images[0]}
              />
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
