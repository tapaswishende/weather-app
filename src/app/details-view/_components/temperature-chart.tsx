import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { CityWithWeather } from "@/app/details-view/_constants";

export const TemperatureChart: React.FC<{ forecast: CityWithWeather['forecast'] }> = ({ forecast }) => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle>Temperature Trend</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          temperature: {
            label: "Temperature",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecast}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="var(--color-temperature)" name="Temperature" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
)
