import { NextResponse } from 'next/server';
import Config from '../../../../config/config';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ error: 'Missing input query' }, { status: 400 });
  }

  const apiKey = Config.MAP_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}&types=geocode`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch autocomplete data' }, { status: 500 });
  }
}
