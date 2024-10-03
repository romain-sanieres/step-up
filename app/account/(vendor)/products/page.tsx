"use client";
import React, { useState } from "react";
import ProductList from "./_components/ProductList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Products() {
  const [search, setSearch] = useState<string>("");
  return (
    <section>
      <div className="py-3 flex items-center justify-between">
        <Input
          placeholder="search"
          className="max-w-sm placeholder:capitalize"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href={"./products/add_product"}>
          <Button variant={"outline"} className="flex gap-x-2 items-center">
            <PlusIcon size={20} />
            Add Product
          </Button>
        </Link>
      </div>
      <ProductList search={search} />
    </section>
  );
}
