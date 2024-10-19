import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { City } from "@/app/_components/weather-dashboard";
import { WeatherIcon } from "@/app/_components/weather-icons";
import { TWeatherCurrent, TWeatherLocation } from "@/lib/types";
import { useRouter } from "next/navigation";

export const WeatherCard: React.FC<{
  city: TWeatherLocation,
  onRemove: (id: number) => void,
  current: TWeatherCurrent
}> = ({
  city,
  current
}) => {
  const router = useRouter();
  return (
    <Card onClick={() => router.push(`/${city.name}`)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{city.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => null}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{current.temp_f}°F</div>
          <div className="flex items-center space-x-2">
            {/*<span>{city.condition}</span>*/}
            {/*<WeatherIcon condition={city.condition} />*/}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}