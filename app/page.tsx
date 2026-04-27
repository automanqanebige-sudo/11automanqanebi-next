"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const cars = [
  { id: 1, name: "BMW X5", price: 15000 },
  { id: 2, name: "Mercedes E-Class", price: 13000 },
  { id: 3, name: "Toyota Camry", price: 10000 },
];

export default function Home() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // load favorites
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 ავტომანქანები</h1>

      <Link href="/favorites">
        <button style={{ marginBottom: 20 }}>
          ❤️ ფავორიტების ნახვა
        </button>
      </Link>

      {cars.map((car) => (
        <div key={car.id} style={{ marginBottom: 20 }}>
          <h2>{car.name}</h2>
          <p>${car.price}</p>

          <button onClick={() => toggleFavorite(car.id)}>
            {favorites.includes(car.id)
              ? "💔 Remove"
              : "❤️ ფავორიტი"}
          </button>
        </div>
      ))}
    </div>
  );
}