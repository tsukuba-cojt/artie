// src/app/api/auth/callback.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Callback triggered"); // デバッグログ
  console.log("Request URL:", request.url);

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  console.log("code", code);

  if (!code) {
    return NextResponse.redirect(`${origin}/400`, { status: 400 });
  }

  console.log("ここ！！");

  const supabase = createClient();
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

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`, { status: 302 });
  }

  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`, {
      status: 302,
    });
  }

  return NextResponse.redirect(`${origin}${next}`, { status: 302 });
}
