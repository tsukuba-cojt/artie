"use client";

import { signInWithGoogle } from "@/lib/supabase/auth";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <h1>Login</h1>
      <p>Sign in to access your account</p>
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 text-sm shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Google でログインする
        </button>
      </form>
    </div>
  );
}
