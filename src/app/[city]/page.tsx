'use client';

import React from "react";
import { weatherData } from "@/app/[city]/_constants";
import { CurrentWeather } from "@/app/[city]/_components/current-weather";
import { Forecast } from "@/app/[city]/_components/forecast-day";
import { TemperatureChart } from "@/app/[city]/_components/temperature-chart";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { usePromise } from "@/lib/hook/use-promise";
import { Button } from "@/components/ui/button";

export default  function Home() {
  const router = useRouter()
  const param = useParams();
  const {data,loading} = usePromise('weather-forecast',{
    'q': param.city as string,
    days:7
  })

  console.log({data, loading});
  if (loading || !data) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 gap-2">
        {/*GO back button*/}

        <Button onClick={() => router.push('/')}>back</Button>


        Weather in {data.location.name}, {data.location.region}, {data.location.country}</h1>

      <CurrentWeather current={data.current} />
      <Forecast forecast={data.forecast}/>
      <TemperatureChart forecast={data.forecast}/>
    </div>
  );
}
