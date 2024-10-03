"use client";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <div className="flex w-fit items-center gap-x-2 ">
        {theme}
        <Switch 
          checked={theme === "dark"} 
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </div>
    </div>
  );
};