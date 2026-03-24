import { useState, useEffect, useRef, useLayoutEffect } from "react";

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const TOWER_LOGO = "data:image/jpeg;base64,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";
const QR_CODE = "data:image/jpeg;base64,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";
const GOLD = "#292854";
const DARK = "#1a1a2e";
const CLIENT_ID = "700317661922-usjieegsea5jdo3bi0g6qatekvp4j37d.apps.googleusercontent.com";
const FOLDER_ID = "1e791rdoNoUsqu6faUW-zidBb5TAchBLK";
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const FRONT_MAX = 9;
const TOTAL_MAX = 9;

// ─── Auto-shrink hook ─────────────────────────────────────────────────────────
function useAutoShrink(outerRef, innerRef) {
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    inner.style.transform = "";
    inner.style.width = "";
    const avail = outer.clientHeight;
    const nat = inner.scrollHeight;
    if (nat > avail * 1.005) {
      const s = avail / nat;
      inner.style.transform = `scale(${s.toFixed(4)})`;
      inner.style.transformOrigin = "top left";
      inner.style.width = `${(100 / s).toFixed(2)}%`;
    }
  });
}

// ─── Date utilities ───────────────────────────────────────────────────────────
// Strip leading day name and any ordinal suffixes → clean parseable date string
function cleanDateStr(dateStr) {
  if (!dateStr) return "";
  return dateStr
    .replace(/^[A-Za-z]+,\s*/, "")
    .replace(/(\d+)(st|nd|rd|th)/, "$1");
}

