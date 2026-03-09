import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  homeContainer: {
    padding: "24px",
  },
  homeHero: {
    background: "linear-gradient(135deg,#1A2540,#111827)",
    border: "1px solid rgba(201,168,76,0.20)",
    borderRadius: "20px",
    padding: "52px 56px",
    position: "relative",
    overflow: "hidden",
    marginBottom: "24px",
  },
  heroEyebrow: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "#C9A84C",
    marginBottom: "18px",
  },
  heroH1: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(30px,3.5vw,50px)",
    fontWeight: 800,
    color: "#F4F6FB",
    lineHeight: 1.08,
    letterSpacing: "-.025em",
    marginBottom: "16px",
    position: "relative",
    zIndex: 1,
    maxWidth: "520px",
  },
  heroSub: {
    fontSize: "15px",
    color: "#8B9AB5",
    maxWidth: "420px",
    lineHeight: 1.7,
    marginBottom: "30px",
    position: "relative",
    zIndex: 1,
  },
  heroBtns: {
    display: "flex",
    gap: "12px",
    position: "relative",
    zIndex: 1,
  },
  heroStatsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "14px",
    marginBottom: "24px",
  },
  statCard: {
    background: "rgba(26,37,64,0.6)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "13px",
    padding: "18px 20px",
    backdropFilter: "blur(14px)",
    transition: "border-color .2s",
    cursor: "default",
  },
  statNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "26px",
    fontWeight: 800,
    color: "#E4C97A",
    lineHeight: 1,
  },
  statLbl: { fontSize: "11px", color: "#8B9AB5", marginTop: "4px" },
  statChangeUp: { fontSize: "11px", fontWeight: 600, marginTop: "6px", color: "#4ADE80" },
  statChangeDn: { fontSize: "11px", fontWeight: 600, marginTop: "6px", color: "#F87171" },
  howRow: {
    display: "grid",
    gridTemplateColumns: "repeat(5,1fr)",
    gap: "10px",
    marginBottom: "24px",
  },
  howItem: {
    background: "rgba(26,37,64,0.6)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "16px 12px",
    textAlign: "center",
    backdropFilter: "blur(12px)",
  },
  howN: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#C9A84C,#E4C97A)",
    color: "#0A0F1E",
    fontWeight: 700,
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 9px",
    boxShadow: "0 4px 12px rgba(201,168,76,0.25)",
  },
  howT: { fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 700, color: "#F4F6FB", marginBottom: "3px" },
  howD: { fontSize: "11px", color: "#8B9AB5" },
  homeGrid: { display: "grid", gridTemplateColumns: "3fr 2fr", gap: "16px", marginBottom: "16px" },
  homeGridB: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" },
  card: {
    background: "rgba(26,37,64,0.6)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "22px",
    backdropFilter: "blur(14px)",
  },
  cardGold: {
    background: "rgba(26,37,64,0.6)",
    border: "1px solid rgba(201,168,76,0.20)",
    borderRadius: "16px",
    padding: "22px",
    backdropFilter: "blur(14px)",
  },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  cardTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "14px",
    fontWeight: 700,
    color: "#F4F6FB",
    margin: 0,
  },
  flowList: { display: "flex", flexDirection: "column" },
  flItem: { display: "flex", alignItems: "flex-start", gap: "12px", position: "relative" },
  flDotDone: {
    width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px",
    border: "2px solid", marginBottom: "22px",
    background: "rgba(74,222,128,0.12)", borderColor: "#4ADE80", color: "#4ADE80",
  },
  flDotNow: {
    width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px",
    border: "2px solid", marginBottom: "22px",
    background: "rgba(45,212,191,0.10)", borderColor: "#2DD4BF", color: "#2DD4BF",
    animation: "pulseRing 2s infinite",
  },
  flDotWait: {
    width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px",
    border: "2px solid", marginBottom: "22px",
    background: "rgba(139,154,181,0.08)", borderColor: "rgba(139,154,181,0.25)", color: "#8B9AB5",
  },
  flName: { fontSize: "13px", fontWeight: 600, color: "#F4F6FB" },
  flStDone: { fontSize: "11px", fontWeight: 500, marginTop: "2px", color: "#E4C97A" },
  flStNow: { fontSize: "11px", fontWeight: 500, marginTop: "2px", color: "#2DD4BF" },
  flStWait: { fontSize: "11px", fontWeight: 500, marginTop: "2px", color: "#8B9AB5" },
  actList: { display: "flex", flexDirection: "column", gap: "10px" },
  actRow: { display: "flex", gap: "10px", alignItems: "flex-start" },
  actIc: { width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" },
  actMsg: { fontSize: "12px", color: "#F4F6FB" },
  actTime: { fontSize: "10px", color: "#8B9AB5", marginTop: "1px" },
  featMini: {
    background: "rgba(26,37,64,0.6)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "20px",
    transition: "all .22s",
    backdropFilter: "blur(12px)",
    cursor: "pointer",
  },
  fmIc: { fontSize: "22px", marginBottom: "10px" },
  fmT: { fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700, color: "#F4F6FB", marginBottom: "5px" },
  fmD: { fontSize: "12px", color: "#8B9AB5", lineHeight: 1.6 },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px",
    borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", border: "none",
    background: "linear-gradient(135deg,#C9A84C,#E4C97A)", color: "#0A0F1E",
    transition: "all .2s",
  },
  btnOutline: {
    display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px",
    borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "transparent", border: "1px solid rgba(201,168,76,0.20)", color: "#F4F6FB",
    transition: "all .2s",
  },
  btnSuccess: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px 18px",
    borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,.2)", color: "#4ADE80",
    transition: "all .2s", flex: 1,
  },
  btnDanger: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px 18px",
    borderRadius: "9px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,.2)", color: "#F87171",
    transition: "all .2s", flex: 1,
  },
  btnGhost: {
    display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px",
    borderRadius: "9px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    background: "transparent", border: "1px solid rgba(255,255,255,0.07)", color: "#8B9AB5",
    transition: "all .2s",
  },
  pillReview: {
    display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 9px",
    borderRadius: "6px", fontSize: "11px", fontWeight: 600,
    color: "#2DD4BF", background: "rgba(45,212,191,0.10)",
  },
  sectionLabel: {
    fontFamily: "'Syne', sans-serif", fontSize: "10px", fontWeight: 700,
    letterSpacing: ".16em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "12px",
  },
};

