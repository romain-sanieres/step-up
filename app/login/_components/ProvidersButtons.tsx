import { OauthButton } from "@/components/auth/OauthButton";
import React from "react";

export default function ProvidersButtons() {
  return (
    <div className="flex flex-col items-center">
      <div className="my-4">
        <p className="text-xs">Or log in with</p>
      </div>
      <div className="flex gap-2 w-full">
        <OauthButton provider="google" />
        <OauthButton provider="github" />
      </div>
    </div>
  );
}
