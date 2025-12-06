import { useState } from "react";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onGreet: (name: string) => void;
}

export function GlassInput({ onGreet, ...props }: GlassInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onGreet(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative w-full">
        <input
          {...props}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your name..."
          className="
            w-full 
            rounded-2xl 
            border border-white/20 dark:border-white/10
            bg-white/10 dark:bg-black/10
            px-6 py-4 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400
            shadow-[inset_0_0_15px_rgba(255,255,255,0.15)] dark:shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]
            backdrop-blur-xl 
            transition-all 
            duration-300 
            ease-out 
            hover:bg-white/20 dark:hover:bg-white/5
            hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.25)] dark:hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]
            focus:bg-white/20 dark:focus:bg-white/10
            focus:outline-none 
            focus:ring-2 
            focus:ring-white/40 dark:focus:ring-white/20
            focus:shadow-[inset_0_0_25px_rgba(255,255,255,0.3)] dark:focus:shadow-[inset_0_0_25px_rgba(255,255,255,0.15)]
          "
        />
        {/* Decorative light reflection dot */}
        <div className="pointer-events-none absolute right-4 top-4 h-3 w-3 rounded-full bg-white/40 blur-[2px]"></div>
        
        {/* Submit button - absolutely positioned inside the input area */}
        <button
          type="submit"
          disabled={!value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white disabled:opacity-0 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
