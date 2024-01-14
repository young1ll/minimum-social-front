import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    message: 'Hello, World!',
    user: { id: 1, name: 'John Doe', email: 'jdoe@me.com', role: 'admin' },
    accessToken: '1234567890',
  });
}
