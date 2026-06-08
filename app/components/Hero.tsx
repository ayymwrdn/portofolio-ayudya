"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Huruf PORTFOLIO — huruf O ke-2 (index 1) diganti gambar elemeno.png, huruf O lainnya tetap teks
const LETTERS = ["P", "R", "T", "F", "O", "L", "I", "O"];

// Cursor glow custom
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        left: springX, top: springY,
        x: "-50%", y: "-50%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(216,180,254,0.13) 0%, transparent 70%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

// Kupu-kupu melayang — Diklik langsung terbang kabur, lalu balik lagi otomatis
function FloatingButterfly() {
  const [isFlyingAway, setIsFlyingAway] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Efek Animasi Melayang Lembut (Hanya jalan kalau tidak sedang kabur)
  useEffect(() => {
    if (isFlyingAway) return;

    let t = 0;
    const interval = setInterval(() => {
      t += 0.02;
      setPos({ x: Math.sin(t * 0.7) * 18, y: Math.sin(t) * 14 });
    }, 16);
    return () => clearInterval(interval);
  }, [isFlyingAway]);

  const handleTriggerFly = () => {
    if (isFlyingAway) return; // Mencegah spam klik pas lagi terbang
    
    setIsFlyingAway(true);

    // Setelah 2.5 detik, kupu-kupu otomatis balik ke tempat semula
    setTimeout(() => {
      setIsFlyingAway(false);
    }, 2500);
  };

  return (
    <motion.div
      animate={
        isFlyingAway
          ? { 
              x: [-100, -300, -600], 
              y: [-150, -400, -800], 
              scale: [1, 1.3, 0], 
              rotate: [0, -45, -90], 
              opacity: [1, 0.8, 0] 
            }
          : { x: pos.x, y: pos.y, scale: 1, rotate: 0, opacity: 1 }
      }
      transition={
        isFlyingAway
          ? { duration: 1.8, ease: "easeOut" }
          : { type: "spring", stiffness: 30, damping: 10 }
      }
      onClick={handleTriggerFly}
      style={{
        position: "absolute",
        right: "5%",
        top: "55%",
        zIndex: 10,
        cursor: isFlyingAway ? "default" : "pointer",
        filter: "drop-shadow(0 8px 28px rgba(246,182,232,0.6))",
        pointerEvents: "auto",
      }}
    >
      <Image
        src="/images/kupu.png"
        alt="Butterfly"
        width={180}
        height={180}
        loading="eager"
        style={{ objectFit: "contain" }}
      />
    </motion.div>
  );
}

// ✅ FIXED: Partikel kecil - menggunakan useEffect untuk generate random
function Particles() {
  const [items, setItems] = useState<Array<{
    id: number;
    x: string;
    y: string;
    size: number;
    delay: number;
    dur: number;
  }>>([]);

  useEffect(() => {
    const generatedItems = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: `${5 + Math.random() * 90}%`,
      y: `${5 + Math.random() * 90}%`,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 4,
      dur: 3 + Math.random() * 4,
    }));
    setItems(generatedItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      {items.map((p) => (
        <motion.div
          key={p.id}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          style={{
            position: "absolute", left: p.x, top: p.y,
            width: p.size, height: p.size, borderRadius: "50%",
            background: "linear-gradient(135deg, #D8B4FE, #F6B6E8)",
            pointerEvents: "none", zIndex: 1,
          }}
        />
      ))}
    </>
  );
}

