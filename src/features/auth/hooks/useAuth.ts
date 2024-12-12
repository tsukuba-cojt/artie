import { createClient } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();

  const signInWithGoogle = async () => {
    try {
      const {
        data: { url },
        error,
      } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        },
      });

      if (error) {
        console.error("Error during Google sign-in:", error.message);
        router.push("/error?message=authentication-failed");
        return;
      }

      if (!url) {
        console.error("No URL returned from signInWithOAuth");
        router.push("/error?message=authentication-failed");
        return;
      }

      router.push(url);
    } catch (err) {
      console.error("Unexpected error during Google sign-in:", err);
      router.push("/error?message=authentication-failed");
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (err) {
      console.error("Error during sign-out:", err);
      router.push("/error?message=sign-out-failed");
    }
  };

  return { signInWithGoogle, signOut };
}
