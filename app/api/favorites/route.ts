let favorites: number[] = [];

export async function GET() {
  return Response.json(favorites);
}

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!favorites.includes(id)) {
    favorites.push(id);
  }

  return Response.json(favorites);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  favorites = favorites.filter((f) => f !== id);

  return Response.json(favorites);
}