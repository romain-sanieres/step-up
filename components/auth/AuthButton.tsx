"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const AuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant={"secondary"}
      type="submit"
      className="w-full"
    >
      {pending ? "Loading" : "Create account or Login"}
    </Button>
  );
};
