"use client";
import { getProductAction, updateStockAction } from "@/app/zsa/product.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function StockComponent({ session }: { session: string }) {
  const [values, setValues] = useState<{ size: string; value: number }[]>([]);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getProductAction({ id: id as string });
      return products[0];
    },
  });

  const { mutate } = useServerActionMutation(updateStockAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const changeStock = ({ size, value }: { size: string; value: number }) => {
    setValues([...values, { size, value }]);
  };

  const verify = async () => {
    try {
      await mutate({ id: id as string, stockUpdates: values });
      console.log("Stock updated successfully");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  if (isLoading) return <></>;
  if (isError) return <></>;

  if (session === data?.vendorId)
    return (
      <main className="space-y-10">
        <div className="space-y-5">
          <div className="flex max-md:flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold ">{data.name}</h2>
              <p className="text-xl">${data.price}</p>
            </div>
            <div className="text-right">
              <p className="text-xl">
                Total stock :{" "}
                {data.sizes.reduce((total, item) => total + item.inventory, 0)}
              </p>
              <p className="text-xl">Stock Limit : {data.limit}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-8 gap-5">
          {data.sizes
            .sort((a, b) => Number(a.size) - Number(b.size))
            .map((item) => (
              <div
                key={item.size}
                className="border text-center rounded-lg p-2"
              >
                <p className="px-2 pb-2 font-semibold">{item.size}</p>
                <Input
                  min={0}
                  defaultValue={item.inventory > 0 ? item.inventory : undefined}
                  placeholder={item.inventory === 0 ? "0" : undefined}
                  className={`text-center`}
                  type="number"
                  disabled={item.inventory <= 5 ? false : true}
                  onBlur={(e) =>
                    changeStock({
                      size: item.size,
                      value: Number(e.target.value),
                    })
                  }
                />
              </div>
            ))}
        </div>
        <Button onClick={() => verify()}>Update stock</Button>
      </main>
    );
}
