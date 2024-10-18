import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import AsyncSelect from "react-select/async";
import api from "@/server/api";
import debounce from "lodash/debounce";

type CityOption = {
  label: string;
  value: string;
};

export const AddCityForm: React.FC<{ onAddCity: (name: string) => void }> = ({ onAddCity }) => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCity) {
      onAddCity(selectedCity.value);
      setSelectedCity(null);
    }
  };

  const loadOptions = async (inputValue: string) => {
    if (inputValue.trim() === "") return [];
    try {
      const response = await api.get(`api/city?q=${inputValue}`);
      return response.data.map((city: any) => ({
        label: `${city.name}, ${city.region}, ${city.country}`,
        value: city.name,
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  const debouncedLoadOptions = useCallback(
    debounce((inputValue: string, callback: (options: CityOption[]) => void) => {
      loadOptions(inputValue).then(callback);
    }, 300),
    []
  );

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedCity}
        onChange={(newValue) => setSelectedCity(newValue as CityOption)}
        loadOptions={debouncedLoadOptions}
        className="flex-grow"
        placeholder="Search for a city..."
        isClearable
      />
      <Button type="submit">Add City</Button>
    </form>
  );
};