// Wave SVG animasi
function WaveBg() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
      {[0, 25, 50, 75, 100, 125].map((offset, i) => (
        <motion.path
          key={i}
          d={`M-100 ${280 + offset} C300 ${160 + offset} 600 ${440 + offset} 900 ${300 + offset} S1300 ${150 + offset} 1540 ${280 + offset}`}
          stroke={`rgba(216,180,254,${0.07 + i * 0.015})`}
          strokeWidth={1.5} fill="none"
          animate={{ d: [
            `M-100 ${280+offset} C300 ${160+offset} 600 ${440+offset} 900 ${300+offset} S1300 ${150+offset} 1540 ${280+offset}`,
            `M-100 ${300+offset} C300 ${200+offset} 600 ${400+offset} 900 ${330+offset} S1300 ${200+offset} 1540 ${260+offset}`,
            `M-100 ${280+offset} C300 ${160+offset} 600 ${440+offset} 900 ${300+offset} S1300 ${150+offset} 1540 ${280+offset}`,
          ]}}
          transition={{ duration: 8 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <CursorGlow />

      <section
        ref={ref}
        id="home"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "110px 40px 70px",
        }}
      >
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/bg.jpg"
            alt="Background"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg, rgba(253,251,255,0.72) 0%, rgba(254,244,251,0.68) 50%, rgba(248,240,255,0.72) 100%)",
          }} />
        </div>

        <WaveBg />
        <Particles />
        <FloatingButterfly />

        {/* Asterisk dekoratif */}
        {[{ l: "4%", t: "18%" }, { l: "91%", t: "18%" }].map((pos, i) => (
          <motion.span key={i}
            animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: i }}
            style={{ position: "absolute", left: pos.l, top: pos.t, fontSize: 30, color: "#1a1a1a", fontWeight: 900, zIndex: 3, pointerEvents: "none" }}
          >✳</motion.span>
        ))}

        {/* Garis horizontal kiri & kanan */}
        {["5%", "78%"].map((l, i) => (
          <motion.div key={i}
            animate={{ scaleX: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            style={{
              position: "absolute", left: l, top: "calc(13% + 12px)",
              width: "10%", height: 1,
              background: i === 0
                ? "linear-gradient(90deg, rgba(216,180,254,0.6), transparent)"
                : "linear-gradient(270deg, rgba(216,180,254,0.6), transparent)",
              zIndex: 3,
            }}
          />
        ))}

        {/* Slash dekoratif bawah kiri */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ position: "absolute", left: "10%", bottom: "20%", fontSize: 30, color: "#D8B4FE", letterSpacing: -2, fontWeight: 300, zIndex: 3 }}
        >
          ///////////
        </motion.div>

        {/* ── KONTEN UTAMA ── */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity, position: "relative", top: "80px", zIndex: 5, textAlign: "center" }}
        >
          {/* ── NAMA — label kecil di atas seperti semula ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontSize: "clamp(13px, 1.8vw, 70px)",
              fontWeight: 700,
              letterSpacing: "0.55em",
              color: "#1a1a1a",
              marginBottom: 10,
              fontFamily: "'Cormorant Garamond', serif",
              textTransform: "uppercase",
            }}
          >
            GUSTI AYUDYA KUSUMAWARDANI
          </motion.p>

          {/* ── PORTFOLIO — huruf muncul satu-satu, O diganti elemeno.png ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "clamp(0px, 0.3vw, 4px)", marginBottom: 16, flexWrap: "wrap",
          }}>
            {/* P */}
            {["P"].map((char, i) => (
              <motion.span key={"pre-" + i}
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.55 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.12, y: -6 }}
                style={{
                  fontSize: "clamp(68px, 13vw, 148px)", fontWeight: 900,
                  lineHeight: 1, letterSpacing: "-0.03em", cursor: "default",
                  fontFamily: "'Playfair Display', serif", color: "#0f0f0f",
                }}
              >{char}</motion.span>
            ))}

            {/* O — diganti gambar elemeno.png */}
            <motion.span
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.62, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.12, y: -6 }}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "clamp(68px, 13vw, 148px)", height: "clamp(68px, 13vw, 148px)",
                position: "relative", cursor: "default",
              }}
            >
              <Image
                src="/images/elemeno.png"
                alt="O"
                fill
                sizes="(max-width: 768px) 13vw, 148px"
                style={{ objectFit: "contain" }}
              />
            </motion.span>

            {/* R T F O L I O */}
            {["R","T","F","O","L","I","O"].map((char, i) => (
              <motion.span key={"post-" + i}
                initial={{ opacity: 0, y: 60, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.69 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.12, y: -6 }}
                style={{
                  fontSize: "clamp(68px, 13vw, 148px)", fontWeight: 900,
                  lineHeight: 1, letterSpacing: "-0.03em", cursor: "default",
                  fontFamily: "'Playfair Display', serif", color: "#0f0f0f",
                }}
              >{char}</motion.span>
            ))}
          </div>

          {/* ── Subtitle Junior Full Stack Developer ── */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{
              fontSize: "clamp(13px, 1.6vw, 17px)",
              fontWeight: 500,
              letterSpacing: "0.28em",
              color: "#1a1a1a",
              marginBottom: 40,
              fontFamily: "'Cormorant Garamond', serif",
              textTransform: "uppercase",
              fontStyle: "italic",
            }}
          >
            Junior Web Developer
          </motion.p>

          {/* Garis tengah dekoratif */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 28, top: 0, position: "relative" }}
          >
            <div style={{ width: 55, height: 1, background: "linear-gradient(90deg, transparent, rgba(216,180,254,0.6))" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(135deg, #D8B4FE, #F6B6E8)" }} />
            <div style={{ width: 55, height: 1, background: "linear-gradient(270deg, transparent, rgba(216,180,254,0.6))" }} />
          </motion.div>

          {/* TOMBOL CONTACT ME */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", top: 25, position: "relative" }}
          >
            <Link href="mailto:gustiayudyakusumawardani@gmail.com">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 10px 36px rgba(168,85,247,0.38)" }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "linear-gradient(135deg, #c084fc, #f472b6)",
                  color: "#fff", border: "none",
                  borderRadius: 50, padding: "14px 40px",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  letterSpacing: "0.06em",
                  boxShadow: "0 4px 22px rgba(192,132,252,0.35)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                CONTACT ME
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdfbff; }
        @media (max-width: 640px) {
          section#home { padding: 90px 20px 80px !important; }
        }
      `}</style>
    </>
  );
}