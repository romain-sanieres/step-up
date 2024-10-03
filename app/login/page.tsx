import React from "react";
import Form from "./_components/Form";
import ProvidersButtons from "./_components/ProvidersButtons";
import Link from "next/link";
import { FootprintsIcon } from "lucide-react";

export default async function Login() {
  return (
    <div className="max-md:flex max-md:justify-center md:grid md:place-items-center h-[100dvh]">
      <div className="p-8 w-full max-w-md">
        <p className="text-5xl font-bold flex justify-center mb-10 items-center ">
          Sh
          <FootprintsIcon size={40} />
          es
        </p>
        <Form />
        <ProvidersButtons />
        <Link
          href={"/"}
          className="text-xs underline flex justify-center mt-5 text-muted-foreground hover:text-foreground w-fit mx-auto"
        >
          Return to home page
        </Link>
      </div>
    </div>
  );
}
