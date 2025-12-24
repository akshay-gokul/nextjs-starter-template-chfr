export const revalidate = 30;

type CacheResponse = {
  key: string;
  value: number;
};

type CacheResult = {
  data?: CacheResponse;
  error?: string;
  status?: number;
};

async function getCacheValue(): Promise<CacheResult> {
  const url =
    "https://project-rainfall-117367875.development.localcatalystserverless.com/server/test/cache";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      const text = await res.text();
      const msg = `Upstream error ${res.status}${text ? `: ${text}` : ""}`;
      console.error(msg);
      return { status: res.status, error: msg };
    }

    const data = (await res.json()) as CacheResponse;
    return { data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Fetch failed:", message);
    return { error: message };
  }
}

export default async function Home() {
  const generatedAt = new Date().toISOString();
  const { data, error, status } = await getCacheValue();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            Demo
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold">ISR API fetch (30s)</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            This page is regenerated at most every 30 seconds. Values below come from the
            upstream endpoint during the last render.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl border border-black/[0.08] dark:border-white/[0.15] bg-white/70 dark:bg-black/40 p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-300">Generated at: {generatedAt}</div>
          {data && (
            <div className="space-y-1">
              <div className="text-lg font-semibold">Key: {data.key}</div>
              <div className="text-2xl font-bold">Value: {data.value}</div>
            </div>
          )}
          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm">
              {status && <span className="font-semibold">Status {status}: </span>}
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
