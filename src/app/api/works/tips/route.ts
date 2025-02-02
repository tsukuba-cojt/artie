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
      .select("funFactComments")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Work not found or error fetching funFactComments" },
        { status: 404 },
      );
    }

    let funFacts = [];

    try {
      if (typeof data.funFactComments === "string") {
        funFacts = JSON.parse(data.funFactComments);
      } else if (Array.isArray(data.funFactComments)) {
        funFacts = data.funFactComments;
      }

      if (!Array.isArray(funFacts)) {
        funFacts = [];
      }
    } catch {
      funFacts = [];
    }

    return NextResponse.json({ funFactComments: funFacts.slice(0, 3) });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
