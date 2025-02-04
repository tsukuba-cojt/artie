// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        async setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              (await cookieStore).set(name, value, options);
            }
          } catch (error) {
            console.error("Failed to set cookies in Server Component:", error);
            throw new Error(
              "Failed to set cookies in Server Component. This may indicate an issue with server-side rendering.",
            );
          }
        },
      },
    },
  );
}

export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll();
        },
        async setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              (await cookies()).set(name, value, options);
            }
          } catch (error) {
            console.error("Failed to set cookies in Server Component:", error);
            throw new Error("Failed to set cookies in Server Component.");
          }
        },
      },
    },
  );
}
