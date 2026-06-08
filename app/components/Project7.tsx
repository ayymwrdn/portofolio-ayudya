"use client";

import { motion } from "framer-motion";

// ── Data Baris Foto ──
const rows = [
  { id: "A", images: ["z1.png", "z2.png", "z3.png", "z4.png", "z5.png"] },
  { id: "B", images: ["y1.png", "y2.png", "y3.png", "y4.png", "y5.png"] },
  { id: "C", images: ["x1.png", "x2.png", "x3.png", "x4.png", "x5.png"] },
  { id: "D", images: ["w1.png", "w2.png", "w3.png", "w4.png", "w5.png"] },
  { id: "E", images: ["s1.png", "s2.png"] },
];

// ── Animation Variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ── Komponen satu baris foto ──
function PhotoRow({ rowId, images }: { rowId: string; images: string[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        width: "100%",
      }}
    >
      {images.map((img, idx) => {
        const label = `${rowId}${idx + 1}`;
        return (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(185,136,217,0.15)",
              aspectRatio: "3 / 4",
              background: "#f3e8ff",
            }}
          >
            <img
              src={`/images/${img}`}
              alt={label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ── Tools Text di tengah ──
function ToolsText() {
  return (
    <motion.div
      variants={itemVariants}
      style={{
        width: "100%",
        padding: "48px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        textAlign: "center",
      }}
    >
      <div style={{ width: "60px", height: "3px", borderRadius: "99px", background: "linear-gradient(90deg, #b988d9, #f0c4eb)", marginBottom: "8px" }} />

      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 700, color: "#7c3aed", margin: 0, letterSpacing: "0.04em" }}>
        Tools yang Digunakan
      </h3>

      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 400, color: "#555", maxWidth: "600px", lineHeight: 1.8, margin: 0 }}>
        Project ini dibuat menggunakan berbagai tools desain seperti{" "}
        <strong style={{ color: "#b988d9" }}>Canva</strong>,{" "}
        <strong style={{ color: "#b988d9" }}>Adobe Photoshop</strong>,{" "}
        <strong style={{ color: "#b988d9" }}>Adobe Illustrator</strong>, serta{" "}
        <strong style={{ color: "#b988d9" }}>Figma</strong> untuk menghasilkan karya visual yang estetik, rapi, dan profesional.
      </p>

      <div style={{ width: "60px", height: "3px", borderRadius: "99px", background: "linear-gradient(90deg, #f0c4eb, #b988d9)", marginTop: "8px" }} />
    </motion.div>
  );
}

// ── Main Export ──
export default function ProjectGallery() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          fontFamily: "'Poppins', sans-serif",
          padding: "60px 5%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Tools di atas */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-60px" }} 
          style={{ width: "100%", marginBottom: "30px" }}
        >
          <ToolsText />
        </motion.div>

        {/* Galeri di bawah */}
        {rows.map((row) => (
          <PhotoRow key={row.id} rowId={row.id} images={row.images} />
        ))}
      </section>
    </>
  );
}