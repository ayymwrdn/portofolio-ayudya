"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// ── Glitter particle ──────────────────────────────────────────────────────────
function Glitter({ x, y, id, onDone }: { x: number; y: number; id: number; onDone: (id: number) => void }) {
  const shapes = ["✦", "✧", "⋆", "✺", "✼", "❋", "★"];
  const colors = ["#c084fc", "#f472b6", "#e879f9", "#a855f7", "#fbcfe8", "#f9a8d4"];
  const count = 8;
  const particles = Array.from({ length: count }, (_, i) => ({
    angle: (360 / count) * i + Math.random() * 20,
    dist: 30 + Math.random() * 55,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 10 + Math.random() * 14,
    delay: Math.random() * 0.12,
  }));

  return (
    <div style={{ position: "fixed", left: x, top: y, pointerEvents: "none", zIndex: 9999 }}>
      {particles.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.dist;
        const ty = Math.sin(rad) * p.dist;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: 0, x: tx, y: ty, scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.8 + Math.random() * 0.4, delay: p.delay, ease: "easeOut" }}
            onAnimationComplete={i === 0 ? () => onDone(id) : undefined}
            style={{
              position: "absolute",
              fontSize: p.size,
              color: p.color,
              transform: "translate(-50%, -50%)",
              filter: `drop-shadow(0 0 4px ${p.color})`,
              userSelect: "none",
            }}
          >
            {p.shape}
          </motion.span>
        );
      })}
    </div>
  );
}

// ── Custom cursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });
  const [showCursor, setShowCursor] = useState(false);
  const [glitters, setGlitters] = useState<{ x: number; y: number; id: number }[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const down = (e: MouseEvent) => {
      setShowCursor(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      counterRef.current += 1;
      setGlitters((g) => [...g, { x: e.clientX, y: e.clientY, id: counterRef.current }]);
      setTimeout(() => setShowCursor(false), 300);
    };
    window.addEventListener("mousedown", down);
    return () => window.removeEventListener("mousedown", down);
  }, [cursorX, cursorY]);

  const removeGlitter = (id: number) =>
    setGlitters((g) => g.filter((p) => p.id !== id));

  return (
    <>
      <AnimatePresence>
        {showCursor && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              left: springX,
              top: springY,
              width: 40,
              height: 40,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 10000,
            }}
          />
        )}
      </AnimatePresence>
      {glitters.map((g) => (
        <Glitter key={g.id} x={g.x} y={g.y} id={g.id} onDone={removeGlitter} />
      ))}
    </>
  );
}

// ── Animated flower ───────────────────────────────────────────────────────────
function AnimatedFlower() {
  const [bloomed, setBloomed] = useState(true);
  const [sparkle, setSparkle] = useState(false);

  const handleClick = () => {
    setBloomed((b) => !b);
    setSparkle(true);
    setTimeout(() => setSparkle(false), 700);
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        right: "-7px",
        top: "200px",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <img
        src="/images/bunga.png"
        alt="Bunga"
        style={{
          width: 220,
          height: 220,
          objectFit: "contain",
          transition: "all 0.3s ease",
          transform: bloomed ? "scale(1)" : "scale(0.6)",
          opacity: bloomed ? 1 : 0.7,
        }}
      />
      <AnimatePresence>
        {sparkle && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(216,180,254,0.8)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Contact Row ───────────────────────────────────────────────────────────────
function ContactRow({
  icon,
  label,
  href,
  delay,
}: {
  icon: string;
  label: string;
  href: string;
  delay: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        padding: "7px 18px 7px 8px",
        borderRadius: 999,
        background: hov
          ? "linear-gradient(135deg, rgba(192,132,252,0.18), rgba(244,114,182,0.14))"
          : "rgba(255,255,255,0.60)",
        border: `1.5px solid ${hov ? "rgba(192,132,252,0.55)" : "rgba(216,180,254,0.35)"}`,
        backdropFilter: "blur(12px)",
        boxShadow: hov
          ? "0 4px 20px rgba(168,85,247,0.2)"
          : "0 2px 10px rgba(216,180,254,0.12)",
        transition: "all 0.22s ease",
        cursor: "pointer",
        width: "fit-content",
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: hov
            ? "linear-gradient(135deg, #c084fc, #f472b6)"
            : "rgba(216,180,254,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          flexShrink: 0,
          transition: "all 0.22s ease",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: hov ? "#7c3aed" : "#555",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.01em",
          transition: "color 0.22s ease",
        }}
      >
        {label}
      </span>
    </motion.a>
  );
}

// ── Main Profile component ────────────────────────────────────────────────────
export default function Profile() {
  return (
    <>
      <CustomCursor />

      <section
        id="profile"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "100px 6vw",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/images/bgp.jpg"
            alt="Background"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {/* Soft edge vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, transparent 52%, rgba(245,235,255,0.32) 100%)",
          }}
        />

        {/* Content wrapper */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
            flexWrap: "wrap",
            maxWidth: 1200,
            margin: "0 auto",
            flexDirection: "row",
          }}
        >
          {/* ── Left: text ── */}
          <div style={{ flex: 1, minWidth: 280, maxWidth: 550 }}>
            {/* Flower */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 16 }}
            >
              <AnimatedFlower />
            </motion.div>

            {/* Greeting */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                margin: "0 0 6px 0",
                fontFamily: "'DM Sans', sans-serif",
                color: "#1a1a1a",
                fontWeight: 900,
                lineHeight: 1.15,
              }}
            >
              Hello, I'm{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #c084fc, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ayudya!
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
              style={{
                height: 1.5,
                width: 60,
                background: "linear-gradient(90deg, #c084fc, #f472b6)",
                borderRadius: 99,
                transformOrigin: "left",
                marginBottom: 20,
              }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "#333",
                marginBottom: 28,
                fontFamily: "'Kaushan Script', cursive",
              }}
            >
              I am a 4th-semester Information Systems student at{" "}
              <span style={{ color: "#9333ea", fontWeight: 600 }}>
                Universitas Pamulang
              </span>{" "}
              with a passion for Full Stack Development. I enjoy learning new technologies,
              solving problems, and building digital solutions. Through continuous learning
              and hands-on projects, I aim to strengthen my technical skills and gain valuable
              professional experience in the technology industry.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ display: "flex", flexDirection: "row", gap: 12, flexWrap: "wrap" }}
            >
              <ContactRow
                icon="✉️"
                label="gustiayudyakusumawardani@gmail.com"
                href="mailto:gustiayudyakusumawardani@gmail.com"
                delay={0.38}
              />
              <ContactRow
                icon="📱"
                label="085711833639"
                href="tel:+6285711833639"
                delay={0.46}
              />
            </motion.div>
          </div>

          {/* ── Right: photo dengan animasi floating ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flexShrink: 0 }}
          >
            <motion.img
              src="/images/profile.png"
              alt="Ayudya"
              animate={{
                y: [0, -16, 0],
                rotate: [-1.5, 1.5, -1.5],
                x: [0, 4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: 380,
                height: 380,
                objectFit: "cover",
                display: "block",
                filter: "drop-shadow(0 16px 40px rgba(192,132,252,0.25))",
              }}
            />
          </motion.div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=Kaushan+Script&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>
    </>
  );
}