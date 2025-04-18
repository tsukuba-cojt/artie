import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing or invalid id parameter" },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from("Work")
      .select(
        `
    Author (
      name,
      description,
      era,
      birthplace,
      keywords
    )
  `,
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Work not found or error fetching description" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: data });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
