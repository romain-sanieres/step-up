"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCompanyProducts } from "@/app/zsa/product.action";
import ActiveProduct from "./ActiveProduct";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductList({ search }: { search: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getCompanyProducts();
      return products[0];
    },
  });

  if (isError) return <></>;
  if (isLoading) return <></>;
  if (Array.isArray(data))
    return (
      <section className="mt-5">
        <Table className="w-full">
          <TableCaption>A list of your products</TableCaption>
          <TableHeader className="w-full">
            <TableRow className="h-fit">
              <TableHead>Name</TableHead>
              <TableHead className="max-md:hidden">Price $</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right">On sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .filter((item) =>
                item.name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/product/${item.id}`}
                      className="hover:underline"
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell className="max-md:hidden">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right space-x-4">
                    <Link href={`/account/products/stocks/${item.id}`}>
                      <Button variant={"outline"}>Stock</Button>
                    </Link>
                    <Link href={`/account/products/edit_product/${item.id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <ActiveProduct id={item.id} active={item.is_on_sale} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    );
  return <p>No products</p>;
}
