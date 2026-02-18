"use client";

import { useRef, useEffect } from "react";

const CHARS = "0123456789abcdef";
const SNIPPETS = [
  "0x7f3a…c91d",
  "verify()",
  "sha256",
  "merkle_root",
  "nonce: 48",
  "gas: 21000",
  "block: 194",
  "kyc:pass",
  "risk:0.03",
  "vault.sol",
  "yield:8.2%",
  "tvl:$51.8M",
  "collat:103%",
  "staked:88%",
  "tx_hash",
  "audit:ok",
  "sig:valid",
  "epoch:412",
];

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
  useSnippet: boolean;
  snippet: string;
  snippetY: number;
}

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const fontSize = 13;
    const colWidth = 36;
    const numCols = Math.floor(width / colWidth);

    const columns: Column[] = Array.from({ length: numCols }, (_, i) => {
      const useSnippet = Math.random() > 0.6;
      return {
        x: i * colWidth + Math.random() * 10,
        y: Math.random() * -height,
        speed: 0.3 + Math.random() * 0.6,
        chars: Array.from(
          { length: 8 + Math.floor(Math.random() * 12) },
          () => CHARS[Math.floor(Math.random() * CHARS.length)]
        ),
        opacity: 0.03 + Math.random() * 0.06,
        useSnippet,
        snippet: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
        snippetY: Math.random() * 5,
      };
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `400 ${fontSize}px "JetBrains Mono", monospace`;

      for (const col of columns) {
        col.y += col.speed;

        if (col.useSnippet) {
          // Render snippet as a single string falling down
          const baseAlpha = col.opacity;
          ctx.fillStyle = `rgba(33, 118, 255, ${baseAlpha * 1.5})`;
          ctx.fillText(col.snippet, col.x, col.y);

          if (col.y > height + 100) {
            col.y = Math.random() * -200 - 50;
            col.snippet =
              SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
            col.speed = 0.3 + Math.random() * 0.6;
          }
        } else {
          // Render individual hex characters in a column
          for (let j = 0; j < col.chars.length; j++) {
            const charY = col.y + j * (fontSize + 4);
            const distFromHead = j / col.chars.length;
            const alpha = col.opacity * (1 - distFromHead * 0.7);

            // Head character is brighter
            if (j === 0) {
              ctx.fillStyle = `rgba(0, 229, 160, ${alpha * 2.5})`;
            } else {
              ctx.fillStyle = `rgba(33, 118, 255, ${alpha})`;
            }

            ctx.fillText(col.chars[j], col.x, charY);

            // Randomly mutate characters
            if (Math.random() < 0.01) {
              col.chars[j] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }

          const tailY = col.y + col.chars.length * (fontSize + 4);
          if (tailY > height + 100) {
            col.y = Math.random() * -300 - 50;
            col.speed = 0.3 + Math.random() * 0.6;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full hidden md:block"
      aria-hidden="true"
    />
  );
}
