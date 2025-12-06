import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - React-X-Elysia" },
    { name: "description", content: "About page" },
  ];
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 p-4">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          About the Stack
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          This template leverages a modern, high-performance architecture designed for scalability and redundancy. By decoupling the frontend from the backend, we ensure robustness and flexibility.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-gray-50/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Frontend</h3>
            <p className="text-gray-600 dark:text-gray-400">React 19 + React Router v7</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Backend</h3>
            <p className="text-gray-600 dark:text-gray-400">Elysia + Bun</p>
          </div>
        </div>
      </div>
    </div>
  );
}
