"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const cars = [
  { id: 1, name: "BMW X5", price: 15000 },
  { id: 2, name: "Mercedes E-Class", price: 13000 },
  { id: 3, name: "Toyota Camry", price: 10000 },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((f) => f !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const favoriteCars = cars.filter((car) =>
    favorites.includes(car.id)
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>❤️ ფავორიტები</h1>

      <Link href="/">
        <button style={{ marginBottom: 20 }}>
          ⬅ უკან დაბრუნება
        </button>
      </Link>

      {favoriteCars.length === 0 && <p>არ გაქვს ფავორიტები</p>}

      {favoriteCars.map((car) => (
        <div key={car.id} style={{ marginBottom: 20 }}>
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