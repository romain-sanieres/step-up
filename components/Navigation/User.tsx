"use client";
import { getUserAction } from "@/app/zsa/user.action";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function User() {
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    const user = async () => {
      const [res] = await getUserAction();
      if (res) setSession(res);
    };
    user();
  }, []);

  return (
    <Link
      href={
        session
          ? session.userType === "CLIENT"
            ? "/account/orders"
            : "/account/company"
          : "/login"
      }
      className="p-2"
    >
      <User2Icon size={20} className="hover:cursor-pointer" />
    </Link>
  );
}
