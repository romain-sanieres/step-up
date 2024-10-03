import React from "react";
import { Switch } from "@/components/ui/switch";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { changeSaleStatue } from "@/app/zsa/product.action";

export default function ActiveProduct({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) {
  const { isPending, mutate } = useServerActionMutation(changeSaleStatue, {
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  return (
    <Switch
      disabled={isPending}
      defaultChecked={active}
      onCheckedChange={() => mutate({ id, active })}
    />
  );
}
