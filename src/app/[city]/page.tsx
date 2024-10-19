'use client';

import React from "react";
import { CurrentWeather } from "@/app/[city]/_components/current-weather";
import { Forecast } from "@/app/[city]/_components/forecast-day";
import { TemperatureChart } from "@/app/[city]/_components/temperature-chart";
import { useParams, useRouter } from "next/navigation";
import { usePromise } from "@/lib/hook/use-promise";
import { Button } from "@/components/ui/button";
import { Loader2, MoveLeft } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const param = useParams();
  const { data, loading } = usePromise('weather-forecast', {
    'q': param.city as string,
    days: 7
  });

  if (loading || !data) {
    return <div className="h-screen  flex justify-center items-center p-8">
      <Loader2 className="h-8 w-8 animate-spin"/>
    </div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/*GO back button*/}

      <div className={'flex gap-2'}>
          <MoveLeft className="h-8 w-8 cursor-pointer hover:bg-slate-100 p-1 rounded" onClick={() => router.push('/')}/>
        <h1 className="text-2xl font-bold mb-4 gap-2">
          Weather in {data.location.name}, {data.location.region}, {data.location.country}</h1>
      </div>

      <CurrentWeather current={data.current}/>
      <Forecast forecast={data.forecast}/>
      <TemperatureChart forecast={data.forecast}/>
    </div>
  );
}
