import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } =
    process.env;

  if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase環境変数が設定されていません");
  }

  let response = NextResponse.next();

  const supabase = createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    if (!request.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return response;
  }

  const { data: userProfile } = await supabase
    .from("user")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!userProfile) {
    if (
      !request.nextUrl.pathname.startsWith("/auth/register") &&
      !request.nextUrl.pathname.startsWith("/auth/login")
    ) {
      return NextResponse.redirect(new URL("/auth/register", request.url));
    }
    return response;
  }

  if (
    request.nextUrl.pathname.startsWith("/auth/login") ||
    request.nextUrl.pathname.startsWith("/auth/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
