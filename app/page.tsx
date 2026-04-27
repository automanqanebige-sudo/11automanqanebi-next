"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [cars, setCars] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  // მანქანების წამოღება API-დან
  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then(setCars);

    fetch("/api/favorites")
      .then((res) => res.json())
      .then(setFavorites);
  }, []);

  const toggleFavorite = async (id: number) => {
    if (favorites.includes(id)) {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setFavorites(await res.json());
    } else {
      const res = await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      setFavorites(await res.json());
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 ავტომანქანები</h1>

      <Link href="/favorites">
        <button>❤️ ფავორიტები</button>
      </Link>

      {cars.map((car) => (
        <div key={car.id}>
          <h2>{car.name}</h2>
          <p>${car.price}</p>

          <button onClick={() => toggleFavorite(car.id)}>
            {favorites.includes(car.id)
              ? "💔 წაშლა"
              : "❤️ ფავორიტი"}
          </button>
        </div>
      ))}
    </div>
  );
}