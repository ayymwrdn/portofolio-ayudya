"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ── data ──
const PHOTOS = ["/images/d1.png", "/images/d2.png", "/images/d3.png"];
const GD_IMAGE = "/images/gdd.png";
const BG_IMAGE = "/images/desain.png";
const FIGMA_LINK = "https://www.figma.com/design/NuYTC0AqFPMuRaOY3cLHLU/Tugas?node-id=8-61&t=WvlCxtYkozulQxMz-1";

// ── Animation Variants (FIXED) ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Glitter Stars Component
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

// ── Photo Frame Component ──
function PhotoFrame({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      variants={childVariants}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{
        flex: "1 1 0",
        borderRadius: 12,
        padding: 5,
        background: "linear-gradient(135deg, #b988d9 0%, #d5a3db 50%, #b988d9 100%)",
        boxShadow: "0 8px 32px rgba(185,136,217,0.35)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          borderRadius: 8,
          overflow: "hidden",
          background: "#fff",
          lineHeight: 0,
        }}
      >
        <img
          src={src}
          alt={`design ${index + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={() => console.log(`Image not found: ${src}`)}
        />
      </div>
    </motion.div>
  );
}

// ── Main Export ──
export default function Project4() {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = BG_IMAGE;
    img.onload = () => setBgLoaded(true);
  }, []);

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
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          fontFamily: "'Poppins', sans-serif",
          overflow: "hidden",
        }}
      >
        <GlitterStars />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 60,
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "40px",
            paddingBottom: "80px",
            minHeight: "100vh",
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ display: "flex", gap: 20, alignItems: "stretch" }}
          >
            {PHOTOS.map((src, i) => (
              <PhotoFrame key={i} src={src} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: "flex",
              gap: 40,
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <motion.div
              variants={childVariants}
              style={{ flex: "0 0 45%", maxWidth: "45%" }}
            >
              <img
                src={GD_IMAGE}
                alt="graphic design"
                style={{
                  width: "68%",
                  height: "auto",
                  display: "block",
                }}
              />
            </motion.div>

            <motion.div
              variants={childVariants}
              style={{
                flex: "1 1 0",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: -120,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  color: "#2d1b3d",
                  lineHeight: 1.8,
                  textAlign: "justify",
                  margin: 0,
                }}
              >
                A fashion website design created using Figma, consisting of a Homepage, Login, 
                and Sign In page. It is crafted with a modern and user-friendly concept to 
                showcase products attractively while providing an easy navigation experience for users.
              </p>

              <motion.a
                href={FIGMA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-block",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#b988d9",
                  textDecoration: "none",
                  borderBottom: "2px solid #b988d9",
                  paddingBottom: 2,
                  width: "fit-content",
                  cursor: "pointer",
                }}
              >
                View this design on Figma →
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}