"use client";

import { motion } from "framer-motion";

// Data posisi acak untuk bintang glitter latar belakang
const glitterStars = [
  { top: "8%", left: "12%", size: "12px", delay: 0 },
  { top: "15%", left: "85%", size: "16px", delay: 0.4 },
  { top: "25%", left: "45%", size: "14px", delay: 0.2 },
  { top: "38%", left: "92%", size: "12px", delay: 0.7 },
  { top: "50%", left: "5%", size: "18px", delay: 0.1 },
  { top: "62%", left: "38%", size: "10px", delay: 0.5 },
  { top: "72%", left: "88%", size: "15px", delay: 0.3 },
  { top: "82%", left: "15%", size: "12px", delay: 0.6 },
  { top: "92%", left: "50%", size: "16px", delay: 0.2 },
];

export default function Galeri() {
  return (
    <>
      <style>
        {`
          @media (max-width: 1024px) {
            .section-padding {
              padding: 60px 4% !important;
            }
            .grid-2cols {
              gap: 12px !important;
            }
            .grid-3cols {
              gap: 12px !important;
            }
            .gap-48 {
              gap: 40px !important;
            }
            .margin-bottom-120 {
              margin-bottom: 80px !important;
            }
            .padding-top-130 {
              padding-top: 80px !important;
            }
            /* ag.png mengecil di tablet */
            .activity-header {
              max-width: 450px !important;
              margin-top: -40px !important;
            }
          }
          
          @media (max-width: 768px) {
            .section-padding {
              padding: 40px 16px !important;
            }
            .gap-48 {
              gap: 32px !important;
            }
            .margin-bottom-120 {
              margin-bottom: 60px !important;
            }
            .flex-col-mobile {
              flex-direction: column !important;
            }
            .grid-4cols {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 12px !important;
            }
            .padding-top-130 {
              padding-top: 0 !important;
            }
            .text-center-mobile {
              text-align: center !important;
            }
            .order-second-mobile {
              order: 1 !important;
            }
            /* ag.png mengecil lebih kecil di mobile */
            .activity-header {
              max-width: 280px !important;
              margin-top: -20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .grid-4cols {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 8px !important;
            }
            .margin-bottom-120 {
              margin-bottom: 40px !important;
            }
            .event-title {
              font-size: 18px !important;
            }
            /* ag.png lebih kecil lagi di hp kecil */
            .activity-header {
              max-width: 220px !important;
              margin-top: 0px !important;
            }
          }
        `}
      </style>

      <section
        className="section-padding"
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f6f2fa",
          fontFamily: "'Poppins', sans-serif",
          padding: "80px 5%",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* --- ANIMASI BINTANG GLITTER BERBENTUK BINTANG 4 SUDUT --- */}
        {glitterStars.map((star, index) => (
          <motion.div
            key={index}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.7, 1.3, 0.7],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: "#a471cc", 
              clipPath: "polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)",
              pointerEvents: "none",
              zIndex: 1,
              filter: "drop-shadow(0px 0px 4px rgba(164, 113, 204, 0.6))",
            }}
          />
        ))}

        {/* Konten Utama */}
        <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* --- BAGIAN 1: ACTIVITY GALLERY HEADER --- */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "10px", width: "100%" }}
          >
            <img 
              src="/images/ag.png" 
              alt="Activity Gallery" 
              className="activity-header"
              style={{ maxWidth: "550px", width: "100%", height: "auto", objectFit: "contain", marginTop: "-80px" }} 
            />
          </motion.div>

          {/* --- SECTION 1: PELATIHAN & WORKSHOP UI/UX --- */}
          <div className="gap-48 margin-bottom-120" style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "start", marginBottom: "120px" }}>
            
            {/* Wadah Kolase Foto Kiri */}
            <div style={{ flex: "1 1 650px", display: "flex", flexDirection: "column", gap: "16px", order: 1 }}>
              {/* Baris Atas: g1 & g2 */}
              <div className="grid-2cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <motion.div 
                  whileHover={{ scale: 1.04 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "16/10", cursor: "pointer" }}
                >
                  <img src="/images/g1.jpeg" alt="UI/UX 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.04 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "16/10", cursor: "pointer" }}
                >
                  <img src="/images/g2.jpeg" alt="UI/UX 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
              </div>

              {/* Baris Bawah: g3, g4, g5 */}
              <div className="grid-3cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {["g3.jpeg", "g4.jpeg", "g5.jpeg"].map((img, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.04 }} 
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" }}
                  >
                    <img src={`/images/${img}`} alt={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Wadah Teks Deskripsi Kanan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="padding-top-130"
              style={{ flex: "1 1 300px", paddingTop: "130px", order: 2 }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#a471cc", marginBottom: "4px", lineHeight: "1.4", letterSpacing: "0.5px" }}>
                PELATIHAN & WORKSHOP<br />UI/UX DESIGN – IMPACT SI
              </h3>
              <div style={{ width: "100%", height: "2px", background: "#e2d5f3", marginBottom: "20px" }} />
              <p style={{ fontSize: "13px", color: "#555555", lineHeight: "1.85", textAlign: "justify" }}>
                Kumpulan dokumentasi kegiatan selama mengikuti pelatihan UI/UX Design ImpactSI Season 1. 
                Pengalaman ini memperkuat pemahaman saya mengenai user research, wireframing, prototyping, 
                dan desain antarmuka yang berfokus pada kebutuhan pengguna.
              </p>
            </motion.div>
          </div>

          {/* --- SECTION 2: DUTA PANCASILA PASKIBRAKA --- */}
          {/* MEMPERTAHANKAN FORMAT GRID ORIGINAL, TIDAK BERUBAH JADI FLEX COLUMN */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "start", marginBottom: "120px" }}>
            
            {/* Wadah Teks Deskripsi Kiri */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ flex: "1 1 300px", paddingTop: "10px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#a471cc", marginBottom: "4px", lineHeight: "1.4", letterSpacing: "0.5px" }}>
                DUTA PANCASILA<br />PASKIBRAKA INDONESIA
              </h3>
              <div style={{ width: "100%", height: "2px", background: "#e2d5f3", marginBottom: "20px" }} />
              <p style={{ fontSize: "13px", color: "#555555", lineHeight: "1.85", textAlign: "justify" }}>
                Galeri ini berisi dokumentasi kegiatan selama berkontribusi dalam kegiatan kepanitiaan Duta Pancasila Paskibraka Indonesia, 
                mulai dari proses seleksi calon Paskibraka, pelatihan menjelang peringatan Hari Kemerdekaan, sosialisasi wawasan 
                kebangsaan, hingga pembekalan calon Paskibraka tingkat provinsi dan nasional. Melalui berbagai kegiatan tersebut, 
                saya turut berperan dalam menanamkan nilai-nilai Pancasila serta mendampingi generasi muda dalam membangun karakter 
                kepemimpinan, kedisiplinan, dan rasa cinta tanah air. Pengalaman ini memperkaya kemampuan saya dalam berkomunikasi, 
                berkolaborasi, serta beradaptasi dalam berbagai situasi dan lingkungan.
              </p>
            </motion.div>

            {/* Wadah Kolase Foto Kanan - TETAP MENGGUNAKAN GRID, TIDAK BERUBAH */}
            <div 
              style={{ 
                flex: "1 1 650px", 
                display: "grid", 
                gridTemplateColumns: "repeat(3, 1fr) 1.6fr", 
                gridTemplateRows: "auto auto",
                gap: "16px",
              }}
            >
              {/* l1 */}
              <motion.div 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ gridColumn: "span 3", borderRadius: "24px", overflow: "hidden", aspectRatio: "16/10", cursor: "pointer" }}
              >
                <img src="/images/l1.jpg" alt="Paskibraka Pengukuhan" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>

              {/* l2 */}
              <motion.div 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ gridColumn: "4", gridRow: "span 2", borderRadius: "24px", overflow: "hidden", cursor: "pointer" }}
              >
                <img src="/images/l2.jpg" alt="Paskibraka Aula" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>

              {/* l3 */}
              <motion.div 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "1/1", cursor: "pointer" }}
              >
                <img src="/images/l3.jpg" alt="Paskibraka Selfie" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>

              {/* l4 */}
              <motion.div 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "1/1", cursor: "pointer" }}
              >
                <img src="/images/paskib.png" alt="Paskibraka Pertemuan" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>

              {/* l5 */}
              <motion.div 
                whileHover={{ scale: 1.04 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "1/1", cursor: "pointer" }}
              >
                <img src="/images/l5.jpg" alt="Paskibraka Kelompok" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
            </div>

          </div>

          {/* --- SECTION 3: EVENT PUBLICATION GRID (4 KOLOM, RASIO 2/3) --- */}
          <div style={{ marginTop: "120px", marginBottom: "60px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h3 className="event-title" style={{ fontSize: "22px", fontWeight: 700, color: "#a471cc", marginBottom: "4px" }}>
                EVENT PUBLICATION
              </h3>
              <div style={{ width: "80px", height: "3px", background: "#a471cc", margin: "0 auto 16px" }} />
            </div>

            <div className="grid-4cols" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", width: "100%" }}>
              {["x1.jpeg", "x2.jpeg", "x3.jpeg", "x4.jpeg", "x5.jpeg", "x6.jpeg", "x7.jpeg", "x8.jpeg", "x9.jpeg", "x10.jpg", "x11.jpg", "x12.jpg", "x13.jpg", "x14.jpg", "x15.png", "x16.png"].map((id, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    borderRadius: "16px", 
                    overflow: "hidden", 
                    aspectRatio: "2 / 3",
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
                  }}
                >
                  <img src={`/images/${id}`} alt={`Dokumentasi ${id}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}