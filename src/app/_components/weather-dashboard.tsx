'use client';

import React, { useCallback, useEffect, useState } from "react";
import { TTrackedCity, TWeather } from "@/lib/types";
import { addNewCityToTrack, getAllTrackedCity, getCityWeather } from "@/server/actions/city";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { WeatherCard } from "@/app/_components/weather-card";
import { AddCityForm } from "@/app/_components/add-city-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Skeleton Loader for City
const CitySkeleton = () => (
  <div className="border border-gray-300 rounded p-4 animate-pulse">
    <div className="h-6 bg-gray-200 mb-4"></div>
    <div className="h-4 bg-gray-200 mb-2"></div>
    <div className="h-4 bg-gray-200"></div>
  </div>
);

export function WeatherDashboard() {
  const [isAddingCity, setIsAddingCity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<Map<string, TWeather>>(new Map());
  const [trackedCities, setTrackedCities] = useState<TTrackedCity[]>([]);
  const [refreshing, setRefreshing] = useState<Set<string>>(new Set());
  const [addingCityName, setAddingCityName] = useState<string | null>(null);

  const addCity = async (name: string) => {
    // Prevent duplicate cities
    if (trackedCities.some(city => city.name.toLowerCase() === name.toLowerCase())) {
      toast({
        variant: "destructive",
        title: "City already exists",
        description: "This city is already being tracked.",
      });
      return;
    }

    try {
      setIsAddingCity(true);
      setAddingCityName(name); // Set the name of the city being added
      await addNewCityToTrack(name);
      await getTrackedCities(); // Refresh list after adding

      toast({
        title: "Success",
        description: `${name} has been added to your tracked cities.`,
      });
    } catch (error: any) {
      const errorMessage = error.message?.includes("not found")
        ? `City "${name}" not found. Please check the spelling and try again.`
        : "Failed to add city. Please try again.";

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsAddingCity(false);
      setAddingCityName(null); // Reset after adding is done
    }
  };

  const fetchCityWeather = async (city: string, silentUpdate = false) => {
    if (!silentUpdate) {
      setRefreshing(prev => new Set(prev).add(city));
    }

    try {
      const data = await getCityWeather(city);
      setWeatherData(prev => {
        const newMap = new Map(prev);
        newMap.set(city, data);
        return newMap;
      });
    } catch (error: any) {
      if (!silentUpdate) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to fetch weather data for ${city}. ${error.message}`,
        });
      }
      console.error(`Error fetching weather for ${city}:`, error);
    } finally {
      if (!silentUpdate) {
        setRefreshing(prev => {
          const newSet = new Set(prev);
          newSet.delete(city);
          return newSet;
        });
      }
    }
  };

  const getTrackedCities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cities = await getAllTrackedCity();
      setTrackedCities(cities);

      await Promise.allSettled(
        cities.map(city => fetchCityWeather(city.name, true))
      );
    } catch (error: any) {
      setError('Failed to fetch tracked cities. Please refresh the page.');
      console.error('Error fetching tracked cities:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTrackedCities();
  }, [getTrackedCities]);

  useEffect(() => {
    if (trackedCities.length === 0) return;

    const refreshWeather = () => {
      trackedCities.forEach(city => fetchCityWeather(city.name, true));
    };

    refreshWeather(); // Initial fetch
    const refreshInterval = setInterval(refreshWeather, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [trackedCities]);

  const removeCity = async (cityId: string) => {
    try {
      setTrackedCities(prev => prev.filter(city => city.id !== cityId));

      const cityToRemove = trackedCities.find(city => city.id === cityId);
      if (cityToRemove) {
        setWeatherData(prev => {
          const newMap = new Map(prev);
          newMap.delete(cityToRemove.name);
          return newMap;
        });
      }

      toast({
        title: "City removed",
        description: "The city has been removed from tracking.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove city. Please try again.",
      });
      getTrackedCities();
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <AddCityForm onAddCity={addCity} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : trackedCities.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 p-8">
            No cities tracked yet. Add a city to get started!
          </div>
        ) : (
          trackedCities.map(city => (
            <div key={city.id}>
              {addingCityName === city.name ? (
                <CitySkeleton />
              ) : (
                <WeatherCard
                  city={weatherData.get(city.name)!?.location}
                  current={weatherData.get(city.name)!?.current}
                  onRemove={() => removeCity(city.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
