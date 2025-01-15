// src/actions/auth.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const supabase = createClient();

  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/api/auth/callback`,
    },
  });

  if (error) {
    console.error("Error during Google sign-in:", error.message);
    redirect("/error?message=authentication-failed");
  }

  if (!url) {
    console.error("No URL returned from signInWithOAuth");
    redirect("/error?message=authentication-failed");
  }

  console.log("リダイレクト先", url);

  redirect(url);
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/auth/login");
}
