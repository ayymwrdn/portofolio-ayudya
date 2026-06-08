"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── data ──
const STATIC_PHOTOS = [
  "/images/a1.png",
  "/images/a2.png",
  "/images/a3.png",
  "/images/a4.png",
  "/images/a5.png",
];
const SLIDER_PHOTOS = [
  "/images/a6.png",
  "/images/a7.png",
  "/images/a8.png",
];
const BG_IMAGE = "/images/desain2.jpg";
const FIGMA_LINK = "https://www.figma.com/design/K67s6SRs5WZ6dyIIoqNgy6/UAS?node-id=0-1&t=AoCXtCNVjtzqkjX4-1";
const ARROW_LEFT = "/images/panahkiri.png";
const ARROW_RIGHT = "/images/panahkanan.png";

// ── Animations ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

// ✅ FIXED: Glitter Stars (Fixed Hydration)
function GlitterStars() {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 8,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1.5,
      color: Math.random() > 0.5 ? "#b988d9" : "#d5a3db",
    }));
    setStars(generatedStars);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map((star) => (
        <motion.svg
          key={star.id}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0.4, 1, 0],
            scale: [0.5, 1.2, 0.8, 1.3, 0.5],
            rotate: [0, 20, -10, 15, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        >
          <polygon
            points="12,2 13.8,8.5 20.5,8.5 15.3,12.5 17.1,19 12,15 6.9,19 8.7,12.5 3.5,8.5 10.2,8.5"
            fill={star.color}
            opacity={0.85}
          />
        </motion.svg>
      ))}
    </div>
  );
}

// ── Standard Photo Frame ──
function PhotoFrame({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      variants={childVariants}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{
        flex: "1 1 0",
        borderRadius: 16,
        padding: 5,
        background: "linear-gradient(135deg, #b988d9 0%, #d5a3db 50%, #b988d9 100%)",
        boxShadow: "0 8px 32px rgba(185,136,217,0.35)",
      }}
    >
      <div style={{ borderRadius: 12, overflow: "hidden", lineHeight: 0 }}>
        <img
          src={src}
          alt={`Bakery design snapshot ${index + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </motion.div>
  );
}

// ── Slider Frame ──
function SliderFrame() {
  const [idx, setIdx] = useState(0);
  const [pressLeft, setPressLeft] = useState(false);
  const [pressRight, setPressRight] = useState(false);

  const prev = () => {
    setPressLeft(true);
    setTimeout(() => setPressLeft(false), 200);
    setIdx((i) => (i - 1 + SLIDER_PHOTOS.length) % SLIDER_PHOTOS.length);
  };

  const next = () => {
    setPressRight(true);
    setTimeout(() => setPressRight(false), 200);
    setIdx((i) => (i + 1) % SLIDER_PHOTOS.length);
  };

  return (
    <motion.div
      variants={childVariants}
      style={{
        flex: "1 1 0",
        borderRadius: 16,
        padding: 5,
        background: "linear-gradient(135deg, #b988d9 0%, #d5a3db 50%, #b988d9 100%)",
        boxShadow: "0 8px 32px rgba(185,136,217,0.35)",
        position: "relative",
      }}
    >
      <div style={{ borderRadius: 12, overflow: "hidden", lineHeight: 0, position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={SLIDER_PHOTOS[idx]}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </AnimatePresence>

        <motion.button
          onClick={prev}
          animate={pressLeft ? { scale: 0.8 } : { scale: 1 }}
          whileHover={{ scale: 1.15 }}
          style={{ position: "absolute", left: 8, bottom: 8, background: "transparent", border: "none", cursor: "pointer", zIndex: 10, width: 36, height: 36 }}
        >
          <img src={ARROW_LEFT} alt="Previous slide" style={{ width: "100%", height: "100%" }} />
        </motion.button>

        <motion.button
          onClick={next}
          animate={pressRight ? { scale: 0.8 } : { scale: 1 }}
          whileHover={{ scale: 1.15 }}
          style={{ position: "absolute", right: 8, bottom: 8, background: "transparent", border: "none", cursor: "pointer", zIndex: 10, width: 36, height: 36 }}
        >
          <img src={ARROW_RIGHT} alt="Next slide" style={{ width: "100%", height: "100%" }} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Project5() {
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "'Poppins', sans-serif",
          overflow: "hidden",
        }}
      >
        <GlitterStars />

        <div style={{ position: "relative", zIndex: 1, padding: "40px 5%", display: "flex", flexDirection: "column", gap: 20 }}>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "flex", gap: 20 }}>
            {STATIC_PHOTOS.slice(0, 3).map((src, i) => <PhotoFrame key={i} src={src} index={i} />)}
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "flex", gap: 20 }}>
            {STATIC_PHOTOS.slice(3, 5).map((src, i) => <PhotoFrame key={i + 3} src={src} index={i + 3} />)}
            <SliderFrame />
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <motion.p variants={childVariants} style={{ fontSize: 15, color: "#2d1b3d", textAlign: "justify", lineHeight: "1.6" }}>
              A bakery and pastry website design crafted in Figma, featuring a Homepage, About Us, Location, Menu, Review, Order Form, Receipt, and Contact Page. It is thoughtfully structured around a warm, modern, and user-friendly concept to showcase product details, online ordering features, and the brand's unique identity in an engaging, highly accessible layout.
            </motion.p>
            <motion.a variants={childVariants} href={FIGMA_LINK} target="_blank" style={{ fontWeight: 700, color: "#b988d9", textDecoration: "none", borderBottom: "2px solid #b988d9", width: "fit-content" }}>
              View this design on Figma →
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}