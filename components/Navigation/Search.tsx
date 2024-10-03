import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import SearchResult from "./_components/SearchResult";
export default function Search() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="p-2">
        <SearchIcon size={20} className="hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription className="mt-8"></SheetDescription>
        </SheetHeader>
        <Input
          autoFocus
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
        />
        <SearchResult value={value} open={setIsOpen} clean={setValue} />
      </SheetContent>
    </Sheet>
  );
}
