import { useState } from "react";
import type { Route } from "./+types/home";
import { GlassInput } from "../components/GlassInput";
import client from "../libs/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - React-X-Elysia" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [greeting, setGreeting] = useState<{ message: string; from: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGreet = async (name: string) => {
    setLoading(true);
    setGreeting(null);
    setError(null);
    
    try {
      const { data, error: apiError } = await client.demo.greet.get({
        query: { name }
      });

      if (data) {
        setGreeting(data);
      } else if (apiError) {
        console.error("Error fetching greeting:", apiError);
        setError("Are you sure the backend is running? Please check the README.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Are you sure the backend is running? Please check the README.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 p-4">
      <div className="max-w-3xl w-full text-center space-y-12">
        <div className="space-y-8">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-medium border border-black/5 dark:border-white/10 backdrop-blur-md">
            v1.0.0 Template
          </div>
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            React-X-Elysia
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            High-performance full-stack template with separated hosting architecture.
          </p>
        </div>

        <div className="max-w-md mx-auto w-full space-y-8">
          <GlassInput onGreet={handleGreet} disabled={loading} />
          
          <div className="h-24 flex items-center justify-center">
            {greeting && (
              <div
                className="p-6 rounded-2xl bg-gray-50/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <p className="text-xl font-medium text-gray-900 dark:text-white">
                  {greeting.message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  from: {greeting.from}
                </p>
              </div>
            )}
            
            {error && (
              <div
                className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 backdrop-blur-xl border border-red-200 dark:border-red-800/30 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" x2="12" y1="8" y2="12"/>
                    <line x1="12" x2="12.01" y1="16" y2="16"/>
                  </svg>
                  <p className="font-medium text-sm">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
