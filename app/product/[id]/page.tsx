"use client";
import AccordionInfo from "@/app/account/(vendor)/products/_components/AccordionInfo";
import Sizes from "@/app/account/(vendor)/products/_components/Sizes";
import { getProductAction } from "@/app/zsa/product.action";
import { StockType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Commentaries from "../_components/Commentaries";
import Image from "next/image";
export default function ProductId() {
  const [description, setDescription] = useState(false);
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getProductAction({ id: id as string });
      return products[0];
    },
  });

  const isRecent = (date: Date) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return date > sevenDaysAgo;
  };

  if (isLoading) return <main className="min-h-[100dvh]"></main>;
  if (isError) return <></>;


  return (
    <main className="min-h-[100dvh]">
      {data ? (
        <>
          <section className="max-lg:flex flex-col lg:grid lg:grid-cols-12 gap-x-8">
            <div className="w-full md:col-span-9">
              <div className="md:grid md:grid-cols-2 gap-5 flex flex-col">
                {data.images?.map((item, index) => (
                  <Image
                    key={index}
                    src={item}
                    width={400}
                    height={400}
                    alt={item}
                    className="w-full h-auto object-center rounded-xl shadow-md"
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:col-span-3 p-2 space-y-5 max-md:mt-10">
              <div>
                <h2 className="text-4xl font-semibold">
                  {data.name}{" "}
                  {isRecent(new Date(data.createdAt)) ? (
                    <span className="text-sm text-destructive">(new)</span>
                  ) : null}
                </h2>
                <p>{data.collection}</p>
                <p className="text-lg">${data.price?.toFixed(2)}</p>
              </div>
              <div className="space-y-5">
                <p>Size</p>
                <Sizes
                  reference={data.id}
                  price={data.price}
                  name={data.name}
                  sizes={data.sizes as unknown as StockType[]}
                />

              </div>
              <div className="flex gap-2 flex-grow-0">
                {data.tags
                  ? data.tags?.split(",").map((item, index) => (
                      <p
                        key={index}
                        className="bg-muted py-2 px-3 rounded-full cursor-pointer hover:shadow-md duration-300 text-sm"
                      >
                        {item}
                      </p>
                    ))
                  : null}
              </div>
              <div className="flex items-end">
                <p
                  className={`text-muted-foreground ${
                    description ? null : "line-clamp-3"
                  }`}
                >
                  {data.description}
                </p>
                {description || data?.description?.length <= 100 ? null : (
                  <p
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setDescription(!description)}
                  >
                    plus
                  </p>
                )}
              </div>
              <div>
                <AccordionInfo />
              </div>
            </div>
          </section>
          <Commentaries />
        </>
      ) : (
        <section className="h-[100dvh] grid place-content-center place-items-center">
          No product found
        </section>
      )}
    </main>
  );
}