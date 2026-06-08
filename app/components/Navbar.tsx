"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "home",         label: "Home" },
  { id: "profile",      label: "About Me" },
  { id: "project",      label: "Project",  hasDropdown: true },
  { id: "exp",          label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact",      label: "Contact" },
];

const projectSubs = [
  { id: "project-web",     label: "Web Build",       icon: "🌐" },
  { id: "project-uiux",    label: "UI & UX Design",  icon: "🎨" },
  { id: "project-graphic", label: "Graphic Design",  icon: "✦" },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [active, setActive]       = useState("home");
  const [hovered, setHovered]     = useState<string | null>(null);
  const [atTop, setAtTop]         = useState(true);
  const [visible, setVisible]     = useState(true);
  const [projectOpen, setProjectOpen] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < lastY || scrollY < 10) { setVisible(true); }
      else { setVisible(false); setOpen(false); setProjectOpen(false); }
      lastY = scrollY;
      setAtTop(scrollY < 80);
      const y = scrollY + 120;
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) setActive(l.id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close project dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (projectRef.current && !projectRef.current.contains(e.target as Node)) {
        setProjectOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
    setProjectOpen(false);
  };

  const scrolled = !atTop;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -90, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 40px", height: 66,
          background: scrolled ? "rgba(255,255,255,0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(216,180,254,0.2)" : "none",
          transition: "background 0.4s ease, border 0.4s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Logo */}
        <motion.span
          onClick={() => scrollTo("home")}
          whileHover={{ scale: 1.05 }}
          style={{
            fontSize: 20, fontWeight: 900, cursor: "pointer",
            letterSpacing: "0.18em",
            background: "linear-gradient(135deg, #c084fc, #f472b6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          AYUDYA.
        </motion.span>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {navLinks.map((l) =>
            l.hasDropdown ? (
              /* ── Project button + sub-dropdown ── */
              <div key={l.id} ref={projectRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setProjectOpen((p) => !p)}
                  onMouseEnter={() => setHovered(l.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: active === l.id || hovered === l.id || projectOpen
                      ? "rgba(192,132,252,0.12)" : "rgba(0,0,0,0)",
                    border: "none", cursor: "pointer",
                    fontSize: 12.5,
                    fontWeight: active === l.id ? 600 : 400,
                    color: active === l.id || hovered === l.id || projectOpen ? "#9333ea" : "#555",
                    padding: "7px 13px", borderRadius: 8,
                    transition: "all 0.2s", letterSpacing: "0.03em",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex", alignItems: "center", gap: 4,
                  }}
                >
                  {l.label}
                  <motion.span
                    animate={{ rotate: projectOpen ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ display: "flex", alignItems: "center", fontSize: 10, color: "#c084fc" }}
                  >
                    ▾
                  </motion.span>
                </button>

                {/* Sub-dropdown */}
                <AnimatePresence>
                  {projectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{
                        position: "absolute", top: "calc(100% + 10px)", left: "50%",
                        transform: "translateX(-50%)",
                        width: 190,
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(216,180,254,0.3)",
                        borderRadius: 16, padding: "8px 6px",
                        boxShadow: "0 12px 40px rgba(168,85,247,0.14)",
                        zIndex: 300,
                      }}
                    >
                      {/* little arrow */}
                      <div style={{
                        position: "absolute", top: -6, left: "50%",
                        transform: "translateX(-50%)",
                        width: 12, height: 12,
                        background: "rgba(255,255,255,0.92)",
                        border: "1px solid rgba(216,180,254,0.3)",
                        borderRight: "none", borderBottom: "none",
                        rotate: "45deg",
                      }} />
                      {projectSubs.map((s, i) => (
                        <SubItem key={s.id} item={s} delay={i * 0.04} onClick={() => scrollTo(s.id)} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                onMouseEnter={() => setHovered(l.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: active === l.id || hovered === l.id
                    ? "rgba(192,132,252,0.12)" : "rgba(0,0,0,0)",
                  border: "none", cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: active === l.id ? 600 : 400,
                  color: active === l.id || hovered === l.id ? "#9333ea" : "#555",
                  padding: "7px 13px", borderRadius: 8,
                  transition: "all 0.2s", letterSpacing: "0.03em",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {l.label}
              </button>
            )
          )}
        </div>

        {/* Hamburger */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          aria-label="Menu"
          style={{
            background: "rgba(216,180,254,0.12)",
            border: "1px solid rgba(216,180,254,0.3)",
            borderRadius: 12, padding: "9px 11px",
            cursor: "pointer", display: "flex",
            flexDirection: "column", gap: 4.5, transition: "background 0.2s",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", height: 2, borderRadius: 2,
              background: "linear-gradient(90deg, #c084fc, #f472b6)",
              transition: "all 0.3s", width: i === 1 ? 14 : 20,
              ...(open && i === 0 ? { transform: "rotate(45deg) translate(4.5px,4.5px)", width: 20 } : {}),
              ...(open && i === 1 ? { opacity: 0 } : {}),
              ...(open && i === 2 ? { transform: "rotate(-45deg) translate(4.5px,-4.5px)", width: 20 } : {}),
            }} />
          ))}
        </motion.button>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {open && visible && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed", top: 74, right: 22, zIndex: 199,
              width: 250,
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(216,180,254,0.28)",
              borderRadius: 20, padding: "10px 8px",
              boxShadow: "0 12px 48px rgba(168,85,247,0.14)",
            }}
          >
            {navLinks.map((l, i) =>
              l.hasDropdown ? (
                <MobileProjectItem
                  key={l.id}
                  label={l.label}
                  active={active === l.id}
                  delay={i * 0.035}
                  subs={projectSubs}
                  onSubClick={scrollTo}
                />
              ) : (
                <DropdownItem
                  key={l.id} label={l.label} id={l.id}
                  active={active === l.id} delay={i * 0.035}
                  onClick={() => scrollTo(l.id)}
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {atTop && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              exit: { duration: 0.3 },
            }}
            style={{
              position: "fixed", bottom: 28, left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 6, zIndex: 200, cursor: "pointer",
            }}
            onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span style={{
              fontSize: 10, color: "#888", letterSpacing: "0.12em",
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 500,
            }}>SCROLL</span>
            <div style={{
              width: 20, height: 32, border: "1.5px solid rgba(216,180,254,0.5)",
              borderRadius: 10, display: "flex", justifyContent: "center", paddingTop: 6,
            }}>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 4, height: 4, borderRadius: "50%", background: "linear-gradient(135deg, #c084fc, #f472b6)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        @media (max-width: 900px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}

/* ── Sub-item for desktop dropdown ── */
function SubItem({ item, delay, onClick }: {
  item: { id: string; label: string; icon: string };
  delay: number;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        width: "100%", border: "none", cursor: "pointer",
        background: hov ? "rgba(192,132,252,0.12)" : "transparent",
        fontSize: 13, fontWeight: hov ? 500 : 400,
        color: hov ? "#9333ea" : "#555",
        padding: "9px 14px", borderRadius: 10,
        transition: "all 0.18s", textAlign: "left",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span style={{ fontSize: 14 }}>{item.icon}</span>
      {item.label}
    </motion.button>
  );
}

/* ── Mobile expandable Project item ── */
function MobileProjectItem({ label, active, delay, subs, onSubClick }: {
  label: string; active: boolean; delay: number;
  subs: { id: string; label: string; icon: string }[];
  onSubClick: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <motion.button
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        onClick={() => setExpanded((p) => !p)}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          width: "100%",
          background: active || expanded ? "rgba(192,132,252,0.12)" : "transparent",
          border: "none", cursor: "pointer",
          fontSize: 14, fontWeight: active ? 600 : 400,
          color: active || expanded ? "#9333ea" : "#444",
          padding: "11px 16px", borderRadius: 12,
          textAlign: "left", transition: "all 0.2s",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span style={{
          width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
          background: active ? "linear-gradient(135deg, #c084fc, #f472b6)" : "rgba(192,132,252,0.35)",
        }} />
        {label}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: "auto", fontSize: 11, color: "#c084fc" }}
        >▾</motion.span>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: "hidden", paddingLeft: 16 }}
          >
            {subs.map((s) => (
              <button
                key={s.id}
                onClick={() => onSubClick(s.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", border: "none", cursor: "pointer",
                  background: "transparent", fontSize: 13, color: "#666",
                  padding: "9px 14px", borderRadius: 10,
                  textAlign: "left", fontFamily: "'DM Sans', sans-serif",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9333ea")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
              >
                <span style={{ fontSize: 13 }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Regular dropdown item ── */
function DropdownItem({ label, id, active, delay, onClick }: {
  label: string; id: string; active: boolean; delay: number; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        width: "100%",
        background: active || hov ? "rgba(192,132,252,0.12)" : "rgba(0,0,0,0)",
        border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: active ? 600 : 400,
        color: active || hov ? "#9333ea" : "#444",
        padding: "11px 16px", borderRadius: 12,
        textAlign: "left", transition: "all 0.2s",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span style={{
        width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
        background: active ? "linear-gradient(135deg, #c084fc, #f472b6)" : "rgba(192,132,252,0.35)",
      }} />
      {label}
      {active && <span style={{ marginLeft: "auto", fontSize: 12, color: "#c084fc" }}>←</span>}
    </motion.button>
  );
}