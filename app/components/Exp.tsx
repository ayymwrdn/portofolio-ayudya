"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ── Tipe data ──────────────────────────────────────────────────────────────────
type TimelineEntry = {
  date: string;
  title: string;
  subtitle?: string;
  items: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  KOLOM 1 — Kepribadian & Kompetensi
// ─────────────────────────────────────────────────────────────────────────────
const KEPRIBADIAN = [
  "Bertanggung Jawab",
  "Disiplin",
  "Teliti dan Detail-Oriented",
  "Cepat Beradaptasi",
  "Komunikatif",
  "Mudah Bekerja Sama dalam Tim",
  "Manajemen Waktu yang Baik",
  "Problem Solving",
  "Percaya Diri",
  "Mampu Bekerja di Bawah Tekanan",
];

const KOMPETENSI = [
  "Web Development : HTML, CSS, JavaScript, React.js, Next.js, Laravel, Node.js",
  "Mobile Development : Flutter",
  "UI/UX Design : Figma, Wireframing, Prototyping",
  "Graphic Design : Photoshop, Illustrator, Figma, Canva",
  "Database : MySQL",
  "Microsoft Office : Word, Excel, PowerPoint",
  "English Communication",
];

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  KOLOM 2 — DATA EDUKASI & PELATIHAN (BERURUTAN)
// ─────────────────────────────────────────────────────────────────────────────
const EDUKASI = [
  {
    period: "2024 – Sekarang",
    school: "Universitas Pamulang",
    items: [
      "- Mahasiswa aktif dengan IPK Terakhir 3.75",
    ],
  },
  {
    period: "2020 – 2023",
    school: "SMKKN 3 Kota Tangerang",
    items: [
      "- Lulus dengan predikat sangat memuaskan (nilai rata-rata 90+) dan mendapatkan peringkat 6 se-angkatan.",
      "- Paskibraka Indonesia tingkat Kota Tangerang tahun 2022.",
    ],
  },
];

const PELATIHAN: TimelineEntry[] = [
  {
    date: "April 2026",
    title: "Pelatihan & Workshop UI/UX Design — ImpactSI Season 1",
    subtitle: "Himpunan Mahasiswa Sistem Informasi (HMSI) Universitas Pamulang",
    items: [
      "- Berpartisipasi aktif sebagai peserta dalam workshop intensif UI/UX yang mencakup tahapan user research hingga prototyping.",
      "- Mempelajari implementasi tata letak visual dan prinsip kenyamanan antarmuka pengguna digital.",
    ],
  },
  {
    date: "Oktober 2025",
    title: "Tech for Efficiency — Meningkatkan Efisiensi dan Daya Saing Bisnis melalui Sistem Informasi",
    subtitle: "Seminar Nasional NATISIA 2025 (Program Studi Sistem Informasi Universitas Pamulang)",
    items: [
      "- Mengikuti rangkaian seminar nasional untuk memahami inovasi sistem informasi terbaru.",
      "- Mendalami bagaimana integrasi teknologi dapat mengoptimalkan operasional dan performa bisnis secara kompetitif.",
    ],
  },
  {
    date: "November 2024",
    title: "The Future of Cybersecurity: Emerging Trends and Prediction for The Coming Years",
    subtitle: "Seminar Program Studi Sistem Informasi Fakultas Ilmu Komputer Universitas Pamulang",
    items: [
      "- Mengikuti seminar nasional yang membahas proyeksi, tren terbaru, dan ancaman keamanan siber di masa depan.",
      "- Memahami langkah preventif serta arsitektur dasar dalam mengamankan infrastruktur teknologi informasi.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  KOLOM 3 — PENGALAMAN KERJA (BERDIRI SENDIRI)
// ─────────────────────────────────────────────────────────────────────────────
const PENGALAMAN: TimelineEntry[] = [
  {
    date: "Mei 2026 – Sekarang",
    title: "Kedai Mayu",
    subtitle: "Social Media & Digital Marketing",
    items: [
      "- Mengelola akun media sosial Kedai Mayu untuk meningkatkan branding dan engagement pelanggan.",
      "- Membuat desain konten promosi menggunakan Canva dan aplikasi desain lainnya.",
      "- Menyusun strategi pemasaran digital untuk memperluas jangkauan audiens.",
      "- Mengambil foto dan video produk untuk kebutuhan promosi media sosial.",
      "- Membuat konten kreatif berupa poster, reels, dan video pendek untuk meningkatkan daya tarik pelanggan.",
    ],
  },
  {
    date: "Februari 2025 – Sekarang",
    title: "Duta Pancasila Paskibraka Indonesia",
    subtitle: "Sekretariat",
    items: [
      "- Menyusun surat tugas, surat perizinan, dan dokumen administrasi organisasi.",
      "- Mengelola kebutuhan administrasi menggunakan Microsoft Office.",
      "- Membangun koordinasi yang baik dengan anggota dan pengurus organisasi.",
      "- Menunjukkan kemampuan komunikasi, ketelitian, dan manajemen dokumen yang baik.",
    ],
  },
  {
    date: "Agustus 2023 – Februari 2024",
    title: "InterContinental Hotel Jakarta",
    subtitle: "Internship - Pastry & Bakery",
    items: [
      "- Bertugas pada Departemen Pastry & Bakery dalam mendukung operasional harian dan menjaga standar kualitas produk.",
      "- Membangun komunikasi yang baik dengan tim untuk memastikan kelancaran proses kerja dan pelayanan.",
      "- Menunjukkan tanggung jawab, disiplin, serta konsistensi dalam menyelesaikan tugas yang diberikan.",
      "- Dipercaya dan dipertahankan sebagai anggota tetap departemen berkat kinerja yang baik dan dedikasi tinggi.",
    ],
  },
];

// ── Helper: fade-in saat scroll ───────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Chip kecil ─────────────────────────────────────────────────────────────
function Chip({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(216,180,254,0.45)",
        borderRadius: 999,
        padding: "5px 14px",
        fontSize: "clamp(12px, 3vw, 13px)",
        color: "#6d28d9",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        backdropFilter: "blur(6px)",
        lineHeight: 1.4,
      }}
    >
      {text}
    </span>
  );
}

// ── Timeline item ──────────────────────────────────────────────────────────
function TimelineItem({ date, title, subtitle, items, index }: { date: string; title: string; subtitle?: string; items: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{ 
        display: "flex", 
        gap: "clamp(12px, 3vw, 20px)", 
        marginBottom: "clamp(24px, 4vw, 32px)" 
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c084fc, #f472b6)",
            boxShadow: "0 0 8px rgba(192,132,252,0.5)",
            marginTop: 4,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, width: 1.5, background: "rgba(216,180,254,0.3)", marginTop: 6 }} />
      </div>

      <div style={{ paddingBottom: 8, flex: 1 }}>
        <span
          style={{
            fontSize: "clamp(12px, 3vw, 14px)",
            fontWeight: "bold",
            letterSpacing: "0.12em",
            color: "#a78bfa",
            fontFamily: "'Cormorant Garamond', serif",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 6,
          }}
        >
          {date}
        </span>
        <p
          style={{
            fontSize: "clamp(16px, 4vw, 17px)",
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 4,
          }}
        >
          {title}
        </p>
        {subtitle && (
          <p
            style={{
              fontSize: "clamp(11px, 3vw, 13px)",
              fontWeight: 500,
              color: "#8b5cf6",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 10,
              fontStyle: "italic",
            }}
          >
            {subtitle}
          </p>
        )}
        <ul style={{ paddingLeft: "clamp(12px, 4vw, 16px)", margin: 0 }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: "clamp(12px, 3vw, 13px)",
                color: "#555",
                lineHeight: 1.7,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 2,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Exp() {
  return (
    <>
      <section
        id="exp"
        style={{
          minHeight: "100vh",
          position: "relative",
          padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 6vw) clamp(60px, 8vh, 80px)",
          background: "linear-gradient(160deg, #fdfbff 0%, #fef4fb 50%, #f8f0ff 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-8%",
            width: "clamp(200px, 40vw, 400px)",
            height: "clamp(200px, 40vw, 400px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(216,180,254,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-5%",
            width: "clamp(150px, 30vw, 300px)",
            height: "clamp(150px, 30vw, 300px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <FadeIn>
          <p
            style={{
              fontSize: "clamp(11px, 3vw, 13px)",
              fontWeight: "bold",
              letterSpacing: "0.4em",
              color: "#c084fc",
              fontFamily: "'Cormorant Garamond', serif",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            More About Me
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(40px, 6vh, 64px)" }}>
            <div
              style={{
                width: 40,
                height: 1.5,
                background: "linear-gradient(90deg, #c084fc, #f472b6)",
                borderRadius: 99,
              }}
            />
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(32px, 5vw, 56px)",
            maxWidth: 1200,
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {/* KOLOM 1: Kepribadian + Kompetensi */}
          <div>
            <FadeIn delay={0.05}>
              <h2
                style={{
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a1a1a",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                Kepribadian
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 40,
                }}
              >
                {KEPRIBADIAN.map((k) => (
                  <Chip key={k} text={k} />
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a1a1a",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                Kompetensi
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {KOMPETENSI.map((k) => (
                  <Chip key={k} text={k} />
                ))}
              </div>
            </FadeIn>
          </div>

          {/* KOLOM 2: Edukasi Terus Nyambung ke Pelatihan & Seminar */}
          <div>
            {/* Bagian Edukasi */}
            <FadeIn delay={0.08}>
              <h2
                style={{
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a1a1a",
                  marginBottom: "clamp(20px, 4vh, 28px)",
                  textTransform: "uppercase",
                }}
              >
                Edukasi
              </h2>
            </FadeIn>
            {EDUKASI.map((edu, i) => (
              <TimelineItem
                key={`edukasi-${i}`}
                date={edu.period}
                title={edu.school}
                items={edu.items}
                index={i}
              />
            ))}

            {/* Bagian Pelatihan & Seminar (Nyambung ke bawah di kolom yang sama) */}
            <div style={{ marginTop: "clamp(16px, 3vh, 20px)" }}>
              <FadeIn delay={0.12}>
                <h2
                  style={{
                    fontSize: "clamp(18px, 4vw, 22px)",
                    fontWeight: 900,
                    letterSpacing: "0.05em",
                    fontFamily: "'Playfair Display', serif",
                    color: "#1a1a1a",
                    marginBottom: "clamp(20px, 4vh, 28px)",
                    textTransform: "uppercase",
                  }}
                >
                  Pelatihan & Seminar
                </h2>
              </FadeIn>
              {PELATIHAN.map((entry, i) => (
                <TimelineItem
                  key={`pelatihan-${i}`}
                  date={entry.date}
                  title={entry.title}
                  subtitle={entry.subtitle}
                  items={entry.items}
                  index={i + 2}
                />
              ))}
            </div>
          </div>

          {/* KOLOM 3: Pengalaman Kerja (Berdiri sendiri di kanan) */}
          <div>
            <FadeIn delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a1a1a",
                  marginBottom: "clamp(20px, 4vh, 28px)",
                  textTransform: "uppercase",
                }}
              >
                Pengalaman Kerja
              </h2>
            </FadeIn>
            {PENGALAMAN.map((entry, i) => (
              <TimelineItem
                key={`pengalaman-${i}`}
                date={entry.date}
                title={entry.title}
                subtitle={entry.subtitle}
                items={entry.items}
                index={i}
              />
            ))}
          </div>
        </div>

        <p
          style={{
            position: "absolute",
            right: "clamp(12px, 4vw, 36px)",
            bottom: "clamp(12px, 4vh, 28px)",
            fontSize: "clamp(8px, 2vw, 10px)",
            color: "#d8b4fe",
            letterSpacing: "0.3em",
            fontFamily: "'Cormorant Garamond', serif",
            textTransform: "uppercase",
          }}
        >
          Experience — 02
        </p>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </>
  );
}