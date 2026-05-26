import { useState, useEffect } from "react";

// 9 players, 7 on field, 4x10 min segments
// Nils = keeper full game (40 min), everyone else exactly 30 min
// Each player sits out exactly 1 segment

const ALL = [
  {
    id: 1,
    name: "Nils Christian Wilberg",
    short: "NC",
    pos: "Keeper",
    keeper: true,
    x: 50,
    y: 88,
    out: null,
  },
  {
    id: 2,
    name: "Tinus Dammann-Jansen",
    short: "TD",
    pos: "Venstre back",
    keeper: false,
    x: 22,
    y: 68,
    out: "B",
  },
  {
    id: 3,
    name: "Markus Finstad Storm",
    short: "MF",
    pos: "Høyre back",
    keeper: false,
    x: 78,
    y: 68,
    out: "B",
  },
  {
    id: 4,
    name: "Melih Sedat Goksu",
    short: "MSG",
    pos: "Venstre midtbane",
    keeper: false,
    x: 20,
    y: 46,
    out: "C",
  },
  {
    id: 5,
    name: "Cornelius Wedel Jarlsberg Herheim",
    short: "CW",
    pos: "Sentral midtbane",
    keeper: false,
    x: 50,
    y: 46,
    out: "D",
  },
  {
    id: 6,
    name: "Rayan Maghsudlu",
    short: "RM",
    pos: "Høyre midtbane",
    keeper: false,
    x: 80,
    y: 46,
    out: "C",
  },
  {
    id: 7,
    name: "Alex Noisang Mæland",
    short: "AM",
    pos: "Spiss",
    keeper: false,
    x: 50,
    y: 20,
    out: "D",
  },
  {
    id: 8,
    name: "Wilmer Wallenborg",
    short: "WW",
    pos: "Innbytter",
    keeper: false,
    x: null,
    y: null,
    out: "A",
  },
  {
    id: 9,
    name: "Oscar Lundgard",
    short: "OL",
    pos: "Innbytter",
    keeper: false,
    x: null,
    y: null,
    out: "A",
  },
];

const SEGMENTS = ["A", "B", "C", "D"];
const SEG_LABEL = { A: "0-10'", B: "10-20'", C: "20-30'", D: "30-40'" };

const SUBS = [
  { time: "10'", inn: "Wilmer Wallenborg", ut: "Tinus Dammann-Jansen" },
  { time: "10'", inn: "Oscar Lundgard", ut: "Markus Finstad Storm" },
  {
    time: "20'",
    inn: "Tinus Dammann-Jansen",
    ut: "Melih Sedat Goksu",
    note: "Pause",
  },
  {
    time: "20'",
    inn: "Markus Finstad Storm",
    ut: "Rayan Maghsudlu",
    note: "Pause",
  },
  {
    time: "30'",
    inn: "Melih Sedat Goksu",
    ut: "Cornelius Wedel Jarlsberg Herheim",
  },
  { time: "30'", inn: "Rayan Maghsudlu", ut: "Alex Noisang Mæland" },
];

function plays(p, seg) {
  return p.out !== seg;
}

function minutes(p) {
  if (p.keeper) return 40;
  return 30;
}

