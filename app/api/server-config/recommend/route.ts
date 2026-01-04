import { NextResponse } from "next/server";
import { WorkloadIntentSchema } from "@/lib/server-config/schema";
import { recommendServer } from "@/lib/server-config/engine";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate Input
    const intent = WorkloadIntentSchema.parse(body);

    // Compute Recommendation (Server-Side Logic)
    const recommendation = recommendServer(intent);

    // Return Result
    return NextResponse.json(recommendation);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid workload intent", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Recommendation Engine Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
