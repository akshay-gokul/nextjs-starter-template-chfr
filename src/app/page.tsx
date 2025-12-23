import { ApiCaller } from "./ApiCaller";

export const revalidate = 60;

export default function Home() {
  const generatedAt = new Date().toISOString();

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

        <ApiCaller initialServerTime={generatedAt} />
      </div>
    </div>
  );
}
