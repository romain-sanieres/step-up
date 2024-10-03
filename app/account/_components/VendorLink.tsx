"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const pages = [
  {
    link: "dashboard",
    name: "dashboard",
  },
  {
    link: "settings",
    name: "settings",
  },
  {
    link: "products",
    name: "products",
  },
];
export default function VendorLink(vendor: { vendor: number }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-y-1">
      <Link
        href={`/account/company`}
        className={`py-3 pl-2 capitalize rounded w-full duration-200 ${
          pathname.includes("company")
            ? "bg-neutral-50"
            : "hover:bg-neutral-100"
        }`}
      >
        my company
      </Link>

      {vendor.vendor > 0 && pages.map((item, index) => (
        <Link
          key={index}
          href={`/account/${item.link}`}
          className={`py-3 pl-2 capitalize rounded w-full duration-200 ${
            pathname.includes(item.link)
              ? "bg-neutral-50"
              : "hover:bg-neutral-100"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
