import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

// ── Particle class ──────────────────────────────────────────────────────────
class PointerParticle {
  x: number;
  y: number;
  size: number;
  decay: number;
  speed: number;
  spreadX: number;
  spreadY: number;
  color: string;
  ctx: CanvasRenderingContext2D;

  constructor(
    spread: number,
    speed: number,
    ctx: CanvasRenderingContext2D,
    pointer: { x: number; y: number; mx: number; my: number },
    hue: number
  ) {
    this.ctx = ctx;
    this.x = pointer.x;
    this.y = pointer.y;
    this.size = Math.random() + 0.5;
    this.decay = 0.012;
    this.speed = speed * 0.08;
    const s = spread * this.speed;
    this.spreadX = (Math.random() - 0.5) * s - pointer.mx * 0.1;
    this.spreadY = (Math.random() - 0.5) * s - pointer.my * 0.1;
    this.color = `hsl(${hue}deg 90% 60%)`;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  trail() {
    this.x += this.spreadX * this.size;
    this.y += this.spreadY * this.size;
  }

  collapse() {
    this.size -= this.decay;
  }

  update() {
    this.draw();
    this.trail();
    this.collapse();
  }
}

// ── Cursor Component ────────────────────────────────────────────────────────
const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Resize canvas to full viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle state
    let particles: PointerParticle[] = [];
    let hue = 0;
    const pointer = { x: 0, y: 0, mx: 0, my: 0 };
    let timePrevious = performance.now();
    const msPerFrame = 1000 / 60;
    let hover = false;

    // Mouse tracking
    const onMove = (e: MouseEvent) => {
      pointer.mx = e.movementX;
      pointer.my = e.movementY;
      pointer.x = e.clientX;
      pointer.y = e.clientY;

      // GSAP dot follow
      if (!hover) {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12 });
      }

      // Velocity-based trail
      const vel = Math.floor(
        Math.sqrt(e.movementX ** 2 + e.movementY ** 2)
      );
      for (let i = 0; i < 18; i++) {
        particles.push(
          new PointerParticle(1, vel, ctx, pointer, hue)
        );
      }
    };

    const onClick = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.mx = 0;
      pointer.my = 0;
      for (let i = 0; i < 280; i++) {
        particles.push(
          new PointerParticle(
            Math.random() + 50,
            Math.random() + 1,
            ctx,
            pointer,
            hue
          )
        );
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    // Data-cursor hover magic (keep existing behaviour)
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const el = item as HTMLElement;
      el.addEventListener("mouseover", (e: MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        if (el.dataset.cursor === "icons") {
          dot.classList.add("cursor-icons");
          gsap.to(dot, { x: rect.left, y: rect.top, duration: 0.1 });
          dot.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (el.dataset.cursor === "disable") {
          dot.classList.add("cursor-disable");
        }
      });
      el.addEventListener("mouseout", () => {
        dot.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });

    // Animation loop
    const loop = () => {
      requestAnimationFrame(loop);

      const now = performance.now();
      const delta = now - timePrevious;
      if (delta < msPerFrame) return;
      timePrevious = now - (delta % msPerFrame);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hue = hue > 360 ? 0 : hue + 3;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        if (particles[i].size <= 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      {/* Particle canvas — full-page, behind everything */}
      <canvas className="cursor-canvas" ref={canvasRef} />
      {/* Small sharp dot */}
      <div className="cursor-main" ref={dotRef} />
    </>
  );
};

export default Cursor;
