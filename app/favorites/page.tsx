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
    if (saved) setFavorites(JSON.parse(saved));
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
    <div style={styles.container}>
      <h1 style={styles.title}>❤️ ფავორიტები</h1>

      <Link href="/">
        <button style={styles.favBtn}>⬅ უკან</button>
      </Link>

      {favoriteCars.length === 0 && <p>არ გაქვს ფავორიტები</p>}

      {favoriteCars.map((car) => (
        <div key={car.id} style={styles.card}>
          <h2>{car.name}</h2>
          <p style={styles.price}>${car.price}</p>

          <button
            style={{ ...styles.button, background: "#ff4d4d" }}
            onClick={() => removeFavorite(car.id)}
          >
            ❌ წაშლა
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    background: "#f5f5f5",
    minHeight: "100vh",
    padding: 20,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
  },
  favBtn: {
    marginBottom: 20,
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  price: {
    marginBottom: 10,
    color: "#555",
  },
  button: {
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};