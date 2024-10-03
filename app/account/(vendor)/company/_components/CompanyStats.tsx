import React from "react";
import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "January", desktop: 186 },
  { month: "August", desktop: 305 },
  { month: "September", desktop: 237 },
  { month: "October", desktop: 158 },
  { month: "November", desktop: 200 },
  { month: "December", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#465999",
  },
} satisfies ChartConfig;

export default function CompanyStats({ user }: { user: any }) {
  return (
    <section>
      <p className="text-2xl font-semibold capitalize">
        {user.vendor_account[0].name}
      </p>
      <p className="text-muted-foreground ">
        {user.vendor_account[0].description}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-10">

      </div>
    </section>
  );
}
