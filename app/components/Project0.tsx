"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── PATH GAMBAR ──────────────────────────────────────────────────────────
const BG_PRO_JPG = "/images/bgpr.jpg";
const FILE_PNG = "/images/file.png";
const BURUNG_PNG = "/images/burung.png";
const DEKOR_PNG = "/images/dekor.png";
const KELINCI_PNG = "/images/kelinci.png";
const TELUNJUK_PNG = "/images/telunjuk.png";
const KELINCI_L_PNG = "/images/kelinciL.png";

// ── DATA GLITTER UNTUK BACKGROUND (Jumlahnya ditingkatkan) ──────────────────────────────────────────
const BACKGROUND_GLITTERS = [
  // Original particles
  { id: 1, top: "15%", left: "10%", size: 14, delay: 0 },
  { id: 2, top: "25%", left: "45%", size: 18, delay: 0.3 },
  { id: 3, top: "12%", left: "80%", size: 12, delay: 0.6 },
  { id: 4, top: "70%", left: "85%", size: 16, delay: 0.2 },
  { id: 5, top: "80%", left: "40%", size: 15, delay: 0.5 },
  { id: 6, top: "45%", left: "8%", size: 11, delay: 0.8 },
  // New particles for more density
  { id: 7, top: "5%", left: "20%", size: 10, delay: 0.1 },
  { id: 8, top: "18%", left: "60%", size: 20, delay: 0.4 },
  { id: 9, top: "28%", left: "95%", size: 13, delay: 0.7 },
  { id: 10, top: "35%", left: "30%", size: 17, delay: 0.2 },
  { id: 11, top: "50%", left: "75%", size: 19, delay: 0.5 },
  { id: 12, top: "60%", left: "5%", size: 12, delay: 0.8 },
  { id: 13, top: "75%", left: "15%", size: 15, delay: 0.3 },
  { id: 14, top: "85%", left: "55%", size: 21, delay: 0.6 },
  { id: 15, top: "90%", left: "80%", size: 14, delay: 0.1 },
  { id: 16, top: "10%", left: "5%", size: 18, delay: 0.9 },
  { id: 17, top: "22%", left: "35%", size: 11, delay: 0.2 },
  { id: 18, top: "33%", left: "65%", size: 16, delay: 0.5 },
  { id: 19, top: "40%", left: "90%", size: 19, delay: 0.8 },
  { id: 20, top: "55%", left: "25%", size: 13, delay: 0.3 },
  { id: 21, top: "65%", left: "50%", size: 17, delay: 0.6 },
  { id: 22, top: "72%", left: "78%", size: 10, delay: 0.1 },
  { id: 23, top: "82%", left: "12%", size: 22, delay: 0.4 },
  { id: 24, top: "95%", left: "42%", size: 14, delay: 0.7 },
  { id: 25, top: "2%", left: "70%", size: 11, delay: 0.8 },
  { id: 26, top: "14%", left: "98%", size: 20, delay: 0.3 },
  { id: 27, top: "26%", left: "18%", size: 15, delay: 0.6 },
  { id: 28, top: "38%", left: "48%", size: 12, delay: 0.1 },
  { id: 29, top: "48%", left: "83%", size: 18, delay: 0.4 },
  { id: 30, top: "58%", left: "63%", size: 10, delay: 0.7 },
  { id: 31, top: "68%", left: "93%", size: 19, delay: 0.2 },
  { id: 32, top: "78%", left: "38%", size: 13, delay: 0.5 },
  { id: 33, top: "88%", left: "68%", size: 17, delay: 0.8 },
  { id: 34, top: "3%", left: "92%", size: 14, delay: 0.1 },
  { id: 35, top: "16%", left: "58%", size: 11, delay: 0.9 },
  { id: 36, top: "29%", left: "22%", size: 21, delay: 0.2 },
  { id: 37, top: "37%", left: "88%", size: 10, delay: 0.5 },
  { id: 38, top: "47%", left: "12%", size: 19, delay: 0.8 },
  { id: 39, top: "57%", left: "47%", size: 13, delay: 0.3 },
  { id: 40, top: "67%", left: "72%", size: 18, delay: 0.6 },
  { id: 41, top: "77%", left: "97%", size: 15, delay: 0.1 },
  { id: 42, top: "87%", left: "17%", size: 10, delay: 0.4 },
  { id: 43, top: "97%", left: "33%", size: 20, delay: 0.7 },
  { id: 44, top: "6%", left: "67%", size: 12, delay: 0.8 },
  { id: 45, top: "19%", left: "19%", size: 17, delay: 0.3 },
];

