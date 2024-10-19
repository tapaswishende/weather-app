import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { TWeatherCurrent, TWeatherLocation } from "@/lib/types";
import { useRouter } from "next/navigation";

export const WeatherCard: React.FC<{
  city: TWeatherLocation,
  onRemove: (id: string) => void,
  current: TWeatherCurrent
}> = ({
  city,
  current,
  onRemove
}) => {
  const router = useRouter();
  return (
    <Card className='hover:bg-green-50 '>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{city.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onRemove(city.name)
          }}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent onClick={() => router.push(`/${city.name}`)} className={'cursor-pointer'}>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{current.temp_c}°C / {current.temp_f}°F</div>
          <div className="flex items-center space-x-2">
            <div><img src={current.condition.icon} alt={current.condition.text} className="mx-auto w-8 h-8"/></div>
            <div className="text-xs">{current.condition.text}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}