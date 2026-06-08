"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// ── Asset paths ─────────────────────────────────────────
const FLOWER_UNG_PNG  = "/images/ungu.png";
const FLOWER_LILY_PNG = "/images/lily.png";
const FLOWER_10_PNG   = "/images/10.png";
const FLOWER_9_PNG    = "/images/9.png";

const ARROW_LEFT_PNG  = "/images/panahkiri.png";
const ARROW_RIGHT_PNG = "/images/panahkanan.png";
const BG_IMAGE_JPG    = "/images/bgpr.jpg";
const WEB_HEADER_PNG  = "/images/web.png";

// ── Gallery data ────────────────────────────────────────
const galleryT = [
  "/images/t1.png",  "/images/t2.png",  "/images/t3.png",  "/images/t4.png",
  "/images/t5.png",  "/images/t6.png",  "/images/t7.png",  "/images/t8.png",
  "/images/t9.png",  "/images/t10.png", "/images/t11.png", "/images/t12.png",
  "/images/t13.png", "/images/t14.png", "/images/t15.png",
];

const galleryO = [
  "/images/o1.png", "/images/o2.png", "/images/o3.png", "/images/o4.png",
  "/images/o5.png", "/images/o6.png", "/images/o7.png", "/images/o8.png",
];

const galleryP = [
  "/images/p1.png", "/images/p2.png", "/images/p3.png", "/images/p4.png",
];

const galleryR = [
  "/images/r1.png", "/images/r2.png", "/images/r3.png",
  "/images/r4.png", "/images/r5.png", "/images/r6.png",
];

// ── Row definitions ──────────────────────────────────────
interface RowConfig {
  images: string[];
  title: string;
  body: string;
  bgColor: string;
  flower: { imageSrc: string; left?: string | number; right?: string | number; top?: string | number };
}

