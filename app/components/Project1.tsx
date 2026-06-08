"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// ── data ───────────────────────────────────────────────
const project1 = ["/images/p1.png", "/images/p2.png", "/images/p3.png", "/images/p4.png"];
const project2 = ["/images/r1.png", "/images/r2.png", "/images/r3.png", "/images/r4.png", "/images/r5.png", "/images/r6.png"];

const FLOWER_UNG_PNG = "/images/ungu.png";
const FLOWER_BUNGA_PNG = "/images/lily.png";
const ARROW_LEFT_PNG = "/images/panahkiri.png";
const ARROW_RIGHT_PNG = "/images/panahkanan.png";
const BG_IMAGE_JPG = "/images/bgpr.jpg";

// ── Variasi Animasi Masuk Layout ──
const rowContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemCardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// ── Animated Arrow ──────────────────────────────
function AnimatedArrow({ side, images, setIdx }: { side: "left" | "right"; images: string[]; setIdx: React.Dispatch<React.SetStateAction<number>> }) {
  const [isPressed, setIsPressed] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setSparkle(true);
    setIdx((i) => (side === "left" ? (i - 1 + images.length) % images.length : (i + 1) % images.length));
    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => setSparkle(false), 700);
  };

  return (
    <motion.div
      onClick={handleClick}
      variants={{ rest: { scale: 1 }, pressed: { scale: 0.88, opacity: 0.9 } }}
      animate={isPressed ? "pressed" : "rest"}
      style={{ ...arrowStyle(side), cursor: "pointer", position: "absolute", zIndex: 10 }}
    >
      <img src={side === "left" ? ARROW_LEFT_PNG : ARROW_RIGHT_PNG} alt="arrow" style={{ width: "100%", height: "100%", objectFit: "contain", userSelect: "none" }} />
      <AnimatePresence>
        {sparkle && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", inset: "-20px", borderRadius: "50%", background: "radial-gradient(circle, rgba(216,180,254,0.6) 0%, transparent 80%)", pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Gallery ──────────────────────────────────
function Gallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <motion.div variants={itemCardVariants} style={{ position: "relative", flex: 1, overflow: "hidden", minHeight: 260, borderRadius: "4px" }}>
      <div style={{ display: "flex", height: "100%", transform: `translateX(-${idx * 100}%)`, transition: "transform 0.5s cubic-bezier(.77,0,.175,1)" }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt="project" style={{ flex: "0 0 100%", width: "100%", height: "100%", objectFit: "cover" }} />
        ))}
      </div>
      <AnimatedArrow side="left" images={images} setIdx={setIdx} />
      <AnimatedArrow side="right" images={images} setIdx={setIdx} />
    </motion.div>
  );
}

// ── Animated Flower ──
function AnimatedFlower({ left, right, top, bottom, imageSrc }: { left?: any; right?: any; top?: any; bottom?: any; imageSrc: string }) {
  const [isClicking, setIsClicking] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const handleClick = () => {
    if (isClicking) return;
    setIsClicking(true);
    setSparkle(true);
    setTimeout(() => setSparkle(false), 700);
    setTimeout(() => setIsClicking(false), 1000);
  };

  const clickUngu = {
    rotate: [0, -15, 12, -5, 2, 0],
    x: [0, -10, 8, -3, 0],
    transition: { duration: 1 }
  };

  const clickLily = {
    y: [0, 30, -25, 8, 0],
    scaleY: [1, 0.7, 1.2, 0.95, 1],
    transition: { duration: 0.9 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, scale: 0, rotate: -20 },
        visible: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.5 }
        }
      }}
      animate={isClicking ? (imageSrc === FLOWER_UNG_PNG ? clickUngu : clickLily) : {}}
      onClick={handleClick}
      style={{
        position: "absolute", left, right, top, bottom, zIndex: 20, cursor: "pointer",
        transformOrigin: imageSrc === FLOWER_BUNGA_PNG ? "bottom center" : "center center"
      }}
    >
      <img src={imageSrc} alt="flower" style={{ width: 150, height: 150, objectFit: "contain", userSelect: "none" }} />
      <AnimatePresence>
        {sparkle && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(216,180,254,0.8)", pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Text card ──────────────────────────────────────────
function TextCard({ title, body, bgColor = "#f3dcf9" }: { title: string; body: string; bgColor?: string }) {
  return (
    <motion.div
      variants={itemCardVariants}
      style={{ background: bgColor, padding: "36px 32px", flex: "0 0 360px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}
    >
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: "#2d1b3d", lineHeight: 1.15 }}>
        {title.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
      </h2>
      <p style={{ fontSize: 14, color: "#3d2050", lineHeight: 1.7 }}>{body}</p>
    </motion.div>
  );
}

// ── Main export ────────────────────────────────────────
export default function Project() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@300;400&display=swap');`}</style>
      <section style={{ position: "relative", width: "100%", minHeight: "100vh", backgroundImage: `url(${BG_IMAGE_JPG})`, backgroundSize: "cover", backgroundPosition: "center", fontFamily: "'Lato', sans-serif", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 60, padding: "80px 5%", minHeight: "100vh" }}>

          {/* Row 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={rowContainerVariants} style={{ position: "relative", display: "flex", gap: 28, alignItems: "stretch", flexWrap: "wrap" }}>
            <AnimatedFlower left="-55px" top="-60px" imageSrc={FLOWER_UNG_PNG} />
            <TextCard title={"Manual\npainting"} body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
            <Gallery images={project1} />
          </motion.div>

          {/* Row 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={rowContainerVariants} style={{ position: "relative", display: "flex", gap: 28, alignItems: "stretch", flexWrap: "wrap" }}>
            <AnimatedFlower right="-37px" top="-45px" imageSrc={FLOWER_BUNGA_PNG} />
            <Gallery images={project2} />
            <TextCard title={"Digital\nart"} body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." bgColor="#f3cad8" />
          </motion.div>

        </div>
      </section>
    </>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return { top: "50%", [side]: 16, transform: "translateY(-50%)", width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" };
}