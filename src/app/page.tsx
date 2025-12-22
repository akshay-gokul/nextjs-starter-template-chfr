"use client";

import { useState } from "react";

const buttonBaseStyles =
  "rounded-full border border-solid border-black/[.12] dark:border-white/[.18] transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-5 font-medium";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callApi = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ping", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data: { message?: string } = await res.json();
      setMessage(data.message ?? "No message returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Demo
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Call a Next.js API Route
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Click the button to hit the server-side endpoint and display the response.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={callApi}
            disabled={isLoading}
            className={`${buttonBaseStyles} ${
              isLoading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800"
                : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            }`}
          >
            {isLoading ? "Calling..." : "Call API"}
          </button>

          {message && (
            <div className="text-green-600 dark:text-green-400 text-sm sm:text-base">
              {message}
            </div>
          )}
          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm sm:text-base">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
