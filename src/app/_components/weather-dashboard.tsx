'use client';

import React, { useEffect, useState } from "react";
import { AddCityForm } from "@/app/_components/add-city-form";
import { WeatherCard } from "@/app/_components/weather-card";
import { usePromise } from "@/lib/hook/use-promise";
import { TWeather } from "@/lib/types";

export interface City {
  id: number
  name: string
  temp: number
  condition: string
}

const initialCities: TWeather[] = [
  // { id: 1, name: "New York", temp: 72, condition: "Sunny" },
  // { id: 2, name: "London", temp: 62, condition: "Cloudy" },
  // { id: 3, name: "Tokyo", temp: 80, condition: "Rainy" },
]

export function WeatherDashboard() {

  const [cities, setCities] = useState<TWeather[]>(initialCities);
  const {data, updateParams} = usePromise('weather')

  useEffect(() => {
    if (data) {
      setCities([...cities, data]);
    }
  }, [data]);

  console.log(data);
  const addCity = (name: string) => {
    const newCityData: City = {
      id: cities.length + 1,
      name,
      temp: Math.floor(Math.random() * 30) + 60, // Random temp between 60-90
      condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
    };
    updateParams({q: name})

  };

  const removeCity = (id: number) => {
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <AddCityForm onAddCity={addCity}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city, index) => (
          <WeatherCard key={index} city={city.location} current={city.current} onRemove={removeCity}/>
        ))}
      </div>
    </div>
  );
}