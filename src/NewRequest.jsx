import { useState } from "react";

const cardS = {
  background: "rgba(26,37,64,0.6)",
  border: "1px solid rgba(201,168,76,0.20)",
  borderRadius: "16px",
  padding: "22px",
  backdropFilter: "blur(14px)",
  marginBottom: "16px"
};

const labelS = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  color: "#8B9AB5",
  letterSpacing: ".06em",
  textTransform: "uppercase",
  marginBottom: "6px"
};

const inputS = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: "9px",
  border: "1px solid rgba(255,255,255,0.07)",
  background: "rgba(26,37,64,.5)",
  color: "#F4F6FB",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box"
};

const taS = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: "9px",
  border: "1px solid rgba(255,255,255,0.07)",
  background: "rgba(26,37,64,.5)",
  color: "#F4F6FB",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13px",
  outline: "none",
  resize: "vertical",
  minHeight: "80px",
  boxSizing: "border-box"
};

const types = ["Procurement","Leave","Travel","IT Asset","Finance","HR","Facility","Other"];

const steps = [
  { n: "check", lbl: "Type" },
  { n: "2", lbl: "Details" },
  { n: "3", lbl: "Documents" },
  { n: "4", lbl: "Submit" }
];

export default function NewRequest({ go, toast }) {
  const [sel, setSel] = useState(0);
  
  const submit = () => {
    toast("Request submitted! Auto-routing to Team Lead...", "ok");
    setTimeout(() => go("approvals"), 1200);
  };

  const containerStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "24px",
    boxSizing: "border-box",
  };

  const scrollableContentStyle = {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    minHeight: 0,
    paddingRight: "4px", // Small padding for scrollbar
  };

  return (
    <div style={containerStyle}>
      {/* Fixed Header */}
      <div style={{ marginBottom: "20px", flexShrink: 0 }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "20px", fontWeight: 800, color: "#F4F6FB", margin: 0 }}>
          New Request
        </h2>
        <p style={{ fontSize: "12px", color: "#8B9AB5", marginTop: "4px" }}>
          Submit and it will be auto-routed to the correct approval chain
        </p>
      </div>

      {/* Scrollable Content */}
      <div style={scrollableContentStyle}>
        {/* Steps Progress */}
        <div style={{ display: "flex", marginBottom: "24px", alignItems: "center" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : undefined }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  flexShrink: 0,
                  ...(i === 0 ? {
                    background: "linear-gradient(135deg,#C9A84C,#E4C97A)",
                    color: "#0A0F1E"
                  } : {
                    background: "rgba(139,154,181,.15)",
                    color: "#8B9AB5",
                    border: "1px solid rgba(255,255,255,0.07)"
                  })
                }}>
                  {s.n === "check" ? "✓" : s.n}
                </div>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  marginLeft: "7px",
                  whiteSpace: "nowrap",
                  color: i === 0 ? "#E4C97A" : "#8B9AB5"
                }}>
                  {s.lbl}
                </span>
              </div>
              {i < 3 && (
                <div style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.07)",
                  margin: "0 12px",
                  minWidth: "24px"
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Request Type Selection */}
        <div style={cardS}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "14px", fontWeight: 700, color: "#F4F6FB", marginBottom: "16px" }}>
            Select Request Type
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
            {types.map((t, i) => (
              <div
                key={i}
                style={{
                  background: sel === i ? "rgba(201,168,76,0.15)" : "rgba(26,37,64,.5)",
                  border: sel === i ? "1.5px solid #C9A84C" : "1.5px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  padding: "16px 12px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all .18s"
                }}
                onClick={() => {
                  setSel(i);
                  toast("Selected: " + t, "info");
                }}
              >
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "12px", fontWeight: 700, color: "#F4F6FB" }}>
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-route Preview */}
        <div style={{
          background: "rgba(201,168,76,0.15)",
          border: "1px solid rgba(201,168,76,0.20)",
          borderRadius: "10px",
          padding: "14px 18px",
          marginBottom: "16px"
        }}>
          <div style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: "10px"
          }}>
            Auto-route preview · Procurement · Amount &gt; Rs.1L
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { lbl: "Team Lead", bg: "rgba(74,222,128,0.12)", c: "#4ADE80" },
              null,
              { lbl: "IT Manager", bg: "rgba(74,222,128,0.12)", c: "#4ADE80" },
              null,
              { lbl: "Finance (You)", bg: "linear-gradient(135deg,#C9A84C,#E4C97A)", c: "#0A0F1E" },
              null,
              { lbl: "CEO", bg: "rgba(26,37,64,0.6)", c: "#8B9AB5", b: "1px solid rgba(255,255,255,0.07)" }
            ].map((n, i) => (
              n === null
                ? <span key={i} style={{ color: "#8B9AB5", fontSize: "11px" }}>→</span>
                : <div
                    key={i}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "7px",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: n.bg,
                      color: n.c,
                      border: n.b
                    }}
                  >
                    {n.lbl}
                  </div>
            ))}
          </div>
        </div>

        {/* Request Details */}
        <div style={cardS}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "14px", fontWeight: 700, color: "#F4F6FB", marginBottom: "16px" }}>
            Request Details
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelS}>Title</label>
              <input type="text" defaultValue="Laptop & Peripherals Purchase" style={inputS} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelS}>Priority</label>
              <select style={inputS} defaultValue="High">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelS}>Department</label>
              <select style={inputS} defaultValue="IT Department">
                <option>IT Department</option>
                <option>Finance</option>
                <option>HR</option>
                <option>Sales</option>
              </select>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelS}>Amount (Rs.)</label>
              <input type="number" defaultValue="185000" style={inputS} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelS}>Required By</label>
              <input type="date" defaultValue="2024-03-15" style={inputS} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelS}>Vendor</label>
              <input type="text" defaultValue="Dell Technologies India" style={inputS} />
            </div>
          </div>
          <div style={{ marginBottom: "14px" }}>
            <label style={labelS}>Justification</label>
            <textarea
              defaultValue="Need 5 Dell Latitude laptops for new developer hires joining March. Current laptops are 4+ years old. Budget under Q1 IT Capex."
              style={taS}
            />
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div style={{ display: "flex", gap: "10px", marginTop: "16px", paddingBottom: "8px" }}>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#8B9AB5"
            }}
            onClick={() => toast("Saved as draft", "info")}
          >
            💾 Save Draft
          </button>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              borderRadius: "9px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              border: "none",
              background: "linear-gradient(135deg,#C9A84C,#E4C97A)",
              color: "#0A0F1E"
            }}
            onClick={submit}
          >
            Submit Request →
          </button>
        </div>
      </div>
    </div>
  );
}