// Format a Date object as "Month D, YYYY"
function formatMonthDayYear(d) {
  const month = d.toLocaleDateString("en-US", { month: "long" });
  return `${month} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatDateOrdinal(dateStr) {
  // Legacy stub — kept so nothing breaks if called; now just returns clean Month D, YYYY
  if (!dateStr) return dateStr;
  try {
    const d = new Date(cleanDateStr(dateStr));
    if (isNaN(d.getTime())) return dateStr;
    return formatMonthDayYear(d);
  } catch { return dateStr; }
}

function getNextSunday(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(cleanDateStr(dateStr));
    if (isNaN(d.getTime())) return null;
    const daysUntil = d.getDay() === 0 ? 7 : 7 - d.getDay();
    d.setDate(d.getDate() + daysUntil);
    return formatMonthDayYear(d);
  } catch {
    return null;
  }
}

// ─── First-Sunday detection + default response copy ───────────────────────────
function isFirstSundayOfMonth(dateStr) {
  if (!dateStr) return false;
  try {
    const d = new Date(cleanDateStr(dateStr));
    if (isNaN(d.getTime())) return false;
    return d.getDate() <= 7;
  } catch { return false; }
}

function getDefaultResponseInstructions(sundayDateStr) {
  if (isFirstSundayOfMonth(sundayDateStr)) {
    return `The Lord's Supper
⛪ First Baptist celebrates the Lord's Supper on the First Sunday of the month, after the sermon and a Communion song.
🔔 There is no children's church on the first Sunday of the month, instead we celebrate intergenerationally.
✏️ Children's bulletins are available at each entrance.
🫓 If you are a Baptized believer, you are welcome to partake! This is the Lord's Table, not our own.
✝️ But if this does not describe you, or your home church or Christian tradition asks you not to partake at other churches, you may cross your arms over yourself and instead receive a blessing.
❤️‍🩹 On your way out, our Deacons will collect a mercy offering to benefit the needy in our community.`;
  }
  return `Ways to Respond
🎼 During the song of response, you can respond as you feel led.
✉️ An offering to support the work the Lord is doing at FBCM will be taken during this song by passing the offering plates. There are also black offering boxes by either main entrance.
At this time, you may also go forward to:
   🙏 Pray at the steps, laying down your concerns before God.
   ❤️ To pray with a Pastor or a deacon about any concern on your heart.
   ✝️ To share your decision to follow Jesus in faith, baptism, or to seek church membership.
📣 This song of response is a time for us to respond to the presence and promise of God, and to praise and proclaim his name.`;
}

// ─── Church logo ──────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px" }}>
      <img src={TOWER_LOGO} alt="FBC Muncie" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
    </div>
  );
}

// ─── Announcement item ────────────────────────────────────────────────────────
function AnnouncementItem({ item, isLast }) {
  return (
    <div style={{
      marginBottom: "7px", paddingBottom: "7px",
      borderBottom: isLast ? "none" : "0.5px solid #eee",
    }}>
      <div style={{ fontSize: "12px", fontWeight: "bold", color: DARK, lineHeight: 1.25, marginBottom: "1.5px" }}>
        {item.title}
        {item.date && (
          <span style={{ fontWeight: "normal", color: GOLD, marginLeft: "5px", fontSize: "11px" }}>
            {item.date}
          </span>
        )}
      </div>
      {item.description && <div style={{ fontSize: "10.5px", color: "#333", lineHeight: 1.45 }}>{item.description}</div>}
      {item.location && <div style={{ fontSize: "9px", color: "#666", marginTop: "2px" }}>📍 {item.location}</div>}
      {item.registration && <div style={{ fontSize: "9px", color: "#555", marginTop: "1.5px" }}>→ {item.registration}</div>}
    </div>
  );
}

// ─── Sermon notes ─────────────────────────────────────────────────────────────
function SermonNotes({ responseInstructions }) {
  const heading = (label) => (
    <div style={{
      fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
      color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold",
      marginBottom: "3px", marginTop: "9px",
    }}>{label}</div>
  );
  const lines = (count) =>
    Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ borderBottom: "0.5px solid #ccc", height: "18px", marginBottom: "2px" }} />
    ));
  const renderResponse = (text) => {
    if (!text) return null;
    const allLines = text.split("\n");
    const headingText = allLines[0] || "";
    const items = allLines.slice(1).filter(l => l.trim());
    return (
      <div style={{ marginTop: "2px" }}>
        <div style={{
          fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
          color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold",
          marginBottom: "3px", marginTop: "9px",
        }}>{headingText}</div>
        {items.map((line, i) => {
          const isIndented = /^\s+/.test(line);
          return (
            <div key={i} style={{
              fontSize: "9px", color: "#333", lineHeight: 1.5,
              marginBottom: "2.5px",
              ...(isIndented ? { paddingLeft: "12px" } : {}),
            }}>{line.trim()}</div>
          );
        })}
      </div>
    );
  };
  return (
    <div style={{ marginTop: "6px", paddingTop: "2px" }}>
      {heading("Main Point")}{lines(2)}
      {heading("Connections")}{lines(5)}
      {heading("Prayer Response")}{lines(5)}
      {renderResponse(responseInstructions)}
    </div>
  );
}

// ─── Connect footer ───────────────────────────────────────────────────────────
function ConnectFooter() {
  const bold = (t) => <span style={{ fontWeight: "bold" }}>{t}</span>;
  return (
    <div style={{ borderTop: `1.5px solid ${GOLD}`, paddingTop: "8px", marginTop: "4px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
            color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold", marginBottom: "5px",
          }}>Stay Connected</div>
          <div style={{ fontSize: "8.5px", color: "#333", lineHeight: 1.8, fontFamily: "Arial, sans-serif" }}>
            <div>info@fbcmuncie.org  |  765-284-7749</div>
            <div>309 East Adams Street, Muncie, IN 47305</div>
            <div>{bold("New Here?")} Visit bit.ly/FBCMnew</div>
            <div>{bold("Socials:")} linktr.ee/fbcmuncie</div>
          </div>
        </div>
        <img src={QR_CODE} alt="QR Code" style={{ height: "54px", width: "54px", objectFit: "contain", flexShrink: 0 }} />
      </div>
      <div style={{ borderTop: "0.5px solid #ddd", marginTop: "5px", paddingTop: "4px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "7px", color: "#999", fontFamily: "Arial, sans-serif" }}>fbcmuncie.org</span>
        <span style={{ fontSize: "7px", color: "#999", fontFamily: "Arial, sans-serif" }}>Church Center App</span>
      </div>
    </div>
  );
}

// ─── Front half-sheet ─────────────────────────────────────────────────────────
function HalfSheetFront({ data, onCutoffChange }) {
  const outerRef = useRef(null);
  const annRefs = useRef([]);
  const [cutoffIdx, setCutoffIdx] = useState(null);

  const announcements = data?.announcements || [];
  annRefs.current = new Array(announcements.length);

  useLayoutEffect(() => {
    if (!outerRef.current) return;
    const outerRect = outerRef.current.getBoundingClientRect();
    const availableBottom = outerRect.bottom - 36; // approx footer height
    let cutoff = null;
    for (let i = 0; i < annRefs.current.length; i++) {
      const el = annRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.bottom > availableBottom) { cutoff = i; break; }
    }
    if (cutoff !== cutoffIdx) setCutoffIdx(cutoff);
    if (onCutoffChange) onCutoffChange(cutoff !== null ? cutoff : announcements.length);
  });

  return (
    <div ref={outerRef} style={{
      width: "5.5in", height: "8.5in", backgroundColor: "white",
      boxSizing: "border-box", fontFamily: "'Georgia', serif",
      color: DARK, overflow: "hidden", position: "relative",
    }}>
      <div style={{
        padding: "0.38in 0.42in 0.32in", boxSizing: "border-box",
        display: "flex", flexDirection: "column", height: "100%",
      }}>
        <Logo />
        <div style={{ textAlign: "center", marginBottom: "4px" }}>
          <div style={{ fontSize: "11px", fontWeight: "bold", fontFamily: "Arial, sans-serif", color: DARK, letterSpacing: "0.04em" }}>
            News from the Wednesday Weekly
          </div>
          <div style={{ fontSize: "8.5px", color: "#666", fontFamily: "Arial, sans-serif", marginTop: "2px", fontStyle: "italic" }}>
            {data?.date ? cleanDateStr(data.date) : ""}
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: "8px", color: "#444", fontFamily: "Arial, sans-serif", lineHeight: 1.6, marginBottom: "6px", padding: "4px 8px", background: "#fafaf7", borderRadius: "3px", border: "0.5px solid #e8e0d0" }}>
          View the full WW anytime:<br/>
          Online: <span style={{ fontWeight: "bold", color: DARK }}>bit.ly/fbc-ww</span>
          {"  ·  "}on the <span style={{ fontWeight: "bold", color: DARK }}>Church Center App</span> — available on your phone's app store.
        </div>
        <div style={{ borderTop: `1.5px solid ${GOLD}`, marginBottom: "10px" }} />

        <div style={{ fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold", borderBottom: "0.5px solid #ddd", paddingBottom: "3px", marginBottom: "8px" }}>
          Announcements
        </div>
        <div>
          {announcements.map((item, i) => (
            <div key={i} ref={el => { annRefs.current[i] = el; }}>
              {cutoffIdx !== null && i === cutoffIdx && (
                <div style={{
                  borderTop: "1.5px dashed #c0392b", color: "#c0392b",
                  fontSize: "7px", textAlign: "center", padding: "2px 0",
                  marginBottom: "3px", fontFamily: "Arial, sans-serif",
                  letterSpacing: "0.08em", fontWeight: "bold",
                }}>
                  ✂ PAGE BOUNDARY — items below will not print
                </div>
              )}
              <AnnouncementItem key={i} item={item} isLast={i === announcements.length - 1} />
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />

        <div style={{ borderTop: "0.5px solid #ddd", paddingTop: "5px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "7px", color: "#999", fontFamily: "Arial, sans-serif" }}>fbcmuncie.org</div>
          <div style={{ fontSize: "7px", color: "#999", fontFamily: "Arial, sans-serif" }}>Church Center App</div>
        </div>
      </div>
    </div>
  );
}

// ─── Back half-sheet ──────────────────────────────────────────────────────────
function HalfSheetBack({ data, responseInstructions, backDate }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  useAutoShrink(outerRef, innerRef);
  const back = (data?.announcements || []).slice(FRONT_MAX, TOTAL_MAX);
  return (
    <div ref={outerRef} style={{
      width: "5.5in", height: "8.5in", backgroundColor: "white",
      boxSizing: "border-box", fontFamily: "'Georgia', serif",
      color: DARK, overflow: "hidden",
    }}>
      <div ref={innerRef} style={{
        padding: "0.38in 0.42in 0.32in", boxSizing: "border-box",
        display: "flex", flexDirection: "column", height: "100%",
      }}>
        <Logo />
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", fontWeight: "bold", fontFamily: "Arial, sans-serif", color: DARK, letterSpacing: "0.04em" }}>
            Sunday Worship at FBCM
          </div>
          <div style={{ fontSize: "9.5px", fontStyle: "italic", color: GOLD, fontFamily: "Arial, sans-serif", marginTop: "2px", fontWeight: "600", letterSpacing: "0.02em" }}>
            "Praise &amp; Proclaim" — Isaiah 12:4
          </div>
          <div style={{ fontSize: "8.5px", color: "#666", fontFamily: "Arial, sans-serif", marginTop: "2px", fontStyle: "italic" }}>
            {backDate || getNextSunday(data?.date) || ""}
          </div>
        </div>
        <div style={{ borderTop: `1.5px solid ${GOLD}`, marginBottom: "10px" }} />

        {data?.sermon && (
          <div style={{
            background: "#fdf8f0", border: `1px solid ${GOLD}`,
            borderLeft: `3.5px solid ${GOLD}`, borderRadius: "3px",
            padding: "7px 9px", marginBottom: "10px",
          }}>
            {data.sermon.series && (
              <div style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold", marginBottom: "2px" }}>
                {data.sermon.series}
              </div>
            )}
            {data.sermon.title && (
              <div style={{ fontSize: "13px", fontWeight: "bold", color: DARK, lineHeight: 1.25, marginBottom: "2px" }}>
                {"\u201c"}{data.sermon.title}{"\u201d"}
              </div>
            )}
            {data.sermon.scripture && (
              <div style={{ fontSize: "10.5px", color: "#555", fontStyle: "italic", marginBottom: data.sermon.teaser ? "3px" : 0 }}>
                {data.sermon.scripture}
              </div>
            )}
            {data.sermon.teaser && (
              <div style={{ fontSize: "10.5px", color: "#444", lineHeight: 1.4 }}>{data.sermon.teaser}</div>
            )}
          </div>
        )}

        {back.length > 0 && (
          <>
            <div style={{ fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold", borderBottom: "0.5px solid #ddd", paddingBottom: "3px", marginBottom: "8px" }}>
              Announcements (cont.)
            </div>
            <div>
              {back.map((item, i) => (
                <AnnouncementItem key={i} item={item} isLast={i === back.length - 1} />
              ))}
            </div>
          </>
        )}

        <SermonNotes responseInstructions={responseInstructions} />
        <div style={{ flex: 1 }} />
        <ConnectFooter />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HalfSheetGenerator() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [driveStatus, setDriveStatus] = useState("idle");
  const [wordStatus, setWordStatus] = useState("idle");
  const [docStatus, setDocStatus] = useState("idle");
  const [editMode, setEditMode] = useState(false);
  const [responseInstructions, setResponseInstructions] = useState("");
  const [responseMode, setResponseMode] = useState("ways_to_respond"); // "lords_supper" | "ways_to_respond"
  const [backDate, setBackDate] = useState("");
  const [frontCutoff, setFrontCutoff] = useState(null);

  // ─── Edit helpers (update data in-place → preview refreshes live) ─────────
  function startOver() { setData(null); setEditMode(false); setError(""); setResponseInstructions(""); setBackDate(""); setResponseMode("ways_to_respond"); }
  function setTopDate(val) {
    setData(d => ({ ...d, date: val }));
    const sunday = getNextSunday(val);
    const newMode = isFirstSundayOfMonth(sunday) ? "lords_supper" : "ways_to_respond";
    setResponseMode(newMode);
    setResponseInstructions(getDefaultResponseInstructions(sunday));
    // Also update backDate to match new derived Sunday if user hasn't overridden it
    if (sunday) setBackDate(sunday);
  }
  function setSermonField(field, val) {
    setData(d => ({ ...d, sermon: { ...(d.sermon || {}), [field]: val || null } }));
  }
  function setAnnField(i, field, val) {
    setData(d => { const a = [...d.announcements]; a[i] = { ...a[i], [field]: val || null }; return { ...d, announcements: a }; });
  }
  function addAnn() {
    setData(d => {
      if (d.announcements.length >= TOTAL_MAX) return d;
      return { ...d, announcements: [...d.announcements, { title: "New Announcement", date: null, description: "", location: null, registration: null }] };
    });
  }
  function removeAnn(i) { setData(d => ({ ...d, announcements: d.announcements.filter((_, idx) => idx !== i) })); }
  function moveAnn(i, dir) {
    setData(d => {
      const a = [...d.announcements]; const j = i + dir;
      if (j < 0 || j >= a.length) return d;
      [a[i], a[j]] = [a[j], a[i]]; return { ...d, announcements: a };
    });
  }

  // GSI library removed — OAuth handled via Electron IPC + PKCE loopback flow

  function buildTwoColHTML(d, wordMode, ri, bd) {
    const items = (d.announcements || []);
    const front = items.slice(0, FRONT_MAX);
    const back  = items.slice(FRONT_MAX, TOTAL_MAX);
    const hasBack = back.length > 0;

    // ── Shared helpers ──────────────────────────────────────────────────────
    const annoItem = (item, isLast) => `
      <div style="margin-bottom:5pt;padding-bottom:5pt;${isLast ? "" : "border-bottom:0.5pt solid #eee;"}">
        <div style="font-size:12pt;font-weight:bold;color:#1a1a2e;line-height:1.25;">
          ${item.title}${item.date ? `<span style="font-weight:normal;color:#292854;font-size:11pt;"> &nbsp;${item.date}</span>` : ""}
        </div>
        ${item.description ? `<div style="font-size:10.5pt;color:#333;line-height:1.4;">${item.description}</div>` : ""}
        ${item.location   ? `<div style="font-size:9pt;color:#666;margin-top:1.5pt;">&#128205; ${item.location}</div>` : ""}
        ${item.registration ? `<div style="font-size:9pt;color:#555;margin-top:1.5pt;">&#8594; ${item.registration}</div>` : ""}
      </div>`;

    const sectionHead = (label) =>
      `<div style="font-size:8pt;letter-spacing:0.12em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;border-bottom:0.5pt solid #ddd;padding-bottom:3pt;margin-bottom:7pt;">${label}</div>`;

    const noteHead = (label) =>
      `<div style="font-size:10pt;letter-spacing:0.12em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-top:6pt;margin-bottom:2pt;">${label}</div>`;

    const noteLines = (n) =>
      Array.from({length:n}).map(() =>
        `<div style="border-bottom:0.5pt solid #ccc;height:14pt;margin-bottom:1pt;display:block;">&nbsp;</div>`
      ).join("");

    // ── Logo: table-centered so Google Docs respects it ─────────────────────
    const logoHtml = `
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:5pt;"><tr>
        <td style="text-align:center;vertical-align:middle;">
          <img src="${TOWER_LOGO}" height="54" style="height:54pt;width:auto;vertical-align:middle;" alt=""/>
        </td>
      </tr></table>`;

    const resolvedBackDate = bd || getNextSunday(d.date);
    const frontHeadingHtml = `
      <div style="text-align:center;margin-bottom:4pt;">
        <div style="font-size:11pt;font-weight:bold;font-family:Arial,sans-serif;color:#1a1a2e;letter-spacing:0.04em;">News from the Wednesday Weekly</div>
        <div style="font-size:8.5pt;color:#666;font-family:Arial,sans-serif;margin-top:2pt;font-style:italic;">${d.date ? d.date.replace(/^[A-Za-z]+,\s*/, "").replace(/(\d+)(st|nd|rd|th)/, "$1") : ""}</div>
      </div>
      <div style="text-align:center;font-size:8pt;color:#444;font-family:Arial,sans-serif;line-height:1.6;margin-bottom:5pt;padding:3pt 6pt;background:#fafaf7;border:0.5pt solid #e8e0d0;">
        View the full WW anytime:&nbsp;&nbsp;Online: <strong>bit.ly/fbc-ww</strong>&nbsp;&nbsp;&middot;&nbsp;&nbsp;on the <strong>Church Center App</strong> &mdash; available on your phone&rsquo;s app store.
      </div>`;
    const backHeadingHtml = `
      <div style="text-align:center;margin-bottom:8pt;">
        <div style="font-size:11pt;font-weight:bold;font-family:Arial,sans-serif;color:#1a1a2e;letter-spacing:0.04em;">Sunday Worship at FBCM</div>
        <div style="font-size:9.5pt;font-style:italic;color:#292854;font-family:Arial,sans-serif;margin-top:2pt;font-weight:600;letter-spacing:0.02em;">&ldquo;Praise &amp; Proclaim&rdquo; &mdash; Isaiah 12:4</div>
        <div style="font-size:8.5pt;color:#666;font-family:Arial,sans-serif;margin-top:2pt;font-style:italic;">${resolvedBackDate || ""}</div>
      </div>`;
    const rule = `<div style="border-top:1.5pt solid #292854;margin-bottom:8pt;"></div>`;

    // ── Sermon box: table for reliable border rendering ─────────────────────
    const sermonBlock = d.sermon ? `
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:7pt;background-color:#fdf8f0;border:1pt solid #292854;border-left:4pt solid #292854;"><tr>
        <td style="padding:6pt 8pt;background-color:#fdf8f0;">
          ${d.sermon.series ? `<div style="font-size:9pt;letter-spacing:0.12em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:2pt;">${d.sermon.series}</div>` : ""}
          ${d.sermon.title  ? `<div style="font-size:13pt;font-weight:bold;color:#1a1a2e;line-height:1.25;margin-bottom:2pt;">&ldquo;${d.sermon.title}&rdquo;</div>` : ""}
          ${d.sermon.scripture ? `<div style="font-size:10.5pt;color:#555;font-style:italic;${d.sermon.teaser ? "margin-bottom:3pt;" : ""}">${d.sermon.scripture}</div>` : ""}
          ${d.sermon.teaser ? `<div style="font-size:10.5pt;color:#444;line-height:1.4;">${d.sermon.teaser}</div>` : ""}
        </td>
      </tr></table>` : "";

    // ── Sermon notes ────────────────────────────────────────────────────────
    const renderResponseHtmlTwo = (text) => {
      if (!text) return "";
      const allLines = text.split("\n");
      const h = allLines[0] || "";
      const items = allLines.slice(1).filter(l => l.trim());
      return noteHead(h) + items.map(line => {
        const isIndented = /^\s+/.test(line);
        return `<div style="font-size:9pt;line-height:1.5;color:#333;margin-bottom:2pt;${isIndented ? "padding-left:10pt;" : ""}">${line.trim()}</div>`;
      }).join("");
    };
    const sermonNotes = `
      <div style="margin-top:6pt;padding-top:2pt;">
        ${noteHead("Main Point")}${noteLines(2)}
        ${noteHead("Connections")}${noteLines(3)}
        ${noteHead("Prayer Response")}${noteLines(2)}
        ${renderResponseHtmlTwo(ri)}
      </div>`;

    // ── Stay Connected footer: table for text + QR side by side ────────────
    const connectFooter = `
      <div style="border-top:1.5pt solid #292854;padding-top:5pt;margin-top:5pt;">
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:4pt;"><tr>
          <td style="vertical-align:top;">
            <div style="font-size:8pt;letter-spacing:0.12em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:4pt;">Stay Connected</div>
            <div style="font-size:8.5pt;color:#333;line-height:1.8;font-family:Arial,sans-serif;">
              <div>info@fbcmuncie.org &nbsp;|&nbsp; 765-284-7749</div>
              <div>309 East Adams Street, Muncie, IN 47305</div>
              <div><strong>New Here?</strong> Visit bit.ly/FBCMnew</div>
              <div><strong>Socials:</strong> linktr.ee/fbcmuncie</div>
            </div>
          </td>
          <td style="width:135pt;text-align:right;vertical-align:middle;">
            <img src="${QR_CODE}" style="height:125px;width:125px;" alt="QR"/>
          </td>
        </tr></table>
        <table cellpadding="0" cellspacing="4pt" border="0" style="width:100%;border-top:0.5pt solid #ddd;"><tr>
          <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</td>
          <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;text-align:right;">Church Center App</td>
        </tr></table>
      </div>`;

    // ── Mini footer on front page ───────────────────────────────────────────
    const miniFooter = `
      <table cellpadding="0" cellspacing="4pt" border="0" style="width:100%;border-top:0.5pt solid #ddd;margin-top:8pt;"><tr>
        <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</td>
        ${hasBack ? `<td style="font-size:7pt;color:#292854;font-family:Arial,sans-serif;font-style:italic;text-align:center;">continued on back</td>` : `<td></td>`}
        <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;text-align:right;">Church Center App</td>
      </tr></table>`;

    // ── Half-page cell style ────────────────────────────────────────────────
    const cell = "width:5.5in;padding:0.38in 0.42in 0.3in;vertical-align:top;font-family:Georgia,serif;color:#1a1a2e;";
    const divider = `<td style="width:1px;border-left:1pt dashed #bbb;">&nbsp;</td>`;

    const frontCell = `<td style="${cell}">
      ${logoHtml}${frontHeadingHtml}${rule}
      ${sectionHead("Announcements")}
      ${front.map((item,i) => annoItem(item, i===front.length-1)).join("")}
      ${miniFooter}
    </td>`;

    const backCell = `<td style="width:5.5in;padding:0.18in 0.42in 0.3in;vertical-align:top;font-family:Georgia,serif;color:#1a1a2e;">
      ${logoHtml}${backHeadingHtml}${rule}${sermonBlock}
      ${back.length > 0 ? sectionHead("Announcements (cont.)") + back.map((item,i) => annoItem(item, i===back.length-1)).join("") : ""}
      ${sermonNotes}
      ${connectFooter}
    </td>`;

    // ── Page CSS ────────────────────────────────────────────────────────────
    const pageCSS = wordMode
      ? `@page WordSection1 { size:11.0in 8.5in; mso-page-orientation:landscape; margin:0in; }
         div.WordSection1 { page:WordSection1; }
         .pg { page-break-after:always; }`
      : `@page { size:11in 8.5in landscape; margin:0; }
         .pg { page-break-after:always; }`;

    const htmlOpen = wordMode
      ? `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>`
      : `<html>`;

    const bodyWrap = (content) => wordMode
      ? `<div class="WordSection1">${content}</div>`
      : content;

    const pageTable = (cellContent) =>
      `<table cellpadding="0" cellspacing="0" border="0" style="width:11in;border-collapse:collapse;" class="pg">
        <tr>${cellContent}${divider}${cellContent}</tr>
      </table>`;

    return `<!DOCTYPE html>${htmlOpen}<head><meta charset="utf-8"/>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:white; font-family:Georgia,serif; }
  ${pageCSS}
