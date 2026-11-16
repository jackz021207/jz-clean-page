// "Decode" effect: letters start as faint ASCII-ocean glyphs, condense through
// the sharks' skin ramp (sparse → dense) and settle left to right into the real
// text, lighting up as they land.

// Same ramp the shark renderer uses for skin shading, so the text and the ocean
// read as one material.
const GLYPHS = ".:;t%SX8#@";
const TICK = 55; // ms between glyph changes per letter: calm, not static noise

interface Options {
  /** ms until the last letter settles. */
  duration?: number;
}

export function scramble(el: HTMLElement, { duration = 650 }: Options = {}) {
  if (el.dataset.running) return;
  const text = (el.dataset.text ??= el.textContent ?? "");
  el.dataset.running = "1";

  // Measure each letter's real width so every glyph gets a fixed slot and the
  // word can't jitter while it churns.
  const widths: number[] = [];
  const node = el.firstChild;
  if (node instanceof Text && node.data === text) {
    const range = document.createRange();
    for (let i = 0; i < text.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      widths.push(range.getBoundingClientRect().width);
    }
  }

  const n = text.length;
  const cells: (HTMLSpanElement | null)[] = [];
  const settleAt: number[] = [];
  const lastTick: number[] = [];
  el.textContent = "";
  for (let i = 0; i < n; i++) {
    const ch = text[i];
    if (ch === " ") {
      el.append(" ");
      cells.push(null);
    } else {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.textAlign = "center";
      span.style.color = "var(--faint)";
      span.style.transition = "color 0.35s ease";
      if (widths[i]) span.style.width = `${widths[i]}px`;
      el.append(span);
      cells.push(span);
    }
    // Left to right with a little jitter so it doesn't feel mechanical.
    const order = n > 1 ? i / (n - 1) : 1;
    settleAt.push(Math.min(1, 0.3 + 0.62 * order + (Math.random() - 0.5) * 0.1));
    lastTick.push(-Infinity);
  }

  const start = performance.now();
  const frame = (now: number) => {
    const t = (now - start) / duration;
    for (let i = 0; i < n; i++) {
      const span = cells[i];
      if (!span || span.dataset.done) continue;
      if (t >= settleAt[i]) {
        span.textContent = text[i];
        span.style.color = "";
        span.dataset.done = "1";
      } else if (now - lastTick[i] >= TICK) {
        // Denser glyphs the closer this letter is to landing.
        const p = Math.max(0, t) / settleAt[i];
        const k = Math.round(p * (GLYPHS.length - 1) + (Math.random() - 0.5) * 3);
        span.textContent = GLYPHS[Math.min(GLYPHS.length - 1, Math.max(0, k))];
        lastTick[i] = now;
      }
    }
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      // Let the last letter's color transition finish, then restore plain text
      // (brings back kerning and a single clean text node).
      setTimeout(() => {
        el.textContent = text;
        delete el.dataset.running;
      }, 350);
    }
  };
  // Paint the first scrambled frame synchronously so there's no flash of the real text.
  frame(start);
}

export function initScramble() {
  const root = document.documentElement;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.remove("intro");
    return;
  }
  for (const el of document.querySelectorAll<HTMLElement>("[data-scramble]")) {
    el.setAttribute("aria-label", el.textContent ?? "");
    el.addEventListener("mouseenter", () => scramble(el));
  }

  // Opening: the name decodes once on load. It stays hidden (html.intro) until
  // the display font is in, so letter slots are measured with the right font.
  const hero = document.querySelector<HTMLElement>("h1[data-scramble]");
  if (!hero || !root.classList.contains("intro")) return;
  const fontsReady = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, 1200)),
  ]);
  // Start a beat into the ocean's fade-in.
  const beat = new Promise((r) => setTimeout(r, 400));
  Promise.all([fontsReady, beat]).then(() => {
    scramble(hero, { duration: 1400 });
    root.classList.remove("intro");
  });
}