export default function App() {
  const [active, setActive] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [tab, setTab] = useState("lineup"); // lineup | timeline | subs

  useEffect(() => {
    setTimeout(() => setRevealed(true), 80);
  }, []);

  const starters = ALL.filter((p) => p.x !== null);
  const bench = ALL.filter((p) => p.x === null);
  const sel = active !== null ? ALL.find((p) => p.id === active) : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 14px 48px",
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 20,
          gap: 6,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(-16px)",
          transition: "all 0.5s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D42B2B, #7a0000)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 900,
              color: "#fff",
              boxShadow:
                "0 0 24px rgba(212,43,43,0.7), 0 0 48px rgba(212,43,43,0.2)",
            }}
          >
            R
          </div>
          <div>
            <div
              style={{
                fontSize: 34,
                letterSpacing: 5,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              READY FK
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 3,
                color: "#D42B2B",
                fontFamily: "sans-serif",
                fontWeight: 600,
              }}
            >
              G2016 HVIT · 2-3-1
            </div>
          </div>
        </div>
        <div
          style={{
            background: "rgba(212,43,43,0.12)",
            border: "1px solid rgba(212,43,43,0.35)",
            borderRadius: 6,
            padding: "5px 16px",
            color: "#ccc",
            fontSize: 12,
            letterSpacing: 2,
            fontFamily: "sans-serif",
          }}
        >
          vs ÅRVOLL · RIIS · 2×20 MIN
        </div>
      </div>

      {/* TABS */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 16,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 8,
          padding: 4,
          width: "100%",
          maxWidth: 420,
          opacity: revealed ? 1 : 0,
          transition: "all 0.5s ease 0.2s",
        }}
      >
        {[
          ["lineup", "OPPSTILLING"],
          ["timeline", "SPILLETID"],
          ["subs", "BYTTER"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              background: tab === key ? "#D42B2B" : "transparent",
              color: tab === key ? "#fff" : "#666",
              fontSize: 10,
              letterSpacing: 1.5,
              fontFamily: "'Bebas Neue','Impact',sans-serif",
              transition: "all 0.2s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* LINEUP TAB */}
      {tab === "lineup" && (
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            opacity: revealed ? 1 : 0,
            transition: "all 0.5s ease 0.3s",
          }}
        >
          <div
            style={{
              position: "relative",
              paddingBottom: "145%",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, #1b4d1b 0%, #1f5e1f 100%)",
              }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${i * 12.5}%`,
                    height: "6.25%",
                    background:
                      i % 2 === 0 ? "rgba(0,0,0,0.07)" : "transparent",
                  }}
                />
              ))}
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
                viewBox="0 0 100 145"
                preserveAspectRatio="none"
              >
                <rect
                  x="4"
                  y="4"
                  width="92"
                  height="137"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.5"
                />
                <line
                  x1="4"
                  y1="72.5"
                  x2="96"
                  y2="72.5"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="72.5"
                  r="12"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="72.5"
                  r="0.8"
                  fill="rgba(255,255,255,0.55)"
                />
                <rect
                  x="22"
                  y="4"
                  width="56"
                  height="22"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.5"
                />
                <rect
                  x="35"
                  y="4"
                  width="30"
                  height="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.5"
                />
                <rect
                  x="40"
                  y="1.5"
                  width="20"
                  height="3"
                  fill="none"
                  stroke="rgba(255,255,255,0.65)"
                  strokeWidth="0.6"
                />
                <rect
                  x="22"
                  y="119"
                  width="56"
                  height="22"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.5"
                />
                <rect
                  x="35"
                  y="131"
                  width="30"
                  height="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.5"
                />
                <rect
                  x="40"
                  y="140.5"
                  width="20"
                  height="3"
                  fill="none"
                  stroke="rgba(255,255,255,0.65)"
                  strokeWidth="0.6"
                />
                <circle cx="50" cy="18" r="0.8" fill="rgba(255,255,255,0.55)" />
                <circle
                  cx="50"
                  cy="127"
                  r="0.8"
                  fill="rgba(255,255,255,0.55)"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "2.5%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 8,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: 1,
                  fontFamily: "sans-serif",
                }}
              >
                ÅRVOLL MÅL
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "2.5%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 8,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: 1,
                  fontFamily: "sans-serif",
                }}
              >
                READY MÅL
              </div>

              {starters.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => setActive(active === p.id ? null : p.id)}
                  style={{
                    position: "absolute",
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: "translate(-50%,-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 10,
                    opacity: revealed ? 1 : 0,
                    transition: `all 0.5s ease ${0.35 + i * 0.07}s`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: 32,
                      height: 7,
                      background: "rgba(0,0,0,0.25)",
                      borderRadius: "50%",
                      bottom: -3,
                      filter: "blur(2px)",
                    }}
                  />
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: p.keeper
                        ? "linear-gradient(135deg,#f5a623,#c87000)"
                        : "linear-gradient(135deg,#D42B2B,#7a0000)",
                      border:
                        active === p.id
                          ? "2.5px solid #fff"
                          : "2px solid rgba(255,255,255,0.65)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: p.short.length > 2 ? 8 : 10,
                      fontWeight: 700,
                      color: "#fff",
                      boxShadow:
                        active === p.id
                          ? "0 0 18px rgba(255,255,255,0.9)"
                          : "0 3px 10px rgba(0,0,0,0.6)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {p.short}
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      background: "rgba(0,0,0,0.75)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 3,
                      padding: "2px 5px",
                      fontSize: 8,
                      color: "#fff",
                      letterSpacing: 0.4,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      maxWidth: 68,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                    }}
                  >
                    {p.name.split(" ")[0]}
                  </div>
                  <div
                    style={{
                      fontSize: 7,
                      color: p.keeper ? "#f5a623" : "#ff6b6b",
                      fontFamily: "sans-serif",
                      fontWeight: 700,
                      marginTop: 1,
                    }}
                  >
                    {minutes(p)}'
                  </div>
                </div>
              ))}
            </div>
          </div>

          {sel && (
            <div
              style={{
                marginTop: 10,
                background:
                  "linear-gradient(135deg,rgba(212,43,43,0.18),rgba(120,0,0,0.1))",
                border: "1px solid rgba(212,43,43,0.45)",
                borderRadius: 10,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                animation: "fadeIn 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: sel.keeper
                    ? "linear-gradient(135deg,#f5a623,#c87000)"
                    : "linear-gradient(135deg,#D42B2B,#7a0000)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {sel.short}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 15, letterSpacing: 1 }}>
                  {sel.name}
                </div>
                <div
                  style={{
                    color: "#D42B2B",
                    fontSize: 11,
                    fontFamily: "sans-serif",
                    letterSpacing: 1,
                  }}
                >
                  {sel.pos} · {minutes(sel)} min
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {bench.map((p) => (
              <div
                key={p.id}
                onClick={() => setActive(active === p.id ? null : p.id)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border:
                    active === p.id
                      ? "1px solid rgba(212,43,43,0.7)"
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "9px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "#bbb",
                    fontWeight: 700,
                  }}
                >
                  {p.short}
                </div>
                <div>
                  <div
                    style={{
                      color: "#ddd",
                      fontSize: 12,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {p.name.split(" ")[0]}
                  </div>
                  <div
                    style={{
                      color: "#ff6b6b",
                      fontSize: 10,
                      fontFamily: "sans-serif",
                    }}
                  >
                    30 min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIMELINE TAB */}
      {tab === "timeline" && (
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            opacity: revealed ? 1 : 0,
            transition: "all 0.4s ease 0.1s",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: 16,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                color: "#888",
                fontSize: 10,
                letterSpacing: 2,
                fontFamily: "sans-serif",
                marginBottom: 12,
              }}
            >
              SPILLETID PER SPILLER
            </div>

            {/* Segment header */}
            <div style={{ display: "flex", marginBottom: 8, marginLeft: 80 }}>
              {SEGMENTS.map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: 8,
                    color: "#555",
                    fontFamily: "sans-serif",
                    letterSpacing: 0.5,
                  }}
                >
                  {SEG_LABEL[s]}
                </div>
              ))}
            </div>

            {ALL.map((p, i) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 6,
                  opacity: revealed ? 1 : 0,
                  transition: `all 0.4s ease ${i * 0.06}s`,
                }}
              >
                <div
                  style={{
                    width: 76,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: p.keeper
                        ? "linear-gradient(135deg,#f5a623,#c87000)"
                        : "linear-gradient(135deg,#D42B2B,#7a0000)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 7,
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {p.short}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "#ccc",
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      maxWidth: 44,
                      overflow: "hidden",
                    }}
                  >
                    {p.name.split(" ")[0]}
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", gap: 2 }}>
                  {SEGMENTS.map((s) => {
                    const on = plays(p, s);
                    return (
                      <div
                        key={s}
                        style={{
                          flex: 1,
                          height: 22,
                          borderRadius: 4,
                          background: on
                            ? p.keeper
                              ? "linear-gradient(90deg,#f5a623,#e08c00)"
                              : "linear-gradient(90deg,#D42B2B,#9b1a1a)"
                            : "rgba(255,255,255,0.07)",
                          border: on
                            ? "none"
                            : "1px solid rgba(255,255,255,0.06)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 8,
                          color: on ? "#fff" : "#333",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                          transition: `all 0.3s ease ${
                            0.1 + i * 0.05 + SEGMENTS.indexOf(s) * 0.03
                          }s`,
                        }}
                      >
                        {on ? "●" : ""}
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    width: 30,
                    textAlign: "right",
                    fontSize: 10,
                    color: p.keeper ? "#f5a623" : "#ff6b6b",
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    marginLeft: 6,
                  }}
                >
                  {minutes(p)}'
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "rgba(212,43,43,0.08)",
              border: "1px solid rgba(212,43,43,0.2)",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 11,
              color: "#aaa",
              fontFamily: "sans-serif",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "#D42B2B", fontWeight: 700 }}>
              Keeper Nils:
            </span>{" "}
            40 min (full kamp){"\n"}
            <br />
            <span style={{ color: "#fff", fontWeight: 600 }}>
              Alle andre:
            </span>{" "}
            nøyaktig 30 min · 6 bytter totalt
          </div>
        </div>
      )}

      {/* SUBS TAB */}
      {tab === "subs" && (
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            opacity: revealed ? 1 : 0,
            transition: "all 0.4s ease 0.1s",
          }}
        >
          {["10'", "20'", "30'"].map((t, gi) => {
            const group = SUBS.filter((s) => s.time === t);
            const isHalfTime = t === "20'";
            return (
              <div key={t} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      background: isHalfTime
                        ? "linear-gradient(135deg,#D42B2B,#7a0000)"
                        : "rgba(212,43,43,0.2)",
                      border: isHalfTime
                        ? "none"
                        : "1px solid rgba(212,43,43,0.4)",
                      borderRadius: 5,
                      padding: "4px 12px",
                      color: "#fff",
                      fontSize: 12,
                      letterSpacing: 2,
                      fontWeight: 700,
                    }}
                  >
                    {isHalfTime ? "PAUSE · 20'" : t}
                  </div>
                  {isHalfTime && (
                    <div
                      style={{
                        fontSize: 9,
                        color: "#666",
                        fontFamily: "sans-serif",
                        letterSpacing: 1,
                      }}
                    >
                      HALFTID
                    </div>
                  )}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {group.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8,
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        opacity: revealed ? 1 : 0,
                        transition: `all 0.4s ease ${gi * 0.15 + i * 0.08}s`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: "rgba(74,222,128,0.15)",
                              border: "1px solid rgba(74,222,128,0.4)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 9,
                              color: "#4ade80",
                            }}
                          >
                            ▲
                          </div>
                          <span
                            style={{
                              color: "#e0e0e0",
                              fontSize: 12,
                              fontFamily: "sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {s.inn.split(" ")[0]} {s.inn.split(" ")[1]}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: "rgba(248,113,113,0.15)",
                              border: "1px solid rgba(248,113,113,0.4)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 9,
                              color: "#f87171",
                            }}
                          >
                            ▼
                          </div>
                          <span
                            style={{
                              color: "#888",
                              fontSize: 12,
                              fontFamily: "sans-serif",
                            }}
                          >
                            {s.ut.split(" ")[0]} {s.ut.split(" ")[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 10,
              color: "#666",
              fontFamily: "sans-serif",
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "#aaa", fontWeight: 600, marginBottom: 4 }}>
              OPPSUMMERING
            </div>
            <div>· Wilmer + Oscar starter på benken</div>
            <div>· 2 bytter ved 10', 20' og 30' = 6 totalt</div>
            <div>
              · Alle felt-spillere:{" "}
              <span style={{ color: "#fff", fontWeight: 700 }}>30 min</span>{" "}
              nøyaktig
            </div>
            <div>
              · Nils Christian (keeper):{" "}
              <span style={{ color: "#f5a623", fontWeight: 700 }}>40 min</span>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
