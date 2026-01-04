import { NextRequest, NextResponse } from 'next/server';
import { WorkloadIntentSchema } from '@/lib/server-config/schema';
import { calculateRequirements } from '@/lib/server-config/engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const intent = WorkloadIntentSchema.parse(body);
    const result = calculateRequirements(intent);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid intent payload' }, { status: 400 });
  }
}
