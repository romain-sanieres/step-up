import Average from "@/app/product/_components/Average";
import { getSearchedProducts } from "@/app/zsa/product.action";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchResult({
  value,
  open,
  clean,
}: {
  value: string;
  open: (value: boolean) => void;
  clean: (value: string) => void;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const [response] = await getSearchedProducts();
      return response;
    },
    staleTime: Infinity,
  });

  const [visibleItems, setVisibleItems] = useState(5); 

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (!value) return null;

  const filteredData = data?.filter((item) =>
    item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );

  if (!filteredData || filteredData.length === 0) {
    return <p>No results found</p>;
  }

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  return (
    <div className="mt-10">
      <div className="space-y-4">
        {filteredData.slice(0, visibleItems).map((item, index) => (
          <Link
            href={"/product/" + item.id}
            onClick={() => {
              clean("");
              open(false);
            }}
            key={index}
            className="border flex items-center justify-between rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-40 min-w-60 object-cover rounded-lg bg-muted"></div>
            <div className="flex flex-col w-full px-4">
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="font-bold mt-2 text-muted-foreground">
                ${item.price?.toFixed(2)}
              </p>
              <Average comments={item.Commentaries} />
            </div>
          </Link>
        ))}
      </div>
      {visibleItems < filteredData.length && (
        <Button
          variant={"outline"}
          className="w-full mt-5"
          onClick={handleShowMore}
        >
          Voir plus
        </Button>
      )}
    </div>
  );
}
