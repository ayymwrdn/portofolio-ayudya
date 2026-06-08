"use client";

import React, { useState, useRef } from "react";

interface Glitter {
  id: number; x: number; y: number; size: number;
  color: string; angle: number; speed: number; opacity: number;
}
interface Project { 
  id: number; 
  img: string; 
  label: string;
  url?: string; // tambahan URL untuk setiap proyek
}

const PROJECTS: Project[] = [
  { id: 1, img: "/images/p1.png", label: "Home", url: "https://example.com/project1" },
  { id: 2, img: "/images/p2.png", label: "Profile", url: "https://example.com/project2" },
  { id: 3, img: "/images/p3.png", label: "Gallery", url: "https://example.com/project3" },
  { id: 4, img: "/images/p4.png", label: "Contact", url: "https://example.com/project4" },
];

const GLITTER_COLORS = [
  "#ff69b4","#ffb6c1","#ff1493","#ffd700",
  "#fff0f5","#ff85c8","#ffe4f0","#ffec99",
];

function GlitterParticle({ g }: { g: Glitter }) {
  return (
    <span style={{
      position:"absolute", left:g.x, top:g.y,
      width:g.size, height:g.size, borderRadius:"50%",
      background:g.color, opacity:g.opacity, pointerEvents:"none",
      animation:`glitterFly ${g.speed}s ease-out forwards`,
      transform:`rotate(${g.angle}deg)`,
      boxShadow:`0 0 ${g.size*2}px ${g.color}`, zIndex:100,
    }}/>
  );
}

