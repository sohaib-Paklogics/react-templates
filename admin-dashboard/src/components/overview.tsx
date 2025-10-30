"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Feb",
    total: 1900,
  },
  {
    name: "Mar",
    total: 1500,
  },
  {
    name: "Apr",
    total: 1700,
  },
  {
    name: "May",
    total: 2400,
  },
  {
    name: "Jun",
    total: 2100,
  },
  {
    name: "Jul",
    total: 2800,
  },
  {
    name: "Aug",
    total: 3200,
  },
  {
    name: "Sep",
    total: 2800,
  },
  {
    name: "Oct",
    total: 3300,
  },
  {
    name: "Nov",
    total: 3500,
  },
  {
    name: "Dec",
    total: 3700,
  },
];

export function Overview() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>
        <p className="text-sm text-muted-foreground">
          Monthly revenue for the current year
        </p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
