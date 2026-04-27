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

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: number) => {
    let updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚗 ავტომანქანები</h1>

      <Link href="/favorites">
        <button style={styles.favBtn}>❤️ ფავორიტები</button>
      </Link>

      {cars.map((car) => (
        <div key={car.id} style={styles.card}>
          <h2>{car.name}</h2>
          <p style={styles.price}>${car.price}</p>

          <button
            style={{
              ...styles.button,
              background: favorites.includes(car.id)
                ? "#ff4d4d"
                : "#ff9800",
            }}
            onClick={() => toggleFavorite(car.id)}
          >
            {favorites.includes(car.id)
              ? "💔 წაშლა"
              : "❤️ ფავორიტი"}
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