</style>
</head><body>
${bodyWrap(pageTable(frontCell) + pageTable(backCell))}
</body></html>`;
  }

  function buildDocHTML(d, ri, bd) { return buildTwoColHTML(d, false, ri, bd); }
  function buildWordHTML(d, ri, bd) { return buildTwoColHTML(d, true, ri, bd); }


  // ── PKCE OAuth via Electron IPC loopback (Desktop app client) ──────────────
  async function runOAuth() {
    if (!window.electronAPI?.startOAuth) {
      throw new Error("Electron OAuth bridge not available.");
    }
    // Generate PKCE code verifier + challenge
    function b64url(buf) {
      return btoa(String.fromCharCode(...new Uint8Array(buf)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
    const verifierBytes = crypto.getRandomValues(new Uint8Array(64));
    const codeVerifier = b64url(verifierBytes);
    const challengeBuf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
    const codeChallenge = b64url(challengeBuf);

    // Random loopback port (ephemeral range)
    const redirectPort = Math.floor(Math.random() * (65535 - 49152) + 49152);
    const redirectUri  = `http://127.0.0.1:${redirectPort}`;

    const authUrl = "https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: SCOPES,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      access_type: "offline",
      prompt: "consent",
    });

    // Main process opens browser + listens on loopback, returns auth code
    const code = await window.electronAPI.startOAuth({ authUrl, redirectPort });

    // Exchange code for access token
    const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code,
        code_verifier: codeVerifier,
      }),
    });
    const tokenData = await tokenRes.json();
    if (tokenData.error) throw new Error(tokenData.error_description || tokenData.error);
    return tokenData.access_token;
  }

  async function saveToDrive() {
    if (!data) return;
    setDriveStatus("saving");
    const html = buildPrintHTML(data, responseInstructions, backDate);
    const cleanDate = data.date ? data.date.replace(/^[A-Za-z]+,\s*/, "").replace(/(\d+)(st|nd|rd|th)/, "$1").replace(/,/g, "").trim() : "weekly";
    const filename = cleanDate + " FBC Half-Sheet.html";
    try {
      const token = await runOAuth();
      const metadata = { name: filename, mimeType: "text/html", parents: [FOLDER_ID] };
      const form = new FormData();
      form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
      form.append("file", new Blob([html], { type: "text/html" }));
      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
        { method: "POST", headers: { Authorization: "Bearer " + token }, body: form }
      );
      if (res.ok) { setDriveStatus("done"); setTimeout(() => setDriveStatus("idle"), 4000); }
      else { console.error("Drive upload failed:", res.status, await res.json().catch(() => ({}))); setDriveStatus("error"); setTimeout(() => setDriveStatus("idle"), 3000); }
    } catch (e) { console.error(e); setDriveStatus("error"); setTimeout(() => setDriveStatus("idle"), 3000); }
  }

  async function saveAsGoogleDoc() {
    if (!data) return;
    setDocStatus("saving");
    const html = buildDocHTML(data, responseInstructions, backDate);
    const filename = "FBC-HalfSheet-" + (data.date || "weekly").replace(/[^a-zA-Z0-9]/g, "-") + " (Editable)";
    try {
      const token = await runOAuth();
      const metadata = { name: filename, mimeType: "application/vnd.google-apps.document", parents: [FOLDER_ID] };
      const form = new FormData();
      form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
      form.append("file", new Blob([html], { type: "text/html" }));
      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
        { method: "POST", headers: { Authorization: "Bearer " + token }, body: form }
      );
      if (res.ok) {
        const result = await res.json();
        setDocStatus("done");
        if (result.id) window.open(`https://docs.google.com/document/d/${result.id}/edit`, "_blank");
        setTimeout(() => setDocStatus("idle"), 5000);
      } else {
        console.error("Doc upload failed:", res.status, await res.json().catch(() => ({})));
        setDocStatus("error"); setTimeout(() => setDocStatus("idle"), 3000);
      }
    } catch (e) { console.error(e); setDocStatus("error"); setTimeout(() => setDocStatus("idle"), 3000); }
  }

  function downloadWord() {
    if (!data) return;
    setWordStatus("saving");
    try {
      const html = buildWordHTML(data, responseInstructions, backDate);
      const blob = new Blob([html], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const cleanDate = data.date ? data.date.replace(/^[A-Za-z]+,\s*/, "").replace(/(\d+)(st|nd|rd|th)/, "$1").replace(/,/g, "").trim() : "weekly";
      a.download = cleanDate + " FBC Half-Sheet.doc";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setWordStatus("done");
      setTimeout(() => setWordStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setWordStatus("error");
      setTimeout(() => setWordStatus("idle"), 3000);
    }
  }

  function buildPrintHTML(d, ri, bd) {
    const front = (d.announcements || []).slice(0, FRONT_MAX);
    const back = (d.announcements || []).slice(FRONT_MAX, TOTAL_MAX);
    const hasBack = back.length > 0;

    const annoItem = (item, isLast) => `
      <div style="margin-bottom:7px;padding-bottom:7px;${isLast ? "" : "border-bottom:0.5px solid #eee;"}">
        <div style="font-size:12px;font-weight:bold;color:#1a1a2e;line-height:1.25;margin-bottom:1.5px;">
          ${item.title}${item.date ? `<span style="font-weight:normal;color:#292854;margin-left:5px;font-size:11px;">${item.date}</span>` : ""}
        </div>
        ${item.description ? `<div style="font-size:10.5px;color:#333;line-height:1.45;">${item.description}</div>` : ""}
        ${item.location ? `<div style="font-size:9px;color:#666;margin-top:2px;">&#128205; ${item.location}</div>` : ""}
        ${item.registration ? `<div style="font-size:9px;color:#555;margin-top:1.5px;">&#8594; ${item.registration}</div>` : ""}
      </div>`;

    const logoHtml = `
      <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px;">
        <img src="${TOWER_LOGO}" alt="" style="height:40px;width:auto;object-fit:contain;flex-shrink:0;"/>
      </div>`;

    const resolvedBackDate = bd || getNextSunday(d.date);
    const frontHeadingHtml = `
      <div style="text-align:center;margin-bottom:5px;">
        <div style="font-size:11px;font-weight:bold;font-family:Arial,sans-serif;color:#1a1a2e;letter-spacing:0.04em;">News from the Wednesday Weekly</div>
        <div style="font-size:8.5px;color:#666;font-family:Arial,sans-serif;margin-top:2px;font-style:italic;">${d.date ? d.date.replace(/^[A-Za-z]+,\s*/, "").replace(/(\d+)(st|nd|rd|th)/, "$1") : ""}</div>
      </div>
      <div style="text-align:center;font-size:8px;color:#444;font-family:Arial,sans-serif;line-height:1.6;margin-bottom:6px;padding:4px 8px;background:#fafaf7;border-radius:3px;border:0.5px solid #e8e0d0;">
        View the full WW anytime:&nbsp;&nbsp;Online: <strong>bit.ly/fbc-ww</strong>&nbsp;&nbsp;&middot;&nbsp;&nbsp;on the <strong>Church Center App</strong> &mdash; available on your phone&rsquo;s app store.
      </div>`;
    const backHeadingHtml = `
      <div style="text-align:center;margin-bottom:8px;">
        <div style="font-size:11px;font-weight:bold;font-family:Arial,sans-serif;color:#1a1a2e;letter-spacing:0.04em;">Sunday Worship at FBCM</div>
        <div style="font-size:9.5px;font-style:italic;color:#292854;font-family:Arial,sans-serif;margin-top:2px;font-weight:600;letter-spacing:0.02em;">&ldquo;Praise &amp; Proclaim&rdquo; &mdash; Isaiah 12:4</div>
        <div style="font-size:8.5px;color:#666;font-family:Arial,sans-serif;margin-top:2px;font-style:italic;">${resolvedBackDate || ""}</div>
      </div>`;
    const ruleHtml = `<div style="border-top:1.5px solid #292854;margin-bottom:10px;"></div>`;

    const sermonHtml = d.sermon ? `
      <div style="background:#fdf8f0;border:1px solid #292854;border-left:3.5px solid #292854;border-radius:3px;padding:7px 9px;margin-bottom:10px;">
        ${d.sermon.series ? `<div style="font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:2px;">${d.sermon.series}</div>` : ""}
        ${d.sermon.title ? `<div style="font-size:13px;font-weight:bold;color:#1a1a2e;line-height:1.25;margin-bottom:2px;">&ldquo;${d.sermon.title}&rdquo;</div>` : ""}
        ${d.sermon.scripture ? `<div style="font-size:10.5px;color:#555;font-style:italic;${d.sermon.teaser ? "margin-bottom:3px;" : ""}">${d.sermon.scripture}</div>` : ""}
        ${d.sermon.teaser ? `<div style="font-size:10.5px;color:#444;line-height:1.4;">${d.sermon.teaser}</div>` : ""}
      </div>` : "";

    const noteHeading = (label) => `<div style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:3px;margin-top:9px;">${label}</div>`;
    const noteLine = () => `<div style="border-bottom:0.5px solid #ccc;height:18px;margin-bottom:2px;"></div>`;
    const noteLines = (n) => Array.from({length: n}).map(() => noteLine()).join("");
    const renderResponseHtmlPrint = (text) => {
      if (!text) return "";
      const allLines = text.split("\n");
      const h = allLines[0] || "";
      const items = allLines.slice(1).filter(l => l.trim());
      return noteHeading(h) + items.map(line => {
        const isIndented = /^\s+/.test(line);
        return `<div style="font-size:9px;line-height:1.5;color:#333;margin-bottom:2.5px;${isIndented ? "padding-left:12px;" : ""}">${line.trim()}</div>`;
      }).join("");
    };

    const sermonNotesHtml = `
      <div style="margin-top:6px;padding-top:2px;">
        ${noteHeading("Main Point")}${noteLines(2)}
        ${noteHeading("Connections")}${noteLines(5)}
        ${noteHeading("Prayer Response")}${noteLines(5)}
        ${renderResponseHtmlPrint(ri)}
      </div>`;

    const connectFooterHtml = `
      <div style="border-top:1.5px solid #292854;padding-top:8px;margin-top:4px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="flex:1;">
            <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:5px;">Stay Connected</div>
            <div style="font-size:8.5px;color:#333;line-height:1.8;font-family:Arial,sans-serif;">
              <div>info@fbcmuncie.org  |  765-284-7749</div>
              <div>309 East Adams Street, Muncie, IN 47305</div>
              <div><strong>New Here?</strong> Visit bit.ly/FBCMnew</div>
              <div><strong>Socials:</strong> linktr.ee/fbcmuncie</div>
            </div>
          </div>
          <img src="data:image/jpeg;base64,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" style="height:54px;width:54px;object-fit:contain;flex-shrink:0;" alt="QR"/>
        </div>
        <div style="border-top:0.5px solid #ddd;margin-top:5px;padding-top:4px;display:flex;justify-content:space-between;">
          <span style="font-size:7px;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</span>
          <span style="font-size:7px;color:#999;font-family:Arial,sans-serif;">Church Center App</span>
        </div>
      </div>`;

    const hs = "width:5.5in;height:8.5in;background:white;box-sizing:border-box;font-family:Georgia,serif;color:#1a1a2e;overflow:hidden;";
    const inner = "padding:0.38in 0.42in 0.32in;box-sizing:border-box;display:flex;flex-direction:column;height:100%;";

    const frontCol = () => `
      <div style="${hs}">
        <div style="${inner}">
          ${logoHtml}${frontHeadingHtml}${ruleHtml}
          <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;border-bottom:0.5px solid #ddd;padding-bottom:3px;margin-bottom:8px;">Announcements</div>
          <div>${front.map((item, i) => annoItem(item, i === front.length - 1)).join("")}</div>
          <div style="flex:1;"></div>
          <div style="border-top:0.5px solid #ddd;padding-top:5px;display:flex;justify-content:space-between;">
            <div style="font-size:7px;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</div>
            ${hasBack ? `<div style="font-size:7px;color:#292854;font-family:Arial,sans-serif;font-style:italic;">continued on back</div>` : ""}
            <div style="font-size:7px;color:#999;font-family:Arial,sans-serif;">Church Center App</div>
          </div>
        </div>
      </div>`;

    const backCol = () => `
      <div style="${hs}">
        <div style="${inner}">
          ${logoHtml}${backHeadingHtml}${ruleHtml}${sermonHtml}
          ${back.length > 0 ? `
            <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;border-bottom:0.5px solid #ddd;padding-bottom:3px;margin-bottom:8px;">Announcements (cont.)</div>
            <div>${back.map((item, i) => annoItem(item, i === back.length - 1)).join("")}</div>
          ` : ""}
          ${sermonNotesHtml}
          <div style="flex:1;"></div>
          ${connectFooterHtml}
        </div>
      </div>`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>FBC Muncie Half-Sheet</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: white; }
    .page { display: flex; flex-direction: row; width: 11in; height: 8.5in; page-break-after: always; }
    .page:last-child { page-break-after: avoid; }
    .cut { border-left: 1px dashed #aaa; align-self: stretch; }
    @page { size: 11in 8.5in landscape; margin: 0; }
    @media print { .cut { display: none; } }
  </style>
</head>
<body>
  <div class="page">${frontCol()}<div class="cut"></div>${frontCol()}</div>
  <div class="page">${backCol()}<div class="cut"></div>${backCol()}</div>
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`;
  }

  function printSheet() {
    if (!data) return;
    const html = buildPrintHTML(data, responseInstructions, backDate);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fbc-halfsheet.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function generate() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: `Extract structured announcement data from a church weekly news email or document.
Return ONLY valid JSON, no markdown, no backticks, no explanation.

Schema:
{
  "date": "Weekday, Month DDth, YYYY — use ordinal suffix (1st 2nd 3rd 4th) — extract the Wednesday date from the content",
  "sermon": {
    "series": "series name or null",
    "title": "sermon title or null",
    "scripture": "passage or null",
    "teaser": "one sentence or null"
  },
  "announcements": [
    {
      "title": "short event name",
      "date": "date/time string or null",
      "description": "1-2 sentence summary, max 25 words",
      "location": "location if NOT at the main church building, else null",
      "registration": "signup link/phone/email if mentioned, else null"
    }
  ]
}

Rules: include up to 9 most important announcements. Sermon block may be null. Keep descriptions under 25 words.`,
          messages: [{ role: "user", content: `Extract announcements:\n\n${input}` }]
        })
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json?.error?.message || `API error ${res.status}`;
        throw new Error(msg);
      }
      const text = json.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setData(parsed);
      const sundayDate = getNextSunday(parsed.date);
      const mode = isFirstSundayOfMonth(sundayDate) ? "lords_supper" : "ways_to_respond";
      setResponseMode(mode);
      setResponseInstructions(getDefaultResponseInstructions(sundayDate));
      setBackDate(sundayDate || "");
      setEditMode(true);
    } catch (e) {
      setError("Error: " + (e.message || "Could not parse content. Check your input and try again."));
      console.error(e);
    }
    setLoading(false);
  }

  

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .shell { height: 100vh; overflow: hidden; background: #1a1a2e; display: flex; flex-direction: column; font-family: 'Source Sans 3', sans-serif; }
        .topbar { padding: 14px 20px; border-bottom: 1px solid rgba(181,146,58,0.25); display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .tower-logo { height: 38px; width: auto; object-fit: contain; }
        .topbar-text { display: flex; align-items: center; gap: 10px; }
        .badge { background: ${GOLD}; color: #fff; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; }
        .title { font-family: 'Playfair Display', serif; font-size: 19px; color: #f0ece2; }
        .body { flex: 1; display: flex; min-height: 0; }
        .left { width: 300px; min-width: 260px; flex-shrink: 0; background: #13132a; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding: 18px 16px; gap: 12px; overflow-y: auto; }
        .lbl { font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(240,236,226,0.4); font-weight: 600; }
        textarea { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 5px; color: #f0ece2; font-size: 12px; line-height: 1.6; padding: 10px; resize: none; font-family: inherit; outline: none; min-height: 280px; }
        textarea:focus { border-color: rgba(181,146,58,0.45); }
        textarea::placeholder { color: rgba(240,236,226,0.22); }
        .gen-btn { background: ${GOLD}; color: #fff; border: none; border-radius: 5px; padding: 11px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: opacity 0.18s; }
        .gen-btn:hover:not(:disabled) { opacity: 0.85; }
        .gen-btn:disabled { opacity: 0.4; cursor: default; }
        .print-btn { background: transparent; border: 1px solid rgba(181,146,58,0.4); color: ${GOLD}; border-radius: 5px; padding: 9px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: background 0.18s; }
        .print-btn:hover { background: rgba(181,146,58,0.08); }
        .print-btn:disabled { opacity: 0.3; cursor: default; }
        .hint { font-size: 10px; color: rgba(240,236,226,0.3); line-height: 1.6; }
        .err { background: rgba(220,60,60,0.14); border: 1px solid rgba(220,60,60,0.28); color: #f87171; font-size: 11px; padding: 8px 10px; border-radius: 4px; line-height: 1.5; }
        .right { flex: 1; background: #22223b; overflow: auto; padding: 28px 32px; display: flex; flex-direction: column; gap: 10px; }
        .rlbl { font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(240,236,226,0.3); font-weight: 600; }
        .rnote { font-size: 10px; color: rgba(240,236,226,0.22); font-style: italic; }
        .page-label { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(181,146,58,0.6); font-weight: 700; margin-bottom: 4px; }
        .preview-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 24px; }
        .preview-scaled { height: 440px; overflow: hidden; }
        .preview-wrap { display: flex; align-items: flex-start; transform: scale(0.52); transform-origin: top left; }
        .cut { border-left: 2px dashed rgba(255,255,255,0.15); align-self: stretch; }
        .empty { width: 360px; background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.07); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 56px 32px; gap: 8px; color: rgba(240,236,226,0.2); text-align: center; }
        .spin { width: 22px; height: 22px; border: 3px solid rgba(181,146,58,0.2); border-top-color: ${GOLD}; border-radius: 50%; animation: spin 0.75s linear infinite; margin: 0 auto 8px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .drive-btn { background: #1a73e8; color: #fff; border: none; border-radius: 5px; padding: 9px; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; font-family: inherit; transition: opacity 0.18s; display: flex; align-items: center; justify-content: center; gap: 7px; }
        .drive-btn:hover:not(:disabled) { opacity: 0.88; }
        .drive-btn:disabled { opacity: 0.45; cursor: default; }
        .word-btn { background: #2b579a; color: #fff; border: none; border-radius: 5px; padding: 9px; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; font-family: inherit; transition: opacity 0.18s; display: flex; align-items: center; justify-content: center; gap: 7px; }
        .word-btn:hover:not(:disabled) { opacity: 0.88; }
        .word-btn:disabled { opacity: 0.45; cursor: default; }
        .btn-spin { display: inline-block; width: 12px; height: 12px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
        .edit-scroll { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0; padding-right: 2px; }
        .edit-scroll::-webkit-scrollbar { width: 4px; } .edit-scroll::-webkit-scrollbar-thumb { background: rgba(181,146,58,0.25); border-radius: 2px; }
        .edit-section-head { font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: ${GOLD}; font-weight: 700; border-bottom: 1px solid rgba(181,146,58,0.22); padding-bottom: 4px; margin: 14px 0 8px; }
        .edit-section-head:first-child { margin-top: 0; }
        .edit-field { margin-bottom: 8px; }
        .edit-label { display: block; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(240,236,226,0.38); font-weight: 600; margin-bottom: 3px; }
        .edit-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 4px; color: #f0ece2; font-size: 11.5px; padding: 6px 8px; font-family: inherit; outline: none; resize: vertical; line-height: 1.5; }
        .edit-input:focus { border-color: rgba(181,146,58,0.5); background: rgba(255,255,255,0.07); }
        .edit-input::placeholder { color: rgba(240,236,226,0.2); }
        .ann-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 5px; padding: 9px 10px; margin-bottom: 7px; }
        .ann-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
        .ann-card-label { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(240,236,226,0.3); font-weight: 600; }
        .ann-card-label span { color: ${GOLD}; margin-left: 4px; }
        .ann-card-actions { display: flex; gap: 3px; align-items: center; }
        .ann-icon-btn { background: none; border: none; cursor: pointer; font-size: 12px; padding: 1px 4px; border-radius: 3px; line-height: 1; transition: background 0.12s; }
        .ann-icon-btn:hover { background: rgba(255,255,255,0.1); }
        .ann-icon-btn:disabled { opacity: 0.2; cursor: default; }
        .ann-icon-btn.del { color: #f87171; }
        .ann-icon-btn.del:hover { background: rgba(248,113,113,0.15); }
        .add-ann-btn { width: 100%; background: transparent; border: 1.5px dashed rgba(181,146,58,0.35); border-radius: 5px; color: ${GOLD}; font-size: 11px; font-weight: 700; padding: 8px; cursor: pointer; font-family: inherit; transition: background 0.15s; margin-bottom: 6px; letter-spacing: 0.04em; }
        .add-ann-btn:hover { background: rgba(181,146,58,0.08); }
        .start-over-btn { background: transparent; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; color: rgba(240,236,226,0.5); font-size: 10px; padding: 4px 10px; cursor: pointer; font-family: inherit; transition: all 0.15s; letter-spacing: 0.04em; }
        .start-over-btn:hover { border-color: rgba(255,255,255,0.3); color: rgba(240,236,226,0.8); }
        .edit-top-row { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; margin-bottom: 2px; }
        @media print {
          .topbar, .left, .rlbl, .rnote, .page-label { display: none !important; }
          .shell, .right { background: white !important; }
          .right { padding: 0 !important; overflow: visible !important; }
          .preview-wrap { transform: none !important; }
          .cut { display: none !important; }
          @page { size: 11in 8.5in landscape; margin: 0; }
        }
      `}</style>

      <div className="shell">
        <div className="topbar">
          <img src={TOWER_LOGO} alt="FBC Tower" className="tower-logo" />
          <div className="topbar-text">
            <span className="badge">FBC Muncie</span>
            <span className="title">Weekly Half-Sheet Generator</span>
          </div>
        </div>
        <div className="body">
          <div className="left">
            {editMode ? (
              <>
                {/* ── Edit mode header ── */}
                <div className="edit-top-row">
                  <span className="lbl">Edit Content</span>
                  <button className="start-over-btn" onClick={startOver}>← Start Over</button>
                </div>

                {/* ── Scrollable edit form ── */}
                <div className="edit-scroll">

                  <div className="edit-section-head">Bulletin Date</div>
                  <div className="edit-field">
                    <label className="edit-label">Date shown on front page</label>
                    <input className="edit-input" value={data.date || ""} onChange={e => setTopDate(e.target.value)} placeholder="e.g. Wednesday, March 12, 2025" />
                  </div>

                  <div className="edit-section-head">
                    Announcements ({data.announcements.length}/{TOTAL_MAX})
                  </div>

                  {data.announcements.map((ann, i) => (
                    <div key={i}>
                      {frontCutoff !== null && i === frontCutoff && (
                        <div style={{
                          border: "1.5px dashed #c0392b", borderRadius: "4px",
                          color: "#c0392b", fontSize: "9px", textAlign: "center",
                          padding: "4px 8px", marginBottom: "6px",
                          fontFamily: "Arial, sans-serif", fontWeight: "700",
                          letterSpacing: "0.06em", background: "rgba(192,57,43,0.06)",
                        }}>
                          ✂ PAGE BOUNDARY — items below won't fit on the front page.<br/>
                          <span style={{ fontWeight: 400 }}>Move items up above this line to include them in print.</span>
                        </div>
                      )}
                    <div className="ann-card">
                      <div className="ann-card-header">
                        <span className="ann-card-label">
                          #{i + 1}
                          <span style={{ color: frontCutoff !== null && i >= frontCutoff ? "#c0392b" : undefined }}>
                            {frontCutoff !== null && i >= frontCutoff ? "⚠ Over limit" : "Front"}
                          </span>
                        </span>
                        <div className="ann-card-actions">
                          <button className="ann-icon-btn" onClick={() => moveAnn(i, -1)} disabled={i === 0} title="Move up">▲</button>
                          <button className="ann-icon-btn" onClick={() => moveAnn(i, 1)} disabled={i === data.announcements.length - 1} title="Move down">▼</button>
                          <button className="ann-icon-btn del" onClick={() => removeAnn(i)} title="Remove">✕</button>
                        </div>
                      </div>
                      <div className="edit-field">
                        <label className="edit-label">Title</label>
                        <input className="edit-input" value={ann.title || ""} onChange={e => setAnnField(i, "title", e.target.value)} placeholder="Event name" />
                      </div>
                      <div className="edit-field">
                        <label className="edit-label">Date / Time</label>
                        <input className="edit-input" value={ann.date || ""} onChange={e => setAnnField(i, "date", e.target.value)} placeholder="e.g. Sunday, March 16 at 9am" />
                      </div>
                      <div className="edit-field">
                        <label className="edit-label">Description</label>
                        <textarea className="edit-input" rows={2} value={ann.description || ""} onChange={e => setAnnField(i, "description", e.target.value)} placeholder="1–2 sentence summary" />
                      </div>
                      <div className="edit-field">
                        <label className="edit-label">Location (if off-site)</label>
                        <input className="edit-input" value={ann.location || ""} onChange={e => setAnnField(i, "location", e.target.value)} placeholder="Leave blank for main building" />
                      </div>
                      <div className="edit-field" style={{ marginBottom: 0 }}>
                        <label className="edit-label">Sign-up / Link</label>
                        <input className="edit-input" value={ann.registration || ""} onChange={e => setAnnField(i, "registration", e.target.value)} placeholder="URL, phone, or email (optional)" />
                      </div>
                    </div>
                    </div>
                  ))}

                  {data.announcements.length < TOTAL_MAX && (
                    <button className="add-ann-btn" onClick={addAnn}>+ Add Announcement</button>
                  )}

                  <div className="edit-section-head">Page 2 — Back</div>

                  <div className="edit-field">
                    <label className="edit-label">Series (optional)</label>
                    <input className="edit-input" value={data.sermon?.series || ""} onChange={e => setSermonField("series", e.target.value)} placeholder="Series name" />
                  </div>
                  <div className="edit-field">
                    <label className="edit-label">Sermon Title</label>
                    <input className="edit-input" value={data.sermon?.title || ""} onChange={e => setSermonField("title", e.target.value)} placeholder="Sermon title" />
                  </div>
                  <div className="edit-field">
                    <label className="edit-label">Scripture</label>
                    <input className="edit-input" value={data.sermon?.scripture || ""} onChange={e => setSermonField("scripture", e.target.value)} placeholder="e.g. John 3:16" />
                  </div>
                  <div className="edit-field">
                    <label className="edit-label">Teaser (optional)</label>
                    <textarea className="edit-input" rows={2} value={data.sermon?.teaser || ""} onChange={e => setSermonField("teaser", e.target.value)} placeholder="One-sentence preview" />
                  </div>

                  <div className="edit-field">
                    <label className="edit-label">Date shown on back page</label>
                    <input
                      className="edit-input"
                      value={backDate}
                      onChange={e => setBackDate(e.target.value)}
                      placeholder={getNextSunday(data?.date) || "e.g. Sunday, March 2, 2025"}
                    />
                  </div>

                  <div className="edit-field">
                    <label className="edit-label">Response type</label>
                    <select
                      className="edit-input"
                      value={responseMode}
                      onChange={e => {
                        const mode = e.target.value;
                        setResponseMode(mode);
                        setResponseInstructions(
                          mode === "lords_supper"
                            ? getDefaultResponseInstructions("Sunday, March 2, 2025")
                            : getDefaultResponseInstructions("Sunday, March 16, 2025")
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="ways_to_respond">Ways to Respond (normal Sundays)</option>
                      <option value="lords_supper">The Lord's Supper (first Sunday)</option>
                    </select>
                  </div>

                  <div className="edit-field">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <label className="edit-label" style={{ margin: 0 }}>Response Instructions</label>
                      <button
                        style={{ fontSize: "9px", padding: "2px 7px", cursor: "pointer", background: "rgba(181,146,58,0.15)", border: "1px solid rgba(181,146,58,0.35)", color: "#292854", borderRadius: "3px", flexShrink: 0 }}
                        onClick={() => {
                          setResponseInstructions(
                            responseMode === "lords_supper"
                              ? getDefaultResponseInstructions("Sunday, March 2, 2025")
                              : getDefaultResponseInstructions("Sunday, March 16, 2025")
                          );
                        }}
                      >↺ Reset to default</button>
                    </div>
                    <textarea
                      className="edit-input"
                      rows={9}
                      value={responseInstructions}
                      onChange={e => setResponseInstructions(e.target.value)}
                      placeholder="First line = heading (e.g. Ways to Respond). Each subsequent line = one bullet. Indent lines with spaces for sub-bullets."
                      style={{ fontFamily: "monospace", fontSize: "10px", lineHeight: 1.5 }}
                    />
                  </div>

                  <div style={{ height: "8px" }} />
                </div>

                {/* ── Export buttons (same as before) ── */}
                <button className="print-btn" onClick={printSheet} disabled={!data}>
                  ⬇ Download Print File
                </button>
                <button className="drive-btn" onClick={saveToDrive} disabled={!data || driveStatus === "saving"}>
                  {driveStatus === "saving" && <span className="btn-spin" />}
                  {driveStatus === "idle" && "☁ Save to Google Drive"}
                  {driveStatus === "saving" && "Saving…"}
                  {driveStatus === "done" && "✓ Saved to Drive!"}
                  {driveStatus === "error" && "✗ Save Failed — Retry"}
                </button>
                <button className="word-btn" onClick={downloadWord} disabled={!data || wordStatus === "saving"}>
                  {wordStatus === "saving" && <span className="btn-spin" />}
                  {wordStatus === "idle" && "📄 Download Word Doc"}
                  {wordStatus === "saving" && "Building…"}
                  {wordStatus === "done" && "✓ Word Doc Downloaded!"}
                  {wordStatus === "error" && "✗ Failed — Retry"}
                </button>
                <p className="hint">
                  <strong>Preview</strong> updates live as you type.<br />
                  <strong>Download:</strong> open .html → Ctrl+P → landscape, no margins.
                </p>
              </>
            ) : (
              <>
                {/* ── Paste mode (original UI) ── */}
                <span className="lbl">Weekly News Content</span>
                <textarea
                  placeholder={"Paste your Wednesday Weekly email or news content here...\n\nClaude will extract the sermon, announcements, dates, locations, and sign-up info automatically."}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                {error && <div className="err">{error}</div>}
                <button className="gen-btn" onClick={generate} disabled={loading || !input.trim()}>
                  {loading ? "Generating…" : "⚡ Generate Half-Sheet"}
                </button>
                <p className="hint">
                  Paste the Wednesday Weekly email or any church news text. Claude will automatically extract and format everything into the half-sheet.
                </p>
              </>
            )}
          </div>

          <div className="right">
            <span className="rlbl">Print Preview</span>
            {!loading && !data && (
              <div className="empty">
                <div style={{ fontSize: "36px" }}>📋</div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(240,236,226,0.28)" }}>No content yet</div>
                <div style={{ fontSize: "11px" }}>Paste your Wednesday Weekly and click Generate</div>
              </div>
            )}
            {loading && (
              <div className="empty">
                <div className="spin" />
                <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(240,236,226,0.28)" }}>Generating…</div>
                <div style={{ fontSize: "11px" }}>Extracting announcements</div>
              </div>
            )}
            {data && !loading && (
              <>
                <span className="rnote">Scaled ~52% · 5.5″ × 8.5″ per half · 2 pages (front &amp; back)</span>
                <div className="preview-row">
                  <div className="page-label">▸ Page 1 — Front</div>
                  <div className="preview-scaled">
                    <div className="preview-wrap">
                      <HalfSheetFront data={data} onCutoffChange={setFrontCutoff} />
                      <div className="cut" />
                      <HalfSheetFront data={data} />
                    </div>
                  </div>
                </div>
                <div className="preview-row">
                  <div className="page-label">▸ Page 2 — Back</div>
                  <div className="preview-scaled">
                    <div className="preview-wrap">
                      <HalfSheetBack data={data} responseInstructions={responseInstructions} backDate={backDate} />
                      <div className="cut" />
                      <HalfSheetBack data={data} responseInstructions={responseInstructions} backDate={backDate} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
