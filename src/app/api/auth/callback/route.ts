import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Request URL:", request.url);

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("これが認証コードです。", code);

  if (!code) {
    return NextResponse.redirect(`${origin}/400`, { status: 400 });
  }

  const supabase = createClient();

  // console.log(supabase.auth);
  const {
    data: { user: supabaseUser },
    error,
  } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Error exchanging code for session:", error);
    return NextResponse.redirect(`${origin}/401`, { status: 401 });
  }

  if (!supabaseUser) {
    return NextResponse.redirect(`${origin}/404`, { status: 404 });
  }

  console.log("Supabase User ID:", supabaseUser.id);

  const { data: user, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("id", supabaseUser.id)
    .single();

  if (userError) {
    console.error("Error fetching user from user table:", userError);
  }

  if (user) {
    console.log("User found, redirecting to /");
    return NextResponse.redirect(`${origin}/`, { status: 302 });
  }

  console.log("User not found, redirecting to /register");
  return NextResponse.redirect(`${origin}/auth/register`, { status: 302 });
}