export default function Project0() {
  const [isJumping, setIsJumping] = useState(false);

  const handleKelinciClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    
    // Total durasi rangkaian lompat maju-mundur diperpanjang ke 5.6 detik
    setTimeout(() => {
      setIsJumping(false);
    }, 5600);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0.8, delay, ease: "easeOut" }
    })
  };

  // ── ANIMASI KELINCI LOMPAT SEBERANG + BALIK BADAN ─────────────────────────
  const jumpKeyframes = {
    // Jarak lompatan diperjauh sampai 750px (ujung layar kanan)
    x: [
      0, 
      180, 370, 560, 750,   // Maju 4 kali lompat besar
      750,                  // Diam sejenak pas balik badan
      560, 370, 180, 0      // Lompat balik ke posisi semula
    ],
    // Efek parabolik ke atas (Y minus) tiap hentakan lompatan
    y: [
      0,
      -50, 0, -50, 0, -50, 0, -50, 0, 
      0,
      -50, 0, -50, 0, -50, 0, -50, 0
    ],
    // scaleX: 1 artinya hadap kanan asli, scaleX: -1 di-flip horizontal (hadap kiri)
    scaleX: [
      1, 
      1, 1, 1, 1,           // Hadap kanan saat maju
      -1,                   // PIVOT: Balik badan di ujung kanan!
      -1, -1, -1, -1        // Tetap hadap kiri saat jalan pulang
    ],
    rotate: [
      0,
      12, 0, 12, 0, 12, 0, 12, 0,
      0,
      -12, 0, -12, 0, -12, 0, -12, 0
    ],
    transition: {
      duration: 5.6,
      ease: "easeInOut",
      // Pengaturan timing distribusi keyframes agar transisi flip pas di tengah
      times: [
        0, 0.06, 0.12, 0.18, 0.24, 0.30, 
        0.50, // Detik pertengahan untuk transisi balik badan
        0.56, 0.62, 0.68, 0.74, 0.80, 0.86, 0.92, 1
      ]
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      <section id="project"
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(${BG_PRO_JPG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── BACKGROUND GLITTER ANIMATION (Kedap-kedip tipis) ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          {BACKGROUND_GLITTERS.map((glitter) => (
            <motion.span
              key={glitter.id}
              animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: glitter.delay,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute",
                top: glitter.top,
                left: glitter.left,
                fontSize: glitter.size,
                color: "#fbcfe8",
                textShadow: "0 0 8px rgba(244,114,182,0.8)",
                userSelect: "none"
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>

        {/* CONTAINER CANVAS UTAMA */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            height: "100vh",
            maxHeight: "675px",
          }}
        >
          
          {/* 1. ELEMEN DEKORASI BUNGA */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            style={{ position: "absolute", top: "-50px", right: "-70px", zIndex: 5 }}
          >
            <img src={DEKOR_PNG} alt="Flower Decor" style={{ width: "240px", objectFit: "contain" }} />
          </motion.div>

          {/* 2. ELEMEN FOLDER FILE */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              width: "54%",
              maxWidth: "750px",
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <img src={FILE_PNG} alt="Main Folder File" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </motion.div>

          {/* 3. ELEMEN BURUNG */}
          <motion.div
            initial={{ opacity: 0, y: -200, x: -100, scale: 1.2 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 45, damping: 12, delay: 0.8 }}
            style={{ position: "absolute", top: "1.5%", left: "19.5%", zIndex: 4 }}
          >
            <img src={BURUNG_PNG} alt="Flying Bird" style={{ width: "170px", height: "auto" }} />
          </motion.div>

          {/* 4. AREA KELINCI INTERAKTIF */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50px",
              zIndex: 10,
              width: "160px",
              height: "180px",
            }}
          >
            <AnimatePresence mode="wait">
              {!isJumping ? (
                // MODE DIAM (Kelinci Biasa + Telunjuk Blink)
                <motion.div
                  key="kelinci-diam"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  variants={fadeInVariants}
                  custom={0.6}
                  onClick={handleKelinciClick}
                  style={{ position: "relative", width: "100%", height: "100%", cursor: "pointer" }}
                >
                  <img src={KELINCI_PNG} alt="Rabbit Idle" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  
                  <motion.div
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    style={{ position: "absolute", top: "35%", right: "5px", width: "45px" }}
                  >
                    <img src={TELUNJUK_PNG} alt="Click Here Pointer" style={{ width: "100%", height: "auto" }} />
                  </motion.div>
                </motion.div>
              ) : (
                // MODE LOMPAT (KelinciL + Balik Badan Otomatis)
                <motion.div
                  key="kelinci-lompat"
                  animate={jumpKeyframes}
                  style={{ position: "absolute", width: "100%", height: "100%" }}
                >
                  <img src={KELINCI_L_PNG} alt="Rabbit Jumping" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
}