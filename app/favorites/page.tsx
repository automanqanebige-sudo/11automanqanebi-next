"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then(setCars);

    fetch("/api/favorites")
      .then((res) => res.json())
      .then(setFavorites);
  }, []);

  const removeFavorite = async (id: number) => {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    setFavorites(await res.json());
  };

  const favoriteCars = cars.filter((car) =>
    favorites.includes(car.id)
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>❤️ ფავორიტები</h1>

      <Link href="/">
        <button>⬅ უკან</button>
      </Link>

      {favoriteCars.map((car) => (
        <div key={car.id}>
          <h2>{car.name}</h2>
          <p>${car.price}</p>

          <button onClick={() => removeFavorite(car.id)}>
            ❌ წაშლა
          </button>
        </div>
      ))}
    </div>
  );
}