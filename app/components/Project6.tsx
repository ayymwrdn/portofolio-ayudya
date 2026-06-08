"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──
const HP1          = "/images/HP1.png";
const GD_TEXT      = "/images/gd.png";
const KUPU         = "/images/kupu3.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] } },
};

// ✅ FIXED: Bunga Glitter - menggunakan useEffect untuk generate random
function FlowerGlitters() {
  const [flowers, setFlowers] = useState<any[]>([]);

  useEffect(() => {
    const flowerColors = ["#d584c8", "#e8a5e0", "#b988d9", "#f0c4eb", "#c96dd8"];
    const generatedFlowers = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 10,
      delay: Math.random() * 3.5,
      duration: Math.random() * 2.5 + 1.8,
      color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      repeatDelay: Math.random() * 2.5,
    }));
    setFlowers(generatedFlowers);
  }, []);

  // ✅ Jangan render apapun sampai flowers siap (client-side only)
  if (flowers.length === 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {flowers.map((f) => (
        <motion.svg
          key={f.id}
          viewBox="0 0 40 40"
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
          }}
          animate={{
            opacity: [0, 0.9, 0.4, 1, 0],
            scale: [0.4, 1.2, 0.8, 1.1, 0.4],
            rotate: [0, 30, -15, 20, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            repeatDelay: f.repeatDelay,
          }}
        >
          {/* 5 kelopak bunga - posisi sudah fixed (tidak random) */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 20 + 9 * Math.cos(rad);
            const cy = 20 + 9 * Math.sin(rad);
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={5.5}
                ry={3}
                transform={`rotate(${angle}, ${cx}, ${cy})`}
                fill={f.color}
                opacity={0.85}
              />
            );
          })}
          {/* pusat bunga */}
          <circle cx={20} cy={20} r={4} fill="#ffd6f5" opacity={0.95} />
        </motion.svg>
      ))}
    </div>
  );
}

// ── Kupu-kupu melayang ──
function FloatingButterfly() {
  return (
    <motion.img
      src={KUPU}
      alt="kupu-kupu"
      animate={{
        y: [0, -18, 0, -10, 0],
        x: [0, 8, -4, 6, 0],
        rotate: [-6, 4, -3, 5, -6],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: "23%",
        left: "3%",
        width: "clamp(80px, 12vw, 160px)",
        zIndex: 2,
        filter: "drop-shadow(0 4px 12px rgba(185,136,217,0.35))",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Main Export ──
export default function Project6() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "'Poppins', sans-serif",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FlowerGlitters />
        <FloatingButterfly />

        {/* ── Konten utama ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "60px 6%",
            gap: "4%",
          }}
        >
          {/* ── Kiri: teks GD + deskripsi ── */}
          <motion.div
            variants={childVariants}
            style={{
              flex: "0 0 38%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              alignItems: "flex-start",
            }}
          >
            {/* Logo tulisan "Graphic Desain" dari file gd.PNG */}
            <motion.img
              src={GD_TEXT}
              alt="Graphic Desain"
              whileHover={{ scale: 1.04 }}
              style={{
                width: "clamp(400px, 28vw, 360px)",
                filter: "drop-shadow(0 4px 18px rgba(185,136,217,0.3))",
                marginLeft: 65,
              }}
            />
          </motion.div>

          {/* ── Kanan: dua HP ── */}
          <motion.div
            variants={containerVariants}
            style={{
              flex: "0 0 56%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "clamp(12px, 3vw, 40px)",
              position: "relative",
              paddingBottom: 20,
            }}
          >
            {/* HP 2 — sedikit di belakang / miring kanan */}
            <motion.div
              variants={childVariants}
              whileHover={{ scale: 1.04, y: -10, rotate: -2 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              style={{
                position: "relative",
                zIndex: 1,
                marginBottom: -30,
                marginLeft: 60,
                transform: "rotate(6deg)",
                filter: "drop-shadow(0 16px 40px rgba(185,136,217,0.4))",
              }}
            >
              {/* Gambar HP 2 (kosong? tambahkan jika ada) */}
            </motion.div>

            {/* HP 1 — di depan / miring kiri */}
            <motion.div
              variants={childVariants}
              whileHover={{ scale: 1.06, y: -14, rotate: 2 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              style={{
                position: "relative",
                zIndex: 2,
                transform: "rotate(-5deg)",
                marginLeft: -60,
              }}
            >
              <img
                src={HP1}
                alt="HP 1"
                style={{
                  width: "clamp(640px, 22vw, 300px)",
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}