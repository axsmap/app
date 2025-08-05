import { NextResponse } from 'next/server';
import Config from '../../../../config/config';
export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get('place_id');

  if (!placeId) {
    return NextResponse.json({ error: 'Missing place_id' }, { status: 400 });
  }
  const apiKey = Config.MAP_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeId}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: 500 });
  }
}
