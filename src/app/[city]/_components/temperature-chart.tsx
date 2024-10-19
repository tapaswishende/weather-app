import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { TWeatherForecast } from "@/lib/types";


export const TemperatureChart: React.FC<TWeatherForecast> = ({ forecast }) => {
  const chartData = forecast.forecastday.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    temperature: day.day.avgtemp_c
  }));

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Temperature Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            temperature: {
              label: "Temperature (°C)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date"/>
              <YAxis/>
              <ChartTooltip content={<ChartTooltipContent/>}/>
              <Legend/>
              <Line type="monotone" dataKey="temperature" stroke="var(--color-temperature)" name="Temperature (°C)"/>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};