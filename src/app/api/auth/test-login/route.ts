import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const TEST_EMAIL = process.env.TEST_USER_EMAIL || "test@example.com";
  const TEST_PASSWORD = process.env.TEST_USER_PASSWORD || "password123";

  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

  if (signInError) {
    return NextResponse.json({ error: signInError.message }, { status: 400 });
  }

  const user = signInData.user;
  if (!user) {
    // ここに来ることは少ないですが、念のため
    return NextResponse.json(
      { error: "User object not found after sign-in." },
      { status: 400 }
    );
  }

  const { data: userRecord, error: userCheckError } = await supabase
    .from("User")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (userCheckError) {
    return NextResponse.json(
      { error: userCheckError.message },
      { status: 400 }
    );
  }

  if (userRecord) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.redirect(new URL("/auth/register", request.url));
  }
}
