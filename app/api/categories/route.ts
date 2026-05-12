import { NextResponse } from 'next/server';
import { categories } from '@/app/lib/gameData';

export async function GET() {
  return NextResponse.json(categories);
}
