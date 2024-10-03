
import { getUserAction } from "@/app/zsa/user.action";
import { User2Icon } from "lucide-react";
import Link from "next/link";


export default async function User() {
  const session = await getUserAction();

  return (
    <Link href={!session[0]?.id ? "/login" : session[0]?.userType === "CLIENT" ? "/account/orders" : "/account/company"} className="p-2">
      <User2Icon size={20} className="hover:cursor-pointer" />
    </Link>
  );
}
