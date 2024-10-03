import { getUserAction } from "@/app/zsa/user.action";
import React from "react";
import EditProductComponent from "../_components/EditProductComponent";

export default async function EditProduct() {
  const session = await getUserAction();
  return (
    <EditProductComponent session={session[0]?.vendor_account[0].id || ""} />
  );
}
