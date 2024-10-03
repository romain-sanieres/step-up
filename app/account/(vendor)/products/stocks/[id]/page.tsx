import { getUserAction } from "@/app/zsa/user.action";
import React from "react";
import StockComponent from "../_components/StockComponent";

export default async function Stocks() {
  const session = await getUserAction();


  return <StockComponent session={session[0]?.vendor_account[0].id || ""}/>;
}
