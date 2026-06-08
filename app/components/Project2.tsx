"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── types ──────────────────────────────────────────────
interface GlitterParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  tx: number;
  ty: number;
  delay: number;
}

// ── data ───────────────────────────────────────────────
const project1 = ["/images/o2.png", "/images/o1.png", "/images/o3.png", "/images/o4.png", "/images/o5.png", "/images/o6.png", "/images/o7.png", "/images/o8.png"];
const project2 = ["/images/t1.png", "/images/t2.png", "/images/t3.png", "/images/t4.png", "/images/t5.png", "/images/t6.png", "/images/t7.png", "/images/t8.png", "/images/t9.png", "/images/t10.png", "/images/t11.png", "/images/t12.png",  "/images/t13.png", "/images/t14.png", "/images/t15.png"];

// Path gambar bunga & kupu-kupu kustom kamu
const FLOWER_UNG_PNG = "/images/10.png";
const FLOWER_BUNGA_PNG = "/images/9.png";

// Path gambar panah
const ARROW_LEFT_PNG = "/images/panahkiri.png";
const ARROW_RIGHT_PNG = "/images/panahkanan.png";

// Path gambar background
const BG_IMAGE_JPG = "/images/bgpr.jpg";

// ── Variasi Animasi Masuk Halaman (Framer Motion) ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Efek muncul bergantian antar komponen dalam satu baris
    },
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


