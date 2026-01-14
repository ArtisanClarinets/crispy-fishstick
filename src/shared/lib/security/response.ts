import { NextResponse } from 'next/server';

export function jsonNoStore(data: any, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');
  headers.set('X-Content-Type-Options', 'nosniff');

  return NextResponse.json(data, {
    ...init,
    headers,
  });
}