export default function Home() {
  const [hoveredFeat, setHoveredFeat] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={styles.homeContainer}>
      <style>{`
        @keyframes pulseRing {
          0%,100%{box-shadow:0 0 0 0 rgba(45,212,191,.35);}
          50%{box-shadow:0 0 0 7px rgba(45,212,191,0);}
        }
      `}</style>

      {/* HERO */}
      <div style={styles.homeHero}>
        <div style={{
          content: '', position: "absolute", right: "-60px", top: "-60px",
          width: "340px", height: "340px", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(201,168,76,0.18),transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          content: '', position: "absolute", bottom: "-40px", left: "40%",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(45,212,191,0.10),transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={styles.heroEyebrow}>Online Approval Hierarchy System</div>
        <h1 style={styles.heroH1}>
          Approvals made<br />
          <span style={{ color: "#C9A84C" }}>fast,</span> clear<br />
          &amp; <span style={{ color: "#2DD4BF" }}>traceable.</span>
        </h1>
        <p style={styles.heroSub}>
          One platform for all your organization's approval workflows — from leave to procurement, fully automated.
        </p>
        <div style={styles.heroBtns}>
          <button style={styles.btnPrimary} onClick={() => navigate("/dashboard")}>Open Dashboard →</button>
          <button style={styles.btnOutline} onClick={() => navigate("/new-request")}>+ New Request</button>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={styles.heroStatsRow}>
        <div style={styles.statCard}>
          <div style={styles.statNum}>24</div>
          <div style={styles.statLbl}>Pending Approvals</div>
          <div style={styles.statChangeUp}>▲ 3 new today</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>186</div>
          <div style={styles.statLbl}>Approved This Month</div>
          <div style={styles.statChangeUp}>▲ 12%</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>4.2h</div>
          <div style={styles.statLbl}>Avg Turnaround</div>
          <div style={styles.statChangeUp}>▼ 1.8h faster</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>6.3%</div>
          <div style={styles.statLbl}>Rejection Rate</div>
          <div style={styles.statChangeDn}>▲ 0.5%</div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={styles.howRow}>
        {[
          { n: "1", t: "Submit", d: "Fill form & attach docs" },
          { n: "2", t: "Auto-Route", d: "System routes to correct chain" },
          { n: "3", t: "Review", d: "Approvers act on requests" },
          { n: "4", t: "Track", d: "Real-time status updates" },
          { n: "5", t: "Audit", d: "Full history & compliance" },
        ].map((item) => (
          <div key={item.n} style={styles.howItem}>
            <div style={styles.howN}>{item.n}</div>
            <div style={styles.howT}>{item.t}</div>
            <div style={styles.howD}>{item.d}</div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div style={styles.homeGrid}>
        {/* Live Approval Flow */}
        <div style={styles.cardGold}>
          <div style={styles.cardHead}>
            <span style={styles.cardTitle}>Live Approval Flow</span>
            <span style={styles.pillReview}>PR-00892 · ₹1,85,000</span>
          </div>
          <div style={styles.flowList}>
            <div style={styles.flItem}>
              <div style={styles.flDotDone}>✓</div>
              <div>
                <div style={styles.flName}>Arun Kumar — Team Lead</div>
                <div style={styles.flStDone}>✓ Approved · 3h ago</div>
              </div>
            </div>
            <div style={styles.flItem}>
              <div style={styles.flDotDone}>✓</div>
              <div>
                <div style={styles.flName}>Priya Sharma — IT Manager</div>
                <div style={styles.flStDone}>✓ Approved · 1h ago</div>
              </div>
            </div>
            <div style={styles.flItem}>
              <div style={styles.flDotNow}>●</div>
              <div>
                <div style={styles.flName}>Ravi Pillai — Finance Controller</div>
                <div style={styles.flStNow}>⟳ Awaiting your review</div>
              </div>
            </div>
            <div style={styles.flItem}>
              <div style={styles.flDotWait}>○</div>
              <div>
                <div style={styles.flName}>Meena Iyer — CEO</div>
                <div style={styles.flStWait}>Pending</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <button style={styles.btnSuccess} onClick={() => navigate("/approvals")}>✓ Approve</button>
            <button style={styles.btnDanger} onClick={() => navigate("/approvals")}>✕ Reject</button>
            <button style={styles.btnGhost} onClick={() => navigate("/approvals")}>All →</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Recent Activity</div>
          <div style={{ ...styles.actList, marginTop: "16px" }}>
            {[
              { ic: "✓", bg: "rgba(74,222,128,0.12)", msg: <span>Priya approved <b>PR-00889</b></span>, time: "2 min ago" },
              { ic: "📤", bg: "rgba(45,212,191,0.10)", msg: <span>New: <b>IT-00068</b> submitted</span>, time: "14 min ago" },
              { ic: "✕", bg: "rgba(248,113,113,0.12)", msg: "IT-00067 rejected by Ravi", time: "1h ago" },
              { ic: "⏰", bg: "rgba(252,211,77,0.12)", msg: <span>SLA breach: <b>TR-00125</b></span>, time: "2h ago" },
              { ic: "✓", bg: "rgba(74,222,128,0.12)", msg: "LV-00341 fully approved", time: "4h ago" },
            ].map((a, i) => (
              <div key={i} style={styles.actRow}>
                <div style={{ ...styles.actIc, background: a.bg }}>{a.ic}</div>
                <div>
                  <div style={styles.actMsg}>{a.msg}</div>
                  <div style={styles.actTime}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CORE FEATURES */}
      <div style={styles.sectionLabel}>Core Features</div>
      <div style={styles.homeGridB}>
        {[
          { ic: "🏗️", t: "Configurable Hierarchy", d: "Define unlimited approval levels with department-specific routing." },
          { ic: "🔔", t: "Smart Notifications", d: "Email & SMS alerts with automatic SLA escalation." },
          { ic: "📊", t: "Analytics Dashboard", d: "TAT analysis, bottleneck detection & compliance reports." },
          { ic: "🔒", t: "Role-Based Access", d: "Each user sees only what their role permits." },
          { ic: "⚡", t: "Delegation & Proxy", d: "Auto-delegate during leave — zero workflow interruption." },
          { ic: "🔗", t: "ERP Integration", d: "REST API connectors for SAP, Oracle, Zoho & Tally." },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              ...styles.featMini,
              ...(hoveredFeat === i
                ? { borderColor: "rgba(201,168,76,0.20)", transform: "translateY(-2px)", boxShadow: "0 8px 28px rgba(0,0,0,.25)" }
                : {}),
            }}
            onMouseEnter={() => setHoveredFeat(i)}
            onMouseLeave={() => setHoveredFeat(null)}
          >
            <div style={styles.fmIc}>{f.ic}</div>
            <div style={styles.fmT}>{f.t}</div>
            <div style={styles.fmD}>{f.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
