
import Link from "next/link";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { getReviews } from "@/app/zsa/product.action";
import Average from "@/app/product/_components/Average";
import { Item } from "@radix-ui/react-accordion";

type SlideType = {
  id : string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default async function Slide({ name, price, description, id, image, }: SlideType) {
  const rev = await getReviews({id : id});

  
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/5  rounded-lg p-0 flex overflow-hidden">
      <Link
        href={`/product/${id}`}
        className="flex flex-col w-full justify-between gap-y-4"
      >
        <Image
          src={image}
          alt=""
          width={500}
          height={500}
          className="h-96 rounded-lg"
        />
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col">
            <p className="h-fit font-semibold">{name}</p>
            <p>${price?.toFixed(2)}</p>
          </div>
        </div>
        {rev[0]  ? (
          <Average comments={rev[0]} page={"home"} />
        ) : (
          <div className="h-5"></div>
        )}
      </Link>
    </CarouselItem>
  );
}
