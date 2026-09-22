"use client";

import { useEffect, useState } from "react";

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 2v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 20v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.93 4.93l1.41 1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.66 17.66l1.41 1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 12h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 12h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.93 19.07l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 13.2A8.5 8.5 0 0 1 10.8 3a6.9 6.9 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TopBar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const STORAGE_KEY = "theme:v1";

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      const nextTheme: "light" | "dark" =
        stored === "dark" || stored === "light"
          ? stored
          : window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

      document.documentElement.dataset.theme = nextTheme;
      queueMicrotask(() => setTheme(nextTheme));
    } catch {
      // no-op
    }
  }, []);

  function alternarTema() {
    const STORAGE_KEY = "theme:v1";

    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // no-op
    }

    document.documentElement.dataset.theme = nextTheme;
  }

  return (
    <header className="topbar" role="banner">
      <div className="topbar-inner">
        <div className="brand" aria-label="Marca do aplicativo">
          <div className="brand-mark" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="brand-name">Neon Tasks</div>
            <div className="brand-subtitle">Tarefas com estilo</div>
          </div>
        </div>

        <div className="topbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={alternarTema}
            aria-label="Alternar tema"
            title="Alternar tema"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