const rows: RowConfig[] = [
  {
    images: galleryT,
    title: "Sistem Informasi Manajemen Operasional PT Mitra Sejati (Laravel, PHP, MySQL)",
    body: "Sistem Manajemen PT Mitra Sejati merupakan platform manajemen internal perusahaan yang dikembangkan menggunakan framework Laravel berbasis PHP. Proyek ini dirancang sebagai pusat kendali operasional yang memungkinkan pengelolaan data produk dan pemantauan database klien secara real-time melalui database MySQL yang terstruktur. Dengan mengimplementasikan sistem autentikasi berbasis hak akses (Admin dan User), aplikasi ini memastikan integritas data perusahaan tetap terjaga. Dilengkapi dengan API untuk mendukung pertukaran data antar sistem, fitur utama mencakup manajemen produk, pencatatan transaksi penjualan, serta antarmuka yang presisi untuk efisiensi alur kerja perusahaan.",
    bgColor: "#f3dcf9",
    flower: { imageSrc: FLOWER_UNG_PNG, left: "-40px", top: "-40px" },
  },
  {
    images: galleryO,
    title: "BookFind: Sistem Informasi Manajemen Buku dan Galeri Gambar (PHP Native, MySQL)",
    body: "BookFind adalah Sistem Informasi Manajemen Buku dan Galeri Gambar, aplikasi berbasis web yang dibangun dengan PHP Native dan MySQL untuk mendigitalisasi sistem pengelolaan koleksi buku. Proyek ini memfasilitasi pengguna dalam melakukan pengelolaan inventaris buku melalui fungsi CRUD (Create, Read, Update, Delete) yang responsif dan terstruktur, dilengkapi dengan fitur pencarian dan pengurutan data. Selain itu, aplikasi ini juga menyediakan modul upload gambar dengan preview dan galeri, serta fitur cetak laporan PDF untuk kebutuhan dokumentasi. Dengan mengimplementasikan sistem autentikasi pengguna dan layout berbasis iframe yang presisi, BookFind dirancang untuk kemudahan navigasi dan efisiensi akses data. Aplikasi ini menjadi solusi praktis dalam mengelola data literatur secara modern, terintegrasi, dan siap dikembangkan lebih lanjut.",
    bgColor: "#f3cad8",
    flower: { imageSrc: FLOWER_9_PNG, right: "-25px", top: "-30px" },
  },
  {
    images: galleryP,
    title: "Ayudya Website Profile (HTML & CSS)",
    body: "Ayudya Website Profile adalah website profil pribadi statis yang dibangun dengan HTML dan CSS murni. Website ini menggunakan struktur frameset untuk memisahkan header, konten, dan footer. Terdapat halaman Home (perkenalan), Profile (biodata, pengalaman magang & organisasi, audio/video), galeri foto dengan grid responsif, serta halaman kontak terintegrasi WhatsApp, Instagram, dan Google Maps. Proyek ini menonjolkan konsistensi desain dengan palet warna pink keunguan, Google Fonts, serta layout CSS positioning dan grid. Meskipun navigasi masih perlu dikembangkan, proyek ini menunjukkan pemahaman saya tentang struktur HTML, styling CSS, dan penyajian konten multimedia di web.",
    bgColor: "#f3dcf9",
    flower: { imageSrc: FLOWER_LILY_PNG, right: "-25px", top: "-30px" },
  },
  {
    images: galleryR,
    title: "Mitra Sejati Finance: Simpan Pinjam Application (HTML, CSS, JavaScript)",
    body: "Website PT Mitra Sejati adalah company profile dan aplikasi transaksi simpan pinjam berbasis HTML, CSS, dan JavaScript murni. Website ini menampilkan profil perusahaan jasa keuangan mikro, lengkap dengan informasi kontak dan misi perusahaan. Fitur unggulan mencakup form login dengan validasi JavaScript dan aplikasi transaksi yang memungkinkan pengguna mencatat simpanan, pinjaman, atau tabungan — dengan data tersimpan di localStorage sehingga tetap ada meskipun halaman di-refresh. Dibangun dengan iframe layout dan desain responsif (media query untuk smartphone), proyek ini menunjukkan kemampuan saya dalam membangun website front-end yang terstruktur, interaktif, dan mudah digunakan.",
    bgColor: "#f3cad8",
    flower: { imageSrc: FLOWER_10_PNG, left: "-40px", top: "-40px" },
  },
];

// ── Animation variants ──────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
  },
};

// ── Arrow helper style ──────────────────────────────────
function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 8,
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "transparent",
    border: "none",
    padding: 0,
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

