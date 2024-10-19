'use server';

import { cities } from "@/server/constants/cities";
import { TTrackedCity, TWeather } from "@/lib/types";
import api from "@/server/api";
import { z } from "zod";

const weatherResponseSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime_epoch: z.number(),
    localtime: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    temp_f: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
    humidity: z.number(),
    wind_kph: z.number(),
    feelslike_c: z.number(),
    feelslike_f: z.number(),
  }),
});

const weatherCache = new Map<string, { data: TWeather; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;
const RATE_LIMIT_DURATION = 60 * 1000;
const MAX_REQUESTS_PER_MINUTE = 30;

const requestCounts = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(city: string): boolean {
  const now = Date.now();
  const requestInfo = requestCounts.get(city);

  if (!requestInfo || (now - requestInfo.timestamp) > RATE_LIMIT_DURATION) {
    requestCounts.set(city, { count: 1, timestamp: now });
    return false;
  }

  if (requestInfo.count >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }

  requestInfo.count++;
  return false;
}

export const getCityWeather = async (city: string): Promise<TWeather> => {
  if (!city?.trim()) {
    throw new Error('City name is required');
  }

  if (checkRateLimit(city)) {
    throw new Error('Too many requests for this city. Please try again later.');
  }

  try {
    const cached = weatherCache.get(city);
    const now = Date.now();

    if (cached && (now - cached.timestamp < CACHE_DURATION)) {
      return cached.data;
    }

    const response = await api.get('/api/weather', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
      },
      timeout: 5000,
    });

    const validatedData = weatherResponseSchema.parse(response.data);

    weatherCache.set(city, {
      data: validatedData,
      timestamp: now,
    });

    return validatedData;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error('Weather API response validation failed:', error.errors);
      throw new Error('Invalid weather data received');
    }

    if (error.response?.status === 404) {
      throw new Error(`City "${city}" not found`);
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Weather API request timed out');
    }

    if (error.response?.status === 429) {
      throw new Error('Weather API rate limit exceeded');
    }

    if (!navigator.onLine) {
      throw new Error('No internet connection');
    }

    console.error('Weather API error:', error);
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

export const getAllTrackedCity = async (): Promise<TTrackedCity[]> => {
  try {
    return await new Promise<TTrackedCity[]>((resolve) =>
      setTimeout(() => resolve([...cities]), 1000)
    );
  } catch (error: any) {
    console.error('Error fetching tracked cities:', error);
    throw new Error('Failed to fetch tracked cities');
  }
};

export const addNewCityToTrack = async (city: string): Promise<void> => {
  if (!city?.trim()) {
    throw new Error('City name is required');
  }

  try {
    await getCityWeather(city);

    const isDuplicate = cities.some(
      existingCity => existingCity.name.toLowerCase() === city.toLowerCase()
    );

    if (isDuplicate) {
      throw new Error('City is already being tracked');
    }

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        cities.push({
          id: crypto.randomUUID(),
          name: city,
        });
        resolve();
      }, 1000)
    );
  } catch (error: any) {
    console.error('Error adding city:', error);
    throw error;
  }
};