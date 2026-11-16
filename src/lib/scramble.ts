// "Decode" effect: on hover, letters churn through random glyphs and settle
// left to right back into the real text.

const GLYPHS = "!<>-_\\/[]{}=+*^?#%@$&01";
const DURATION = 520; // ms for the whole word to settle

export function scramble(el: HTMLElement) {
  const text = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = text;
  if (el.dataset.running) return;
  el.dataset.running = "1";

  // Freeze the width so proportional fonts don't make the line jitter.
  const { width } = el.getBoundingClientRect();
  el.style.display = "inline-block";
  el.style.width = `${width}px`;
  el.style.whiteSpace = "nowrap";

  const start = performance.now();
  const frame = (now: number) => {
    const t = (now - start) / DURATION;
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      // Each letter settles slightly after the one before it.
      const settleAt = (i / text.length) * 0.7 + 0.3;
      out += ch === " " || t >= settleAt ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = text;
      el.style.removeProperty("display");
      el.style.removeProperty("width");
      el.style.removeProperty("white-space");
      delete el.dataset.running;
    }
  };
  requestAnimationFrame(frame);
}

export function initScramble() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (const el of document.querySelectorAll<HTMLElement>("[data-scramble]")) {
    el.setAttribute("aria-label", el.textContent ?? "");
    el.addEventListener("mouseenter", () => scramble(el));
  }
}