// ── AnimatedArrow ───────────────────────────────────────
function AnimatedArrow({
  side,
  images,
  setIdx,
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

  const arrowVariants: Variants = {
    rest: { scale: 1 },
    pressed: { scale: 0.9, opacity: 0.8 },
  };

  return (
    <motion.div
      onClick={handleClick}
      variants={arrowVariants}
      animate={isPressed ? "pressed" : "rest"}
      transition={{ duration: 0.1 }}
      style={{ ...arrowStyle(side), cursor: "pointer", position: "absolute", zIndex: 10, overflow: "visible" }}
    >
      <img
        src={side === "left" ? ARROW_LEFT_PNG : ARROW_RIGHT_PNG}
        alt={`panah ${side}`}
        style={{ width: "100%", height: "100%", objectFit: "contain", userSelect: "none" }}
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
              background:
                "radial-gradient(circle, rgba(216,180,254,0.6) 0%, rgba(246,182,232,0.6) 40%, transparent 80%)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── GalleryInner ─────────────────────────────────────────
function GalleryInner({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
          />
        ))}
      </div>

      <AnimatedArrow side="left" images={images} setIdx={setIdx} />
      <AnimatedArrow side="right" images={images} setIdx={setIdx} />

      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 4,
          zIndex: 10,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: idx === i ? "#2d1b3d" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── AnimatedFlower ──────────────────────────────────────
function AnimatedFlower({
  left,
  right,
  top,
  bottom,
  imageSrc,
}: {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
  imageSrc: string;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const isBunga = imageSrc === FLOWER_9_PNG || imageSrc === FLOWER_LILY_PNG;

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSparkle(true);
    setTimeout(() => setSparkle(false), 700);
    setTimeout(() => setIsAnimating(false), isBunga ? 1200 : 500);
  };

  const shakeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.3, rotate: -25 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 80, damping: 12, delay: 0.3 },
    },
    animate: {
      x: [0, -8, 8, -6, 6, -4, 4, 0],
      rotate: [0, -6, 6, -4, 4, -2, 2, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const flyVariants: Variants = {
    hidden: { opacity: 0, scale: 0.3, rotate: -25 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 80, damping: 12, delay: 0.3 },
    },
    animate: {
      x: [0, -25, -60, -30, 15, 0],
      y: [0, -40, -90, -120, -45, 0],
      scale: [1, 1.1, 0.8, 0.6, 0.9, 1],
      rotate: [0, -12, -25, 12, 8, 0],
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const currentVariants = isBunga ? flyVariants : shakeVariants;

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: isAnimating ? 1 : 1.05 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={currentVariants}
      animate={isAnimating ? "animate" : undefined}
      style={{
        position: "absolute",
        left,
        right,
        top,
        bottom,
        zIndex: 20,
        cursor: "pointer",
      }}
    >
      <img
        src={imageSrc}
        alt="decoration"
        style={{ width: 100, height: 100, objectFit: "contain", userSelect: "none" }}
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

// ── GalleryRow ──────────────────────────────────────────
function GalleryRow({ row, index }: { row: RowConfig; index: number }) {
  const { images, title, body, bgColor, flower } = row;
  const galleryLeft = index % 2 !== 0;

  return (
    <>
      <style>{`
        .gallery-row {
          position: relative;
          display: flex;
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .gallery-row {
            flex-direction: column !important;
            gap: 16px;
          }
          .gallery-row .text-card {
            flex: 0 0 auto !important;
            width: 100% !important;
            order: 1 !important;
          }
          .gallery-row .gallery-wrap {
            flex: 0 0 auto !important;
            width: 100% !important;
            min-height: 220px !important;
            order: 2 !important;
          }
        }
      `}</style>

      <motion.div
        className="gallery-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          flexDirection: galleryLeft ? "row-reverse" : "row",
        }}
      >
        <AnimatedFlower
          imageSrc={flower.imageSrc}
          left={flower.left}
          right={flower.right}
          top={flower.top}
        />

        <div className="text-card" style={{
          background: bgColor,
          padding: "20px 20px",
          flex: "0 0 320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16,
            fontWeight: 900,
            color: "#2d1b3d",
            lineHeight: 1.3,
          }}>
            {title}
          </h2>
          <p style={{ fontSize: 11, color: "#3d2050", lineHeight: 1.6 }}>{body}</p>
        </div>

        <div className="gallery-wrap" style={{
          position: "relative",
          flex: 2,
          minWidth: 0,
          overflow: "hidden",
          borderRadius: "4px",
          minHeight: 220,
        }}>
          <GalleryInner images={images} />
        </div>
      </motion.div>
    </>
  );
}

// ── Main export ─────────────────────────────────────────
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
            gap: 32,
            paddingLeft: "4%",
            paddingRight: "4%",
            paddingTop: "16px",
            paddingBottom: "40px",
            minHeight: "100vh",
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <motion.img
              variants={childVariants}
              src={WEB_HEADER_PNG}
              alt="web header"
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </motion.div>

          {rows.map((row, i) => (
            <GalleryRow key={i} row={row} index={i} />
          ))}
        </div>
      </section>

      {!bgLoaded && (
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            background: "red",
            color: "white",
            padding: "4px 8px",
            fontSize: 10,
            zIndex: 9999,
            borderRadius: 4,
          }}
        >
          Loading bg...
        </div>
      )}
    </>
  );
}