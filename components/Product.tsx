import Average from "@/app/product/_components/Average";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductProps = {
  id: string;
  name: string;
  price: number;
  collection: string;
  date: Date;
  comments: any;
  image: string;
};

export default function Product({
  id,
  name,
  price,
  collection,
  date,
  comments,
  image,
}: ProductProps) {
  const isRecent = (date: Date) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return date > sevenDaysAgo;
  };
  return (
    <Link
      href={`/product/${id}`}
      className="rounded-xl shadow hover:shadow-md duration-200 flex flex-col justify-between overflow-hidden h-fit"
    >
      <Image src={image} width={500} height={500} alt="" className="h-96" />
      <div className="flex flex-col gap-4 justify-between p-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-lg font-semibold">{name}</p>
            <Average comments={comments} page={"products"} />
          </div>
          <p className="text-muted-foreground">${price?.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">{collection}</p>
          <p>{isRecent(date) ? <p className="text-sm text-destructive">(new)</p> : null}</p>
        </div>
      </div>
    </Link>
  );
}
