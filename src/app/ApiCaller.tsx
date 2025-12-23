"use client";

import { useState } from "react";

const buttonBaseStyles =
  "rounded-full border border-solid border-black/[.12] dark:border-white/[.18] transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-5 font-medium";

type Props = {
  initialServerTime: string;
};

export function ApiCaller({ initialServerTime }: Props) {
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
    <div className="space-y-4">
      <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
        Page generated at (ISR): {initialServerTime}
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
  );
}