// ── Animated Arrow Component ──────────────────────────────
function AnimatedArrow({
  side,
  images,
  setIdx
}: {
  side: "left" | "right";
  images: string[];
  setIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setSparkle(true);
    
    setIdx((i) =>
      side === "left"
        ? (i - 1 + images.length) % images.length
        : (i + 1) % images.length
    );

    setTimeout(() => setIsPressed(false), 150);
    setTimeout(() => setSparkle(false), 700);
  };

  const arrowVariants = {
    rest: { scale: 1 },
    pressed: { scale: 0.9, opacity: 0.8 },
  };

  const imageSrc = side === "left" ? ARROW_LEFT_PNG : ARROW_RIGHT_PNG;

  return (
    <motion.div
      onClick={handleClick}
      variants={arrowVariants}
      animate={isPressed ? "pressed" : "rest"}
      transition={{ duration: 0.1 }}
      style={{
        ...arrowStyle(side),
        cursor: "pointer",
        position: "absolute",
        zIndex: 10,
        overflow: "visible", 
      }}
    >
      <img
        src={imageSrc}
        alt={`panah ${side}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          userSelect: "none",
        }}
      />
      
      <AnimatePresence>
        {sparkle && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: "-15px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(216,180,254,0.6) 0%, rgba(246,182,232,0.6) 40%, rgba(255,255,255,0) 80%)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Gallery component ──────────────────────────────────
function Gallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  return (
    <motion.div 
      variants={childVariants}
      style={{ position: "relative", flex: 1, overflow: "hidden", minHeight: 260, borderRadius: "4px" }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          transform: `translateX(-${idx * 100}%)`,
          transition: "transform 0.5s cubic-bezier(.77,0,.175,1)",
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`photo ${i + 1}`}
            style={{ flex: "0 0 100%", width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => console.log(`Gambar tidak ditemukan: ${src}`)}
          />
        ))}
      </div>

      <AnimatedArrow side="left" images={images} setIdx={setIdx} />
      <AnimatedArrow side="right" images={images} setIdx={setIdx} />

      {/* dots */}
      <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 10 }}>
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: idx === i ? "#2d1b3d" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Animated flower ──
function AnimatedFlower({
  left,
  right,
  top,
  bottom,
  imageSrc = FLOWER_UNG_PNG
}: {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
  imageSrc?: string;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const handleClick = () => {
    if (isAnimating) return; 
    
    setIsAnimating(true);
    setSparkle(true);
    
    setTimeout(() => setSparkle(false), 700);
    
    const duration = imageSrc === FLOWER_BUNGA_PNG ? 1200 : 500;
    setTimeout(() => setIsAnimating(false), duration);
  };

  // Varian Animasi Goyang untuk 10.png
  const shakeVariants = {
    rest: { x: 0, rotate: 0 },
    animate: {
      x: [0, -10, 10, -8, 8, -5, 5, 0],
      rotate: [0, -7, 7, -5, 5, -3, 3, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  // Varian Animasi Terbang untuk 9.png
  const flyVariants = {
    rest: { x: 0, y: 0, scale: 1, rotate: 0 },
    animate: {
      x: [0, -30, -80, -40, 20, 0],
      y: [0, -50, -120, -160, -60, 0],
      scale: [1, 1.1, 0.8, 0.6, 0.9, 1],
      rotate: [0, -15, -30, 15, 10, 0],
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  const currentVariants = imageSrc === FLOWER_BUNGA_PNG ? flyVariants : shakeVariants;

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: isAnimating ? 1 : 1.05 }}
      variants={{
        hidden: { opacity: 0, scale: 0.3, rotate: -25 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          rotate: 0,
          transition: { type: "spring", stiffness: 80, damping: 12, delay: 0.4 } 
        },
        ...currentVariants
      }}
      animate={isAnimating ? "animate" : undefined}
      style={{
        position: "absolute",
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        zIndex: 20, 
        cursor: "pointer",
      }}
    >
      <img
        src={imageSrc}
        alt="Element"
        style={{
          width: 150,     
          height: 150,    
          objectFit: "contain",
        }}
        onError={(e) => console.log(`File tidak ditemukan: ${imageSrc}`)}
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

// ── Text card ──────────────────────────────────────────
function TextCard({ title, body, bgColor = "#f3dcf9" }: { title: string; body: string; bgColor?: string }) {
  return (
    <motion.div
      variants={childVariants}
      style={{
        background: bgColor,
        borderRadius: 0,
        padding: "36px 32px",
        flex: "0 0 360px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32,
          fontWeight: 900,
          color: "#2d1b3d",
          lineHeight: 1.15,
        }}
      >
        {title.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i !== arr.length - 1 && <br />}
          </span>
        ))}
      </h2>
      <p style={{ fontSize: 14, color: "#3d2050", lineHeight: 1.7 }}>{body}</p>
    </motion.div>
  );
}

// ── Main export ────────────────────────────────────────
export default function Project() {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = BG_IMAGE_JPG;
    img.onload = () => setBgLoaded(true);
    img.onerror = () => console.error("Background gagal dimuat");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@300;400&display=swap');
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${BG_IMAGE_JPG})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          fontFamily: "'Lato', sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 60, 
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "20px",
            paddingBottom: "80px",
            minHeight: "100vh",
          }}
        >
          {/* Row 1: Manual Painting */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            style={{ position: "relative", display: "flex", gap: 28, alignItems: "stretch", flexWrap: "wrap" }}
          >
            <AnimatedFlower 
              left="-55px" 
              top="-60px" 
              imageSrc={FLOWER_UNG_PNG}
            />

            <TextCard
              title={"Manual\npainting"}
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            />
            <Gallery images={project1} />
          </motion.div>

          {/* Row 2: Digital Art */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            style={{ position: "relative", display: "flex", gap: 28, alignItems: "stretch", flexWrap: "wrap" }}
          >
            <AnimatedFlower 
              right="-37px" 
              top="-45px" 
              imageSrc={FLOWER_BUNGA_PNG}
            />

            <Gallery images={project2} />
            <TextCard
              title={"Digital\nart"}
              body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"
              bgColor="#f3cad8"
            />
          </motion.div>
        </div>
      </section>

      {!bgLoaded && (
        <div style={{ position: "fixed", bottom: 10, right: 10, background: "red", color: "white", padding: "5px 10px", fontSize: 12, zIndex: 9999, borderRadius: 5 }}>
          Background not loaded! Check {BG_IMAGE_JPG}
        </div>
      )}
    </>
  );
}

// ── helpers ────────────────────────────────────────────
function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 16,
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "transparent",
    border: "none",
    padding: 0,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "none",
    boxShadow: "none",
  };
}