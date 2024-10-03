"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Product from "../../../components/Product";
import { getWomenProducts } from "../../zsa/product.action";

type ProductType = {
  id: string;
  name: string;
  price: number;
  collection?: string;
  createdAt: Date;
  comment?: any;
  images: string[];
};

export default function Women() {
  const [limit, setLimit] = useState(20);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const [products] = await getWomenProducts();
      return products as ProductType[];
    },
  });

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setLimit((prev) => prev + 20); 
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isError) return <></>;
  if (isLoading) return <main className="min-h-[100dvh]"></main>;


  return (
    <main className="min-h-[100dvh]">
      <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
        {Array.isArray(data) &&
          data
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, limit) 
            .map((item, index) => (
              <Product
                key={index}
                id={item.id}
                name={item.name}
                price={item.price}
                collection={item.collection || ""}
                date={item.createdAt}
                image={item?.images[0]}
                comments={item.comment}
              />
            ))}
      </div>
    </main>
  );
}
