export async function GET() {
  const cars = [
    { id: 1, name: "BMW X5", price: 15000 },
    { id: 2, name: "Mercedes E-Class", price: 13000 },
    { id: 3, name: "Toyota Camry", price: 10000 },
  ];

  return Response.json(cars);
}