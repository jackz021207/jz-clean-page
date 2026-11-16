// Shared client-side state: the ocean instance and the colour theme.
// Imported by the Ocean, theme toggle and terminal scripts (Vite bundles one copy).
import type { OceanEngine, Theme } from "./ascii-sharks";

let ocean: OceanEngine | null = null;

export function registerOcean(engine: OceanEngine) {
  ocean = engine;
}

export function getOcean() {
  return ocean;
}

const STORAGE_KEY = "theme";

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode: theme just won't persist */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#fafaf8" : "#000000");
  ocean?.setTheme(theme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}
