'use client';

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/server/api";

export const AddCityForm: React.FC<{ onAddCity: (name: string) => void }> = ({ onAddCity }) => {
  const [newCity, setNewCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCity.trim() !== "") {
      onAddCity(newCity)
      setNewCity("")
    }
  }
  useEffect(() => {
    const apiCall = async () => {
      if (newCity.trim() === "") return
      await api.get(`api/city?q=${newCity}`)
    }
    apiCall()
  }, [newCity]);

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Add a city"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Add City</Button>
    </form>
  )
}