// ── Custom Popup Component ───────────────────────────────────────────────────
function CustomPopup({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  projectName,
  projectUrl 
}: { 
  isOpen: boolean; 
  onConfirm: () => void; 
  onCancel: () => void;
  projectName: string;
  projectUrl: string;
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "28px 32px",
        maxWidth: "400px",
        width: "90%",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        animation: "popupFadeIn 0.2s ease-out",
      }}>
        <div style={{
          fontSize: "48px",
          marginBottom: "12px",
        }}>🔗</div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "24px",
          color: "#1a1a1a",
          marginBottom: "12px",
        }}>Visit {projectName}?</h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "#666",
          marginBottom: "24px",
          wordBreak: "break-all",
        }}>
          You will be redirected to:<br/>
          <span style={{ color: "#ff1493", fontWeight: 500 }}>{projectUrl}</span>
        </p>
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
        }}>
          <button onClick={onCancel} style={{
            padding: "10px 24px",
            borderRadius: "40px",
            border: "1.5px solid #ddd",
            background: "white",
            color: "#666",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "10px 28px",
            borderRadius: "40px",
            border: "none",
            background: "linear-gradient(135deg, #ff69b4, #ff1493)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}>Visit →</button>
        </div>
      </div>
      <style>{`
        @keyframes popupFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default function ProjectSection() {
  const [activePhoto, setActivePhoto] = useState<number|null>(null);
  const [lilyState, setLilyState] = useState<"bloom"|"bud">("bloom");
  const [glitters, setGlitters] = useState<Glitter[]>([]);
  const [photoGlitters, setPhotoGlitters] = useState<{[k:number]:Glitter[]}>({});
  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    projectId: number | null;
    projectName: string;
    projectUrl: string;
  }>({
    isOpen: false,
    projectId: null,
    projectName: "",
    projectUrl: "",
  });
  const gid = useRef(0);

  const makeGlitters = (cx:number, cy:number, count=24): Glitter[] =>
    Array.from({length:count}, () => ({
      id: ++gid.current,
      x: cx - 6 + Math.random()*12,
      y: cy - 6 + Math.random()*12,
      size: 4 + Math.random()*8,
      color: GLITTER_COLORS[Math.floor(Math.random()*GLITTER_COLORS.length)],
      angle: Math.random()*360,
      speed: 0.5 + Math.random()*0.5,
      opacity: 0.9,
    }));

  const handleLilyClick = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const g = makeGlitters(e.clientX-r.left, e.clientY-r.top, 30);
    setGlitters(p=>[...p,...g]);
    setTimeout(()=>setGlitters(p=>p.filter(x=>!g.find(n=>n.id===x.id))), 900);
    setLilyState("bud");
    setTimeout(()=>setLilyState("bloom"), 480);
  };

  const handlePhotoClick = (e: React.MouseEvent, id: number) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const g = makeGlitters(e.clientX-r.left, e.clientY-r.top, 18);
    setPhotoGlitters(p=>({...p,[id]:g}));
    setTimeout(()=>setPhotoGlitters(p=>{const n={...p};delete n[id];return n;}), 800);
    
    // Buka popup konfirmasi
    const project = PROJECTS.find(p => p.id === id);
    if (project && project.url) {
      setPopupState({
        isOpen: true,
        projectId: id,
        projectName: project.label,
        projectUrl: project.url,
      });
    } else {
      // Jika tidak ada URL, tetap aktifkan efek active
      setActivePhoto(p=>p===id?null:id);
    }
  };

  const handleConfirmVisit = () => {
    if (popupState.projectUrl) {
      window.open(popupState.projectUrl, "_blank", "noopener,noreferrer");
    }
    setActivePhoto(popupState.projectId);
    setPopupState({
      isOpen: false,
      projectId: null,
      projectName: "",
      projectUrl: "",
    });
  };

  const handleCancelVisit = () => {
    setActivePhoto(null);
    setPopupState({
      isOpen: false,
      projectId: null,
      projectName: "",
      projectUrl: "",
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Bebas+Neue&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .ps-root{
          width:100vw; min-height:100vh;
          background:#ffffff;
          display:flex; align-items:center; justify-content:center;
          font-family:'Cormorant Garamond',serif;
          position:relative; overflow:hidden;
        }

        /* subtle grain texture on white bg */
        .ps-root::before{
          content:'';
          position:absolute; inset:0;
          background-image: radial-gradient(circle at 20% 20%, #fff0f7 0%, transparent 60%),
                            radial-gradient(circle at 80% 80%, #fff5fb 0%, transparent 55%);
          pointer-events:none; z-index:0;
        }

        .ps-inner{
          position:relative; z-index:1;
          display:flex; flex-direction:column;
          align-items:center;
          gap:0;
          width:100%; max-width:1200px;
          padding:32px 40px;
        }

        /* pink outer border frame */
        .ps-frame{
          width:100%;
          padding:5px;
          background: white;
          border-radius:8px;
          
        }

        .ps-grid{
          position:relative;
          width:100%;
          aspect-ratio:16/9;
          display:grid;
          grid-template-columns:1fr 1fr;
          grid-template-rows:1fr 1fr;
          gap:20px;
          border-radius:4px;
          overflow:visible;
        }

        /* Photo */
        .ps-photo{
          position:relative; overflow:hidden; cursor:pointer;
          border-radius:3px;
          border:2px solid rgba(249,198,223,0.6);
          transition:transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s;
          z-index:1;
        }
        .ps-photo.active{
          z-index:20;
          transform:scale(1.04);
          box-shadow:0 10px 40px rgba(255,105,180,0.42), 0 0 0 2.5px #ff69b4;
        }
        .ps-photo img{
          width:100%; height:100%; object-fit:cover; display:block;
          transition:filter 0.3s;
        }
        .ps-photo:hover img{ filter:brightness(1.07) saturate(1.08); }
        .ps-photo.active img{ filter:brightness(1.1) saturate(1.12); }
        .ps-photo-label{
          position:absolute; bottom:8px; left:12px;
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(11px,1.6vw,18px);
          letter-spacing:0.16em; color:#fff;
          text-shadow:0 2px 10px rgba(0,0,0,0.5);
          opacity:0; transform:translateY(6px);
          transition:opacity 0.22s, transform 0.22s;
          pointer-events:none;
        }
        .ps-photo:hover .ps-photo-label,
        .ps-photo.active .ps-photo-label{ opacity:1; transform:translateY(0); }

        /* Info card — centered over grid */
        .ps-info{
          position:absolute;
          top:50%; left:50%;
          transform:translate(-50%,-50%);
          width:clamp(220px,40%,420px);
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(10px);
          border-radius:4px;
          padding:clamp(14px,2.5vw,28px) clamp(18px,3vw,36px);
          z-index:10;
          box-shadow:0 4px 28px rgba(255,105,180,0.16);
          pointer-events:none;
          transition:opacity 0.28s, z-index 0s;
        }
        .ps-info.behind{
          z-index:5; opacity:0.5;
        }
        .ps-info-top{
          display:flex; justify-content:space-between; align-items:baseline;
          margin-bottom:10px;
        }
        .ps-info-title{
          font-family:'Playfair Display',serif; font-weight:700;
          font-size:clamp(18px,2.8vw,34px); color:#1a1a1a;
        }
        .ps-info-year{
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(18px,2.8vw,34px);
          color:#ff1493; letter-spacing:0.06em;
        }
        .ps-info-divider{
          width:36px; height:2px;
          background:linear-gradient(90deg,#ff69b4,#ff1493);
          margin-bottom:10px;
        }
        .ps-info-desc{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(11px,1.2vw,14px);
          font-weight:300; line-height:1.75; color:#555;
        }

        /* Lily */
        .ps-lily-wrap{
          position:absolute;
          bottom:8%; right:5%;
          width:clamp(70px,10vw,130px);
          z-index:30; cursor:pointer; user-select:none;
          transform-origin:bottom center;
          animation:lilyWave 3.6s ease-in-out infinite;
        }
        .ps-lily-wrap.bud{
          animation:none !important;
          transform:scale(0.35) rotate(-18deg) !important;
          filter:brightness(0.65) saturate(0.5);
          transition:transform 0.16s cubic-bezier(.22,1,.36,1), filter 0.16s;
        }
        .ps-lily-wrap.bloom{
          transform:scale(1) rotate(0deg) !important;
          filter:none;
          transition:transform 0.28s cubic-bezier(.34,1.56,.64,1), filter 0.28s;
        }
        .ps-lily-wrap img{
          width:100%; height:auto; display:block;
          filter:drop-shadow(0 6px 18px rgba(255,105,180,0.32));
        }

        @keyframes lilyWave{
          0%  {transform:rotate(0deg) translateY(0)}
          20% {transform:rotate(4deg) translateY(-5px)}
          40% {transform:rotate(-3deg) translateY(-2px)}
          60% {transform:rotate(5deg) translateY(-7px)}
          80% {transform:rotate(-2deg) translateY(-2px)}
          100%{transform:rotate(0deg) translateY(0)}
        }

        @keyframes glitterFly{
          0%  {transform:translate(0,0) scale(1) rotate(0deg); opacity:1}
          60% {opacity:0.85}
          100%{transform:translate(
                calc((var(--dx,1))*55px),
                calc((var(--dy,1))*-65px)
              ) scale(0.15) rotate(720deg); opacity:0}
        }
      `}</style>

      <div className="ps-root">
        <div className="ps-inner">
          <div className="ps-frame">
            <div className="ps-grid">

              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  className={`ps-photo${activePhoto===p.id?" active":""}`}
                  onClick={(e)=>handlePhotoClick(e,p.id)}
                >
                  <img src={p.img} alt={p.label}/>
                  <span className="ps-photo-label">{p.label}</span>
                  {(photoGlitters[p.id]||[]).map(g=><GlitterParticle key={g.id} g={g}/>)}
                </div>
              ))}

              {/* Info card */}
              <div className={`ps-info${activePhoto!==null?" behind":""}`}>
                <div className="ps-info-top">
                  <span className="ps-info-title">Project 1</span>
                  <span className="ps-info-year">2024</span>
                </div>
                <div className="ps-info-divider"/>
                <p className="ps-info-desc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              {/* Lily */}
              <div
                className={`ps-lily-wrap ${lilyState}`}
                onClick={handleLilyClick}
                style={{position:"absolute"}}
              >
                <img src="/images/lily.png" alt="Lily" draggable={false}/>
                {glitters.map(g=><GlitterParticle key={g.id} g={g}/>)}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Custom Popup */}
      <CustomPopup
        isOpen={popupState.isOpen}
        onConfirm={handleConfirmVisit}
        onCancel={handleCancelVisit}
        projectName={popupState.projectName}
        projectUrl={popupState.projectUrl}
      />
    </>
  );
}