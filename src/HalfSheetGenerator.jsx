import { useState, useEffect, useRef, useLayoutEffect } from "react";

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const TOWER_LOGO = "data:image/jpeg;base64,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";
const QR_CODE = "data:image/png;base64,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";
const GOLD = "#292854";
const DARK = "#1a1a2e";
const CLIENT_ID = "700317661922-usjieegsea5jdo3bi0g6qatekvp4j37d.apps.googleusercontent.com";
const FOLDER_ID = "1e791rdoNoUsqu6faUW-zidBb5TAchBLK";
const SCOPES = "https://www.googleapis.com/auth/drive.file";
// Appended to the front page only on communion Sundays. These two facts used to sit
// inside the Lord's Supper block on the back, where they were logistics wearing
// theological clothing — and where they cost space the order of worship needed.
const KIDS_COMMUNION_ANNOUNCEMENT = {
  title: "Children on Communion Sunday",
  date: null,
  description: "No children's church on the first Sunday — we worship intergenerationally. Children's bulletins are at each entrance.",
  location: null,
  registration: null,
};

const FRONT_MAX = 8;
const TOTAL_MAX = 8;

// ─── Auto-shrink hook ─────────────────────────────────────────────────────────
function useAutoShrink(outerRef, innerRef) {
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    // Same two corrections as FIT_SCRIPT, so the preview matches the printed PDF:
    // measure at height:auto (flex children compress instead of overflowing, which
    // hides the overrun from scrollHeight), and iterate because widening the box
    // reflows text into fewer lines and invalidates the first measurement.
    inner.style.transform = "";
    inner.style.width = "";
    inner.style.transformOrigin = "top left";
    const avail = outer.clientHeight;
    const prevH = inner.style.height;
    let s = 1;
    for (let k = 0; k < 8; k++) {
      inner.style.width = `${(100 / s).toFixed(3)}%`;
      inner.style.height = "auto";
      const nat = inner.scrollHeight;
      inner.style.height = prevH;
      const next = Math.min(1, avail / nat);
      if (Math.abs(next - s) < 0.004) { s = next; break; }
      s = next;
    }
    if (s < 0.999) {
      inner.style.width = `${(100 / s).toFixed(3)}%`;
      inner.style.transform = `scale(${s.toFixed(4)})`;
    } else {
      inner.style.width = "";
      inner.style.transform = "";
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

// ─── Claude API helper ────────────────────────────────────────────────────────
// Both extractions are simple structured-output tasks, so we ask for "low" effort.
// This matters: Sonnet 5 has adaptive thinking on by default at high effort, and
// max_tokens is a hard cap on thinking + response combined. High effort plus a small
// max_tokens burns the budget thinking and truncates the JSON mid-object.
async function callClaudeJSON({ system, user, maxTokens = 8000 }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: maxTokens,
      output_config: { effort: "low" },
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `API error ${res.status}`);

  if (json.stop_reason === "max_tokens") {
    throw new Error("The response was cut off before it finished. Try pasting a shorter section, or trimming the input.");
  }

  const text = (json.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  // Be forgiving about stray prose or code fences around the JSON object.
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Claude did not return usable data. Check the pasted text and try again.");
  }
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    throw new Error("The extracted data was incomplete or malformed. Try again, or paste a shorter section.");
  }
}

// ─── Testament detection ──────────────────────────────────────────────────────
// "Other Testament Reading" is how the plan labels it; the congregation should see
// "Old Testament Reading" or "New Testament Reading". Done in code rather than by the
// model — a lookup table cannot hallucinate which testament a book is in.
const OT_BOOKS = [
  "genesis","exodus","leviticus","numbers","deuteronomy","joshua","judges","ruth",
  "1 samuel","2 samuel","1 kings","2 kings","1 chronicles","2 chronicles","ezra",
  "nehemiah","esther","job","psalm","psalms","proverbs","ecclesiastes",
  "song of solomon","song of songs","canticles","isaiah","jeremiah","lamentations",
  "ezekiel","daniel","hosea","joel","amos","obadiah","jonah","micah","nahum",
  "habakkuk","zephaniah","haggai","zechariah","malachi",
  // common abbreviations
  "gen","exod","ex","lev","num","deut","dt","josh","judg","1 sam","2 sam","1 kgs",
  "2 kgs","1 chr","2 chr","neh","esth","ps","pss","prov","eccl","song","isa","jer",
  "lam","ezek","dan","hos","obad","jon","mic","nah","hab","zeph","hag","zech","mal",
];
const NT_BOOKS = [
  "matthew","mark","luke","john","acts","romans","1 corinthians","2 corinthians",
  "galatians","ephesians","philippians","colossians","1 thessalonians",
  "2 thessalonians","1 timothy","2 timothy","titus","philemon","hebrews","james",
  "1 peter","2 peter","1 john","2 john","3 john","jude","revelation",
  // common abbreviations
  "matt","mt","mk","lk","jn","rom","1 cor","2 cor","gal","eph","phil","col",
  "1 thess","2 thess","1 tim","2 tim","tit","phlm","heb","jas","1 pet","2 pet",
  "1 jn","2 jn","3 jn","rev",
];

// Returns "OT", "NT", or null. Never guesses.
function testamentOf(reference) {
  if (!reference) return null;
  let ref = String(reference).toLowerCase().replace(/\./g, " ").trim();
  // "First Corinthians", "I Corinthians", "II Kings" -> "1 corinthians", "2 kings"
  ref = ref
    .replace(/^(first|1st)\s+/, "1 ")
    .replace(/^(second|2nd)\s+/, "2 ")
    .replace(/^(third|3rd)\s+/, "3 ")
    .replace(/^iii\s+/, "3 ")
    .replace(/^ii\s+/, "2 ")
    .replace(/^i\s+/, "1 ");
  // book name = optional leading numeral, then letters/spaces, stopping at the chapter
  const m = ref.match(/^([123]\s*)?([a-z]+(?:\s+of\s+[a-z]+|\s+[a-z]+)*)/);
  if (!m) return null;
  const book = ((m[1] || "").replace(/\s+/g, "") + " " + m[2]).replace(/\s+/g, " ").trim();
  const hit = (list) => list.some(b => book === b || book.startsWith(b + " "));
  if (hit(OT_BOOKS)) return "OT";
  if (hit(NT_BOOKS)) return "NT";
  return null;
}

// Label for the non-sermon reading. Falls back to the plan's own wording if the
// passage can't be identified, rather than inventing a testament.
function readingLabel(reference, fallback) {
  const t = testamentOf(reference);
  if (t === "OT") return "Old Testament Reading";
  if (t === "NT") return "New Testament Reading";
  return fallback || "Scripture Reading";
}

// Matches the element the plan uses for the non-sermon reading, whatever it's called.
const OTHER_READING_RE = /^(other testament|secondary|second|additional|first)\s+reading$|^other reading$/i;

// ─── Staff titles ─────────────────────────────────────────────────────────────
// Applied after extraction rather than in the prompt, so it is deterministic and
// easy to maintain. To add or change staff, edit this map only.
const STAFF_TITLES = {
  "Kendall Ellis":   { prefix: "Rev." },
  "Jonathan Balmer": { prefix: "Rev." },
  "Cynthia Smith":   { suffix: "Worship Director" },
};

// Prefixes ("Rev.") appear everywhere. Suffix titles ("Worship Director") are long,
// so they are kept off the narrow congregational leader column and shown only on the
// Who's Serving sheet. Flip to true to show them on the half-sheet too.
const SUFFIX_ON_HALFSHEET = false;

// ─── Diaconate ────────────────────────────────────────────────────────────────
// The worship plan's "Deacons" field lists only the deacons AT THE TABLE for
// communion. The floating / reading deacon is not recorded there, so membership has
// to be known here. UPDATE THIS LIST when the diaconate changes (next: January 2027).
// Complete as of August 2026: five deacons.
// (Care circles are a different count — seven, the five deacons plus the two pastors.)
const DEACONS = [
  "Janis Wright",
  "Gayle Songer",
  "Richard Flaherty",
  "Jim Butler",
  "Aaron Smith",
];

// Same person under a different name. Left side is what a plan might say.
const DEACON_ALIASES = { "dick flaherty": "richard flaherty" };

// Greeter-float / Scripture-reading rotation, from the sign-up sheet.
// null = not yet assigned; no rotation check runs for that week.
const FLOATING_DEACON_BY_WEEK = {
  1: "Janis Wright",
  2: "Gayle Songer",
  3: "Richard Flaherty",   // "Dick"
  4: "Jim Butler",
  5: "Aaron Smith",   // rare fifth Sundays only
};

const normName = n => {
  const k = String(n || "").trim().toLowerCase().replace(/\s+/g, " ");
  return DEACON_ALIASES[k] || k;
};
const isDeaconName = (name, planDeacons) => {
  const n = normName(name);
  if (!n) return false;
  return DEACONS.some(d => normName(d) === n)
      || (planDeacons || []).some(d => normName(d) === n);
};

// Offering collection isn't in the worship plan's roster, so it lives here.
// Edit these two lines if the lead or the contacts change.
const OFFERING_LEAD = "Terry Harke";
const OFFERING_CONTACTS = ["Terry Harke", "Dick Flaherty"];

// Add a title to a single bare name. Idempotent — never double-prefixes.
function titleOne(name, { useSuffix = true } = {}) {
  const bare = String(name || "").trim();
  if (!bare) return bare;
  const stripped = bare.replace(/^(Rev\.|Pastor|Dr\.)\s+/i, "").replace(/,\s*(Worship Director)$/i, "").trim();
  const t = STAFF_TITLES[stripped];
  if (!t) return bare;
  let out = stripped;
  if (t.prefix) out = `${t.prefix} ${out}`;
  if (t.suffix && useSuffix) out = `${out}, ${t.suffix}`;
  return out;
}

// Known suffix titles, stripped before splitting so that an already-titled string
// like "Cynthia Smith, Worship Director" isn't torn apart on its own comma.
const SUFFIX_RE = new RegExp(
  ",\\s*(" + Object.values(STAFF_TITLES).map(t => t.suffix).filter(Boolean)
    .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b",
  "gi"
);

// Leader fields can hold "Caroline Koby & Molly Flodder" or "A, B". Title each part.
function titleNames(value, opts) {
  if (!value) return value;
  return String(value)
    .replace(SUFFIX_RE, "")
    .split(/\s*(&|,| and )\s*/)
    .map(part => (/^(&|,| and )$/.test(part) ? part : titleOne(part, opts)))
    .join("")
    .replace(/&/g, " & ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// Rename the non-sermon reading to its actual testament, in the order of worship and
// on the deacon sheet. If the passage can't be identified, the plan's own wording stays.
function normalizeReadings(o) {
  if (!o) return o;
  const other = o.otherReading || null;
  const elements = (o.elements || []).map(el => {
    if (!el || !el.name || !OTHER_READING_RE.test(String(el.name).trim())) return el;
    const ref = el.detail || (other && other.reference);
    return { ...el, name: readingLabel(ref, el.name) };
  });
  const otherOut = other
    ? { ...other, label: readingLabel(other.reference, "Other Reading") }
    : other;
  return { ...o, elements, otherReading: otherOut };
}

// The sermon reading is the deacons' responsibility, but a deacon may hand it to a
// church member. Only label the reader "Deacon" when they actually appear on THIS
// Sunday's deacon roster — on a week where a designee is already named, the plain name
// is correct and calling them a deacon would not be. Editable afterward either way.
function labelDeaconReader(o) {
  if (!o) return o;
  const els = o.elements || [];

  // "Sermon Scripture Reading" starts with "Sermon" but is the reading, not the sermon.
  const isSermon = n => /^(sermon|message)\b/i.test(String(n).trim()) && !/reading/i.test(String(n));
  const sermonIdx = els.findIndex(e => e && isSermon(e.name));
  if (sermonIdx < 0) return o;

  // nearest reading above the sermon — the same rule the extraction prompt uses
  for (let i = sermonIdx - 1; i >= 0; i--) {
    const el = els[i];
    if (!el || !/reading/i.test(String(el.name || ""))) continue;
    if (!el.leader || /^deacon\s/i.test(el.leader)) return o;
    if (!isDeaconName(el.leader, o.deacons)) return o;   // already a designee
    const next = [...els];
    next[i] = { ...el, leader: `Deacon ${el.leader} (or designee)` };
    return { ...o, elements: next };
  }
  return o;
}

// Walk an extracted order object and apply titles everywhere a person appears.
// Suffix titles are omitted in the narrow congregational leader column.
function applyStaffTitles(o) {
  if (!o) return o;
  const narrow = { useSuffix: SUFFIX_ON_HALFSHEET };
  return {
    ...o,
    elements: (o.elements || []).map(el => ({ ...el, leader: titleNames(el.leader, narrow) })),
    presiding: titleNames(o.presiding),
    reader: titleNames(o.reader),
    preacher: titleNames(o.preacher),
    sermonReading: o.sermonReading ? { ...o.sermonReading, leader: titleNames(o.sermonReading.leader) } : null,
    otherReading: o.otherReading ? { ...o.otherReading, leader: titleNames(o.otherReading.leader) } : null,
    deacons: (o.deacons || []).map(n => titleOne(n)),
    praiseTeam: (o.praiseTeam || []).map(r => ({ ...r, names: (r.names || []).map(n => titleOne(n)) })),
    avTeam: (o.avTeam || []).map(r => ({ ...r, names: (r.names || []).map(n => titleOne(n)) })),
    otherTeams: (o.otherTeams || []).map(r => ({ ...r, names: (r.names || []).map(n => titleOne(n)) })),
  };
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

// ─── Order of worship ─────────────────────────────────────────────────────────
// Congregational view: element + leader. Praise team is collapsed to a single
// line on purpose — the full team already receives the complete order of worship.
function OrderOfWorship({ order, responseInstructions }) {
  const els = (order?.elements || []).filter(e => e && e.name);
  const heading = (label) => (
    <div style={{
      fontSize: "11.5px", letterSpacing: "0.14em", textTransform: "uppercase",
      color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold",
      marginBottom: "5px", marginTop: "9px",
    }}>{label}</div>
  );
  const renderResponse = (text) => {
    if (!text) return null;
    const allLines = text.split("\n");
    const headingText = allLines[0] || "";
    const items = allLines.slice(1).filter(l => l.trim());
    return (
      <div style={{ marginTop: "2px" }}>
        {heading(headingText)}
        {items.map((line, i) => (
          <div key={i} style={{
            fontSize: "10px", color: "#333", lineHeight: 1.45, marginBottom: "2px",
            ...(/^\s+/.test(line) ? { paddingLeft: "12px" } : {}),
          }}>{line.trim()}</div>
        ))}
      </div>
    );
  };
  return (
    <div style={{ marginTop: "6px", paddingTop: "2px" }}>
      {heading("Order of Worship")}
      {els.map((el, i) => {
        const newSection = el.section && el.section !== (els[i - 1] || {}).section;
        return (
          <div key={i}>
            {newSection && (
              <div style={{
                fontSize: "10.5px", fontStyle: "italic", color: GOLD,
                fontFamily: "Arial, sans-serif", fontWeight: "600",
                borderBottom: "0.5px solid #e8e0d0", paddingBottom: "1.5px",
                marginTop: i === 0 ? "2px" : "7px", marginBottom: "4px",
              }}>{el.section}</div>
            )}
            <div style={{
              display: "flex", alignItems: "baseline", gap: "5px",
              marginBottom: "3.5px", fontSize: "12px", lineHeight: 1.3,
            }}>
              <span style={{ fontWeight: "bold", color: DARK, whiteSpace: "nowrap" }}>{el.name}</span>
              {el.detail && (
                <span style={{ fontStyle: "italic", color: "#555", fontSize: "11px" }}>{el.detail}</span>
              )}
              <span style={{ flex: 1, borderBottom: "0.5px dotted #bbb", minWidth: "10px" }} />
              {el.leader && (
                <span style={{ color: GOLD, fontSize: "11px", whiteSpace: "nowrap" }}>{el.leader}</span>
              )}
            </div>
          </div>
        );
      })}
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
            <div>{bold("New Here?")} Visit bit.ly/churchtracFBCM</div>
            <div>{bold("Socials:")} linktr.ee/fbcmuncie</div>
          </div>
        </div>
        <img src={QR_CODE} alt="QR Code" style={{ height: "54px", width: "54px", objectFit: "contain", flexShrink: 0 }} />
      </div>
      <div style={{ textAlign: "center", fontSize: "9px", fontStyle: "italic", color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "600", letterSpacing: "0.02em", marginTop: "6px" }}>
        &ldquo;Praise &amp; Proclaim&rdquo; — Isaiah 12:4
      </div>
      <div style={{ borderTop: "0.5px solid #ddd", marginTop: "5px", paddingTop: "4px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "7px", color: "#999", fontFamily: "Arial, sans-serif" }}>fbcmuncie.org</span>
        <span style={{ fontSize: "7px", color: "#999", fontFamily: "Arial, sans-serif" }}>Church Connect App</span>
      </div>
    </div>
  );
}

// ─── Front half-sheet ─────────────────────────────────────────────────────────
function HalfSheetFront({ data, onCutoffChange, communion }) {
  const outerRef = useRef(null);
  const annRefs = useRef([]);
  const [cutoffIdx, setCutoffIdx] = useState(null);

  const base = data?.announcements || [];
  const announcements = communion ? [...base, KIDS_COMMUNION_ANNOUNCEMENT] : base;
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
          View the full WW anytime on the <span style={{ fontWeight: "bold", color: DARK }}>Church Connect</span> app:<br/>
          <span style={{ fontWeight: "bold", color: DARK }}>bit.ly/churchtracFBCM</span>
        </div>
        <div style={{ borderTop: `1.5px solid ${GOLD}`, marginBottom: "10px" }} />

        {/* Moved from the back page: the Wednesday news now points forward to Sunday. */}
        {data?.sermon && (data.sermon.title || data.sermon.scripture) && (
          <div style={{
            background: "#fdf8f0", border: `1px solid ${GOLD}`,
            borderLeft: `3.5px solid ${GOLD}`, borderRadius: "3px",
            padding: "7px 9px", marginBottom: "10px",
          }}>
            <div style={{ fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, fontFamily: "Arial, sans-serif", fontWeight: "bold", marginBottom: "3px" }}>
              This Sunday's Message
            </div>
            {data.sermon.series && (
              <div style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", fontFamily: "Arial, sans-serif", fontWeight: "bold", marginBottom: "2px" }}>
                {data.sermon.series}
              </div>
            )}
            {data.sermon.title && (
              <div style={{ fontSize: "13px", fontWeight: "bold", color: DARK, lineHeight: 1.25, marginBottom: "2px" }}>
                {"“"}{data.sermon.title}{"”"}
              </div>
            )}
            {data.sermon.scripture && (
              <div style={{ fontSize: "10.5px", color: "#555", fontStyle: "italic" }}>
                {data.sermon.scripture}
              </div>
            )}
          </div>
        )}

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
          <div style={{ fontSize: "7px", color: "#999", fontFamily: "Arial, sans-serif" }}>Church Connect App</div>
        </div>
      </div>
    </div>
  );
}

// ─── Back half-sheet ──────────────────────────────────────────────────────────
function HalfSheetBack({ data, responseInstructions, backDate, backMode, order }) {
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
        {/* Logo removed and the theme line moved to the footer: both were repeating
            the front page and costing the order of worship about half an inch. */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "11px", fontWeight: "bold", fontFamily: "Arial, sans-serif", color: DARK, letterSpacing: "0.04em" }}>
            Sunday Worship at FBCM
          </div>
          <div style={{ fontSize: "8.5px", color: "#666", fontFamily: "Arial, sans-serif", marginTop: "2px", fontStyle: "italic" }}>
            {backDate || getNextSunday(data?.date) || ""}
          </div>
        </div>
        <div style={{ borderTop: `1.5px solid ${GOLD}`, marginBottom: "10px" }} />


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

        {backMode === "order"
          ? <OrderOfWorship order={order} responseInstructions={responseInstructions} />
          : <SermonNotes responseInstructions={responseInstructions} />}
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

  // ── Order of worship (CHMS-neutral: paste from ChurchTrac, PCO, or anywhere)
  const [orderInput, setOrderInput] = useState("");
  const [order, setOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [backMode, setBackMode] = useState("notes"); // "notes" | "order"
  const [pdfStatus, setPdfStatus] = useState("idle");
  const [servingPdfStatus, setServingPdfStatus] = useState("idle");
  const [drivePdfStatus, setDrivePdfStatus] = useState("idle");
  const [driveLinks, setDriveLinks] = useState(null);
  const [orderEditorOpen, setOrderEditorOpen] = useState(false);
  const [dateWarning, setDateWarning] = useState("");

  // ─── Edit helpers (update data in-place → preview refreshes live) ─────────
  function startOver() { setData(null); setEditMode(false); setError(""); setResponseInstructions(""); setBackDate(""); setResponseMode("ways_to_respond"); setOrder(null); setOrderInput(""); setBackMode("notes"); setDateWarning(""); }

  // ─── Order-of-worship edit helpers ───────────────────────────────────────
  function setOrderField(i, field, val) {
    setOrder(o => ({ ...o, elements: o.elements.map((e, idx) => idx === i ? { ...e, [field]: val } : e) }));
  }
  function addOrderRow() {
    setOrder(o => ({ ...(o || {}), elements: [...((o && o.elements) || []), { name: "", leader: "", detail: "" }] }));
  }
  function removeOrderRow(i) {
    setOrder(o => ({ ...o, elements: o.elements.filter((_, idx) => idx !== i) }));
  }
  function moveOrderRow(i, dir) {
    setOrder(o => {
      const els = [...o.elements];
      const j = i + dir;
      if (j < 0 || j >= els.length) return o;
      [els[i], els[j]] = [els[j], els[i]];
      return { ...o, elements: els };
    });
  }
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
    if (responseMode === "lords_supper") front.push(KIDS_COMMUNION_ANNOUNCEMENT);
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
        View the full WW anytime on the <strong>Church Connect</strong> app:&nbsp;&nbsp;<strong>bit.ly/churchtracFBCM</strong>
      </div>`;
    const backHeadingHtml = `
      <div style="text-align:center;margin-bottom:8pt;">
        <div style="font-size:11pt;font-weight:bold;font-family:Arial,sans-serif;color:#1a1a2e;letter-spacing:0.04em;">Sunday Worship at FBCM</div>
        <div style="font-size:8.5pt;color:#666;font-family:Arial,sans-serif;margin-top:2pt;font-style:italic;">${resolvedBackDate || ""}</div>
      </div>`;
    const rule = `<div style="border-top:1.5pt solid #292854;margin-bottom:8pt;"></div>`;

    // ── Sermon box: table for reliable border rendering ─────────────────────
    const messageBlock = (d.sermon && (d.sermon.title || d.sermon.scripture)) ? `
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:7pt;background-color:#fdf8f0;border:1pt solid #292854;border-left:4pt solid #292854;"><tr>
        <td style="padding:6pt 8pt;background-color:#fdf8f0;">
          <div style="font-size:8pt;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:3pt;">This Sunday&rsquo;s Message</div>
          ${d.sermon.series ? `<div style="font-size:9pt;letter-spacing:0.1em;text-transform:uppercase;color:#777;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:2pt;">${d.sermon.series}</div>` : ""}
          ${d.sermon.title  ? `<div style="font-size:13pt;font-weight:bold;color:#1a1a2e;line-height:1.25;margin-bottom:2pt;">&ldquo;${d.sermon.title}&rdquo;</div>` : ""}
          ${d.sermon.scripture ? `<div style="font-size:10.5pt;color:#555;font-style:italic;">${d.sermon.scripture}</div>` : ""}
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

    // ── Order of worship (table rows so Word/Docs keep the two columns) ─────
    const elsTwo = (order?.elements || []).filter(e => e && e.name);
    const orderRows = elsTwo.map((el, i) => {
      const newSection = el.section && el.section !== (elsTwo[i - 1] || {}).section;
      return `
      ${newSection ? `<tr><td colspan="2" style="padding:5pt 0 2pt;font-size:9pt;font-style:italic;color:#292854;font-family:Arial,sans-serif;font-weight:600;border-bottom:0.5pt solid #e8e0d0;">${el.section}</td></tr>` : ""}
      <tr>
        <td style="padding:1.5pt 0;font-size:10.5pt;color:#1a1a2e;line-height:1.3;">
          <strong>${el.name}</strong>${el.detail ? ` <span style="font-style:italic;color:#555;font-size:9.5pt;">${el.detail}</span>` : ""}
        </td>
        <td style="padding:1.5pt 0;font-size:9.5pt;color:#292854;text-align:right;white-space:nowrap;vertical-align:bottom;">
          ${el.leader || ""}
        </td>
      </tr>`;
    }).join("");
    const orderBlock = `
      <div style="margin-top:6pt;padding-top:2pt;">
        ${noteHead("Order of Worship")}
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">${orderRows}</table>
        ${renderResponseHtmlTwo(ri)}
      </div>`;

    const backBody = backMode === "order" ? orderBlock : sermonNotes;

    // ── Stay Connected footer: table for text + QR side by side ────────────
    const connectFooter = `
      <div style="border-top:1.5pt solid #292854;padding-top:5pt;margin-top:5pt;">
        <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:4pt;"><tr>
          <td style="vertical-align:top;">
            <div style="font-size:8pt;letter-spacing:0.12em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:4pt;">Stay Connected</div>
            <div style="font-size:8.5pt;color:#333;line-height:1.8;font-family:Arial,sans-serif;">
              <div>info@fbcmuncie.org &nbsp;|&nbsp; 765-284-7749</div>
              <div>309 East Adams Street, Muncie, IN 47305</div>
              <div><strong>New Here?</strong> Visit bit.ly/churchtracFBCM</div>
              <div><strong>Socials:</strong> linktr.ee/fbcmuncie</div>
            </div>
          </td>
          <td style="width:135pt;text-align:right;vertical-align:middle;">
            <img src="${QR_CODE}" style="height:125px;width:125px;" alt="QR"/>
          </td>
        </tr></table>
        <div style="text-align:center;font-size:9pt;font-style:italic;color:#292854;font-family:Arial,sans-serif;font-weight:600;margin-top:6pt;margin-bottom:4pt;">&ldquo;Praise &amp; Proclaim&rdquo; &mdash; Isaiah 12:4</div>
        <table cellpadding="0" cellspacing="4pt" border="0" style="width:100%;border-top:0.5pt solid #ddd;"><tr>
          <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</td>
          <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;text-align:right;">Church Connect App</td>
        </tr></table>
      </div>`;

    // ── Mini footer on front page ───────────────────────────────────────────
    const miniFooter = `
      <table cellpadding="0" cellspacing="4pt" border="0" style="width:100%;border-top:0.5pt solid #ddd;margin-top:8pt;"><tr>
        <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</td>
        ${hasBack ? `<td style="font-size:7pt;color:#292854;font-family:Arial,sans-serif;font-style:italic;text-align:center;">continued on back</td>` : `<td></td>`}
        <td style="font-size:7pt;color:#999;font-family:Arial,sans-serif;text-align:right;">Church Connect App</td>
      </tr></table>`;

    // ── Half-page cell style ────────────────────────────────────────────────
    const cell = "width:5.5in;padding:0.38in 0.42in 0.3in;vertical-align:top;font-family:Georgia,serif;color:#1a1a2e;";
    const divider = `<td style="width:1px;border-left:1pt dashed #bbb;">&nbsp;</td>`;

    const frontCell = `<td style="${cell}">
      ${logoHtml}${frontHeadingHtml}${rule}${messageBlock}
      ${sectionHead("Announcements")}
      ${front.map((item,i) => annoItem(item, i===front.length-1)).join("")}
      ${miniFooter}
    </td>`;

    const backCell = `<td style="width:5.5in;padding:0.18in 0.42in 0.3in;vertical-align:top;font-family:Georgia,serif;color:#1a1a2e;">
      ${backHeadingHtml}${rule}
      ${back.length > 0 ? sectionHead("Announcements (cont.)") + back.map((item,i) => annoItem(item, i===back.length-1)).join("") : ""}
      ${backBody}
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
    if (responseMode === "lords_supper") front.push(KIDS_COMMUNION_ANNOUNCEMENT);
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
        View the full WW anytime on the <strong>Church Connect</strong> app:&nbsp;&nbsp;<strong>bit.ly/churchtracFBCM</strong>
      </div>`;
    const backHeadingHtml = `
      <div style="text-align:center;margin-bottom:8px;">
        <div style="font-size:11px;font-weight:bold;font-family:Arial,sans-serif;color:#1a1a2e;letter-spacing:0.04em;">Sunday Worship at FBCM</div>
        <div style="font-size:8.5px;color:#666;font-family:Arial,sans-serif;margin-top:2px;font-style:italic;">${resolvedBackDate || ""}</div>
      </div>`;
    const ruleHtml = `<div style="border-top:1.5px solid #292854;margin-bottom:10px;"></div>`;

    // Moved to the FRONT page as "This Sunday's Message". No teaser — the interpretive
    // sentence is the one field that can be confidently wrong about scripture.
    const messageHtml = (d.sermon && (d.sermon.title || d.sermon.scripture)) ? `
      <div style="background:#fdf8f0;border:1px solid #292854;border-left:3.5px solid #292854;border-radius:3px;padding:7px 9px;margin-bottom:10px;">
        <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:3px;">This Sunday&rsquo;s Message</div>
        ${d.sermon.series ? `<div style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#777;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:2px;">${d.sermon.series}</div>` : ""}
        ${d.sermon.title ? `<div style="font-size:13px;font-weight:bold;color:#1a1a2e;line-height:1.25;margin-bottom:2px;">&ldquo;${d.sermon.title}&rdquo;</div>` : ""}
        ${d.sermon.scripture ? `<div style="font-size:10.5px;color:#555;font-style:italic;">${d.sermon.scripture}</div>` : ""}
      </div>` : "";

    const noteHeading = (label) => `<div style="font-size:11.5px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:3px;margin-top:9px;">${label}</div>`;
    const noteLine = () => `<div style="border-bottom:0.5px solid #ccc;height:18px;margin-bottom:2px;"></div>`;
    const noteLines = (n) => Array.from({length: n}).map(() => noteLine()).join("");
    const renderResponseHtmlPrint = (text) => {
      if (!text) return "";
      const allLines = text.split("\n");
      const h = allLines[0] || "";
      const items = allLines.slice(1).filter(l => l.trim());
      return noteHeading(h) + items.map(line => {
        const isIndented = /^\s+/.test(line);
        return `<div style="font-size:10.5px;line-height:1.5;color:#333;margin-bottom:2.5px;${isIndented ? "padding-left:12px;" : ""}">${line.trim()}</div>`;
      }).join("");
    };

    const sermonNotesHtml = `
      <div style="margin-top:6px;padding-top:2px;">
        ${noteHeading("Main Point")}${noteLines(2)}
        ${noteHeading("Connections")}${noteLines(5)}
        ${noteHeading("Prayer Response")}${noteLines(5)}
        ${renderResponseHtmlPrint(ri)}
      </div>`;

    // ── Order of worship (print) ────────────────────────────────────────────
    const elsPrint = (order?.elements || []).filter(e => e && e.name);
    const orderRowsPrint = elsPrint.map((el, i) => {
      const newSection = el.section && el.section !== (elsPrint[i - 1] || {}).section;
      return `
      ${newSection ? `<div style="font-size:10.5px;font-style:italic;color:#292854;font-family:Arial,sans-serif;font-weight:600;border-bottom:0.5px solid #e8e0d0;padding-bottom:1.5px;margin-top:${i === 0 ? "2px" : "7px"};margin-bottom:4px;">${el.section}</div>` : ""}
      <div style="display:flex;align-items:baseline;gap:5px;margin-bottom:3.5px;font-size:12px;line-height:1.3;">
        <span style="font-weight:bold;color:#1a1a2e;white-space:nowrap;">${el.name}</span>
        ${el.detail ? `<span style="font-style:italic;color:#555;font-size:11px;">${el.detail}</span>` : ""}
        <span style="flex:1;border-bottom:0.5px dotted #bbb;min-width:10px;"></span>
        ${el.leader ? `<span style="color:#292854;font-size:11px;white-space:nowrap;">${el.leader}</span>` : ""}
      </div>`;
    }).join("");
    const orderHtmlPrint = `
      <div style="margin-top:6px;padding-top:2px;">
        ${noteHeading("Order of Worship")}
        ${orderRowsPrint}
        ${renderResponseHtmlPrint(ri)}
      </div>`;

    const backBodyHtml = backMode === "order" ? orderHtmlPrint : sermonNotesHtml;

    const connectFooterHtml = `
      <div style="border-top:1.5px solid #292854;padding-top:8px;margin-top:4px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="flex:1;">
            <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;margin-bottom:5px;">Stay Connected</div>
            <div style="font-size:8.5px;color:#333;line-height:1.8;font-family:Arial,sans-serif;">
              <div>info@fbcmuncie.org  |  765-284-7749</div>
              <div>309 East Adams Street, Muncie, IN 47305</div>
              <div><strong>New Here?</strong> Visit bit.ly/churchtracFBCM</div>
              <div><strong>Socials:</strong> linktr.ee/fbcmuncie</div>
            </div>
          </div>
          <img src="${QR_CODE}" style="height:54px;width:54px;object-fit:contain;flex-shrink:0;" alt="QR"/>
        </div>
        <div style="text-align:center;font-size:9px;font-style:italic;color:#292854;font-family:Arial,sans-serif;font-weight:600;letter-spacing:0.02em;margin-top:6px;">&ldquo;Praise &amp; Proclaim&rdquo; &mdash; Isaiah 12:4</div>
        <div style="border-top:0.5px solid #ddd;margin-top:5px;padding-top:4px;display:flex;justify-content:space-between;">
          <span style="font-size:7px;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</span>
          <span style="font-size:7px;color:#999;font-family:Arial,sans-serif;">Church Connect App</span>
        </div>
      </div>`;

    const hs = "width:5.5in;height:8.5in;background:white;box-sizing:border-box;font-family:Georgia,serif;color:#1a1a2e;overflow:hidden;";
    const inner = "padding:0.38in 0.42in 0.32in;box-sizing:border-box;display:flex;flex-direction:column;height:100%;";

    const frontCol = () => `
      <div class="halfpage" style="${hs}">
        <div style="${inner}">
          ${logoHtml}${frontHeadingHtml}${ruleHtml}${messageHtml}
          <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;border-bottom:0.5px solid #ddd;padding-bottom:3px;margin-bottom:8px;">Announcements</div>
          <div>${front.map((item, i) => annoItem(item, i === front.length - 1)).join("")}</div>
          <div style="flex:1;"></div>
          <div style="border-top:0.5px solid #ddd;padding-top:5px;display:flex;justify-content:space-between;">
            <div style="font-size:7px;color:#999;font-family:Arial,sans-serif;">fbcmuncie.org</div>
            ${hasBack ? `<div style="font-size:7px;color:#292854;font-family:Arial,sans-serif;font-style:italic;">continued on back</div>` : ""}
            <div style="font-size:7px;color:#999;font-family:Arial,sans-serif;">Church Connect App</div>
          </div>
        </div>
      </div>`;

    const backCol = () => `
      <div class="halfpage" style="${hs}">
        <div style="${inner}">
          ${backHeadingHtml}${ruleHtml}
          ${back.length > 0 ? `
            <div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:#292854;font-family:Arial,sans-serif;font-weight:bold;border-bottom:0.5px solid #ddd;padding-bottom:3px;margin-bottom:8px;">Announcements (cont.)</div>
            <div>${back.map((item, i) => annoItem(item, i === back.length - 1)).join("")}</div>
          ` : ""}
          ${backBodyHtml}
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
  ${FIT_SCRIPT}
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`;
  }

  // ── Deacon "Serving Today" card ────────────────────────────────────────────
  // Not for the congregation. Printed for the deacons serving that Sunday.
  // Procedure text is from the FBCM Deacon Handbook (2024 update); the names,
  // cues, and communion flag come from the pasted worship plan.
  function buildServingPageHTML() {
    const o = order || {};
    const isCommunion = !!o.isCommunion;
    const deacons = (o.deacons || []).filter(Boolean);
    const dateStr = backDate || getNextSunday(data?.date) || "";
    const esc = s => String(s == null ? "" : s);

    const h = (label) => `<div style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;font-weight:bold;margin:11px 0 5px;border-bottom:0.5px solid #e8e0d0;padding-bottom:2px;">${label}</div>`;
    const li = (t) => `<div style="font-size:16px;line-height:1.45;color:#222;margin-bottom:4px;padding-left:11px;text-indent:-11px;">• ${t}</div>`;
    const strong = t => `<strong>${t}</strong>`;

    const roleLine = [
      o.presiding ? `Presiding: ${strong(esc(o.presiding))}` : null,
      (o.sermonReading?.leader || o.reader) ? `Sermon Reading: ${strong(esc(o.sermonReading?.leader || o.reader))}` : null,
      o.otherReading?.leader ? `${(o.otherReading.label || "").startsWith("Old") ? "OT" : (o.otherReading.label || "").startsWith("New") ? "NT" : "Other"} Reading: ${strong(esc(o.otherReading.leader))}` : null,
      o.preacher ? `Preaching: ${strong(esc(o.preacher))}` : null,
    ].filter(Boolean).join(" &nbsp;·&nbsp; ");

    const before = [
      li(`${strong("Floating greeter")} — greet and float before and during the gathering.`),
      isCommunion ? li(`${strong("Set the table.")} Deacon Chair prepares the elements. Gloves, clean cloth.`) : null,
      isCommunion ? li(`${strong("Tray setup —")} 2 stacks, lid on top. Each: Juice / Bread / 3rd tray. One 3rd tray empty (symmetry), the other Bread &amp; Juice combined — that one goes to seats. Cups outer ring, bread on a napkin in the center.`) : null,
    ].filter(Boolean).join("");

    // Two readings, and only one of them is the deacons'. Name the passage and the
    // position explicitly so nobody stands up for the wrong one.
    const sr = o.sermonReading || {};
    const or = o.otherReading || {};
    const srWho = sr.leader || o.reader;
    const during = [
      // If the named reader isn't a deacon, a designee is already arranged — say so
      // rather than telling the deacon to arrange one.
      (() => {
        const covered = srWho && !isDeaconName(srWho, o.deacons);
        return li(
          `${strong("Scripture Reading &mdash; yours, right before the sermon.")}` +
          (sr.reference ? ` ${strong(esc(sr.reference))}.` : "") +
          (covered
            ? ` ${strong("Covered by " + esc(srWho))}` + ` &mdash; no action needed unless that changes.`
            : (srWho ? ` Read by ${esc(srWho)}.` : "") + ` Deacons alternate; arrange a sub if you can't.`)
        );
      })(),
      (or.reference || or.leader)
        ? li(`${strong(esc(or.label || "Other Reading"))} &mdash; ${or.reference ? esc(or.reference) + ", " : ""}earlier${or.leader ? `, read by ${esc(or.leader)}` : ""}. Usually staff. ${strong("Not yours.")}`)
        : null,
      isCommunion ? li(`${strong("Communion")} — Pastors lead prayers, words of institution, bread. ${strong("2 deacons serve the cup; 1 takes a tray")} to those who can't come forward — limited mobility, and volunteers at posts (nursery, sound, security).`) : null,
      o.offeringCue
        ? li(`${strong("Offering")} — during ${strong("&ldquo;" + esc(o.offeringCue) + "&rdquo;")}, the first song after ${isCommunion ? "the Lord's Supper" : "the sermon"}. Watch the worship leader, not the clock.`)
        : li(`${strong("Offering")} — the first song after ${isCommunion ? "the Lord's Supper" : "the sermon"}. Confirm the song title with the presiding leader before the service.`),
      isCommunion ? li(`${strong("Mercy offering")} — at the exits on the way out.`) : null,
    ].filter(Boolean).join("");

    const after = isCommunion ? [
      li(`${strong("Package")} elements for the homebound in your circle.`),
      li(`${strong("Dispose")} of the rest respectfully; clean all supplies.`),
      li(`${strong("Visit within one week.")} If you can't, trade with a deacon or reschedule this month — elements are perishable.`),
    ].join("") : li(`Reset anything you moved; check with the presiding leader before you leave.`);

    const deaconColumn = `
      ${deacons.length ? `
        <div style="background:#fdf8f0;border:1px solid ${GOLD};border-left:4px solid ${GOLD};padding:7px 10px;margin-bottom:6px;">
          <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;font-weight:bold;margin-bottom:3px;">Deacons Serving</div>
          <div style="font-size:18px;font-weight:bold;line-height:1.4;">${deacons.map(esc).join(" &nbsp;·&nbsp; ")}</div>
        </div>` : ""}
      ${h("Before Worship")}${before}
      ${h("During Worship")}${during}
      ${h("After Worship")}${after}`;

    // ── The rest of the teams serving ────────────────────────────────────────
    const roleBlock = (rows) => rows.filter(r => r && (r.names || []).length).map(r => `
      <div style="display:flex;align-items:baseline;gap:5px;margin-bottom:3px;font-size:16px;line-height:1.35;">
        <span style="color:#555;font-family:Arial,sans-serif;font-size:13px;white-space:nowrap;">${esc(r.role)}</span>
        <span style="flex:1;border-bottom:0.5px dotted #ddd;min-width:8px;"></span>
        <span style="font-weight:bold;color:#1a1a2e;text-align:right;">${(r.names || []).map(esc).join(" &nbsp;·&nbsp; ")}</span>
      </div>`).join("");

    const pt = o.praiseTeam || [];
    const av = o.avTeam || [];
    const others = o.otherTeams || [];
    const byTeam = {};
    others.forEach(r => { if (!r) return; (byTeam[r.team || "Also Serving"] ||= []).push(r); });

    const teamsColumn = `
      ${pt.length ? h("Praise Team") + roleBlock(pt) + `
        <div style="margin-top:5px;background:#fdf8f0;border-left:3px solid ${GOLD};padding:5px 8px;font-size:13px;color:#444;font-family:Arial,sans-serif;line-height:1.4;">
          <strong>Praise Team Practice &mdash; Thursday, 6:30 PM.</strong> Choir and other specials rehearse separately.
        </div>` : ""}
      ${av.length ? h("Audio / Visual Team") + roleBlock(av) : ""}
      ${Object.keys(byTeam).map(t => h(t) + roleBlock(byTeam[t])).join("")}`;

    // ── Offering: its own highlighted block. The timing is what people get wrong,
    //    so lead with the actual song name for this specific Sunday.
    const offeringWhen = o.offeringCue
      ? `Collected during <strong>&ldquo;${esc(o.offeringCue)}&rdquo;</strong> &mdash; the song ${isCommunion ? "after the Lord's Supper" : "after the sermon"}.`
      : `Collected during the song ${isCommunion ? "after the Lord's Supper" : "after the sermon"}. Confirm the title with the presiding leader before the service.`;

    const offeringBlock = `
      <div style="background:#fdf8f0;border:1px solid ${GOLD};border-left:4px solid ${GOLD};padding:8px 11px;margin-top:10px;">
        <div style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};font-family:Arial,sans-serif;font-weight:bold;margin-bottom:4px;">Offering</div>
        <div style="font-size:16px;color:#222;line-height:1.5;margin-bottom:3px;">${offeringWhen}</div>
        <div style="font-size:16px;color:#333;font-family:Arial,sans-serif;line-height:1.5;">
          Generally led by <strong>${esc(OFFERING_LEAD)}</strong>; those collecting vary week to week.
        </div>
        <div style="font-size:13px;color:#555;font-family:Arial,sans-serif;line-height:1.5;margin-top:3px;">
          Questions about helping collect the offering? Contact ${OFFERING_CONTACTS.map(esc).join(" or ")}.
        </div>
      </div>`;

    // ── One portrait letter page. Deacon duties left, everyone serving right.
    //    No duplication: this is linked from the Weekly, not printed in a stack.
    const page = `
      <div class="fullpage" style="width:8.5in;height:11in;background:white;box-sizing:border-box;font-family:Georgia,serif;color:#1a1a2e;overflow:hidden;">
        <div style="padding:0.5in 0.55in 0.4in;box-sizing:border-box;display:flex;flex-direction:column;height:100%;">
          <div style="text-align:center;margin-bottom:8px;">
            <div style="font-size:26px;font-weight:bold;font-family:Arial,sans-serif;letter-spacing:0.05em;">WHO'S SERVING SUNDAY</div>
            <div style="font-size:14px;color:${GOLD};font-family:Arial,sans-serif;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">
              First Baptist Muncie${isCommunion ? " &mdash; Communion Sunday" : ""}
            </div>
            <div style="font-size:16px;color:#666;font-family:Arial,sans-serif;font-style:italic;margin-top:4px;">${esc(dateStr)}${o.serviceTitle ? " &nbsp;·&nbsp; " + esc(o.serviceTitle) : ""}</div>
          </div>
          <div style="border-top:1.5px solid ${GOLD};margin-bottom:9px;"></div>

          ${roleLine ? `<div style="font-size:14px;color:#333;font-family:Arial,sans-serif;line-height:1.7;margin-bottom:8px;text-align:center;">${roleLine}</div>` : ""}

          <div style="display:flex;gap:26px;align-items:flex-start;">
            <div style="flex:1;min-width:0;">${deaconColumn}</div>
            <div style="width:1px;background:#e8e0d0;align-self:stretch;"></div>
            <div style="flex:1;min-width:0;">${teamsColumn}</div>
          </div>

          ${offeringBlock}

          <div style="flex:1;"></div>
          <div style="border-top:0.5px solid #ddd;padding-top:6px;font-size:11px;color:#999;font-family:Arial,sans-serif;display:flex;justify-content:space-between;">
            <span>First Baptist Church Muncie</span>
            <span>Thank you for serving.</span>
          </div>
        </div>
      </div>`;

    return page;
  }

  // Wrap the page in a printable document. Kept separate so the on-screen preview
  // can render the same markup without slicing strings out of a full HTML file.
  function buildDeaconCardHTML() {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Who's Serving Sunday</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:white;font-family:Georgia,serif;}
  @page{size:8.5in 11in portrait;margin:0;}
</style></head><body>
${buildServingPageHTML()}
${FIT_SCRIPT}
</body></html>`;
  }

  function printDeaconCard() {
    if (!order) return;
    const blob = new Blob([buildDeaconCardHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fbc-deacon-card.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Print/PDF equivalent of the useAutoShrink hook used in the on-screen preview.
  // Without this the print path clips at overflow:hidden instead of scaling, so a
  // long order of worship silently drops the footer (and the QR code) off the page.
  const FIT_SCRIPT = `<script>(function(){
  // Scaling down and widening by 100/scale keeps the visual width correct, but the
  // wider box reflows text into FEWER lines — so the content ends up shorter than the
  // measurement that justified the shrink. Measuring once over-shrinks badly (a 12pt
  // page came out at 78% with two inches of blank left over). Iterate to a fixed point.
  function fit(){
    var pages = document.querySelectorAll('.halfpage, .fullpage');
    for (var i=0;i<pages.length;i++){
      var outer = pages[i], inner = outer.firstElementChild;
      if(!inner) continue;
      inner.style.transform=''; inner.style.width='';
      inner.style.transformOrigin='top left';
      var avail = outer.clientHeight, s = 1, prevH = inner.style.height;
      for (var k=0;k<8;k++){
        inner.style.width = (100/s).toFixed(3)+'%';
        // The page is a flex column at height:100%. Flex children default to
        // flex-shrink:1, so an overrun COMPRESSES them instead of overflowing and
        // scrollHeight under-reports it — the footer silently loses its last lines.
        // Measure at height:auto so the true content height is visible, then restore.
        inner.style.height = 'auto';
        var nat = inner.scrollHeight;
        inner.style.height = prevH;
        var next = Math.min(1, avail/nat);
        if (Math.abs(next-s) < 0.004) { s = next; break; }
        s = next;
      }
      if (s < 0.999){
        inner.style.width = (100/s).toFixed(3)+'%';
        inner.style.transform = 'scale('+s.toFixed(4)+')';
      } else {
        inner.style.width=''; inner.style.transform='';
      }
    }
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fit);}else{fit();}
  window.addEventListener('load',fit);
})();<\/script>`;

  // ── PDF export (Chromium print engine via Electron main process) ───────────
  function stripAutoPrint(html) {
    return html.replace(/<script>window\.onload[\s\S]*?<\/script>/gi, "");
  }

  async function htmlToPdfBlob(html, { landscape = true } = {}) {
    if (!window.electronAPI?.htmlToPdf) {
      throw new Error("PDF export needs the desktop app. In the browser, use Download Print File and choose “Save as PDF” in the print dialog.");
    }
    const b64 = await window.electronAPI.htmlToPdf({ html: stripAutoPrint(html), landscape });
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    return new Blob([bytes], { type: "application/pdf" });
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function cleanDateSlug() {
    return data?.date
      ? data.date.replace(/^[A-Za-z]+,\s*/, "").replace(/(\d+)(st|nd|rd|th)/, "$1").replace(/,/g, "").trim()
      : "weekly";
  }

  async function downloadHalfSheetPdf() {
    if (!data) return;
    setPdfStatus("saving");
    try {
      const blob = await htmlToPdfBlob(buildPrintHTML(data, responseInstructions, backDate));
      triggerDownload(blob, `${cleanDateSlug()} FBC Half-Sheet.pdf`);
      setPdfStatus("done"); setTimeout(() => setPdfStatus("idle"), 4000);
    } catch (e) {
      console.error(e); setError(e.message || "PDF export failed.");
      setPdfStatus("error"); setTimeout(() => setPdfStatus("idle"), 3000);
    }
  }

  async function downloadServingPdf() {
    if (!order) return;
    setServingPdfStatus("saving");
    try {
      const blob = await htmlToPdfBlob(buildDeaconCardHTML(), { landscape: false });
      triggerDownload(blob, `${cleanDateSlug()} Who's Serving Sunday.pdf`);
      setServingPdfStatus("done"); setTimeout(() => setServingPdfStatus("idle"), 4000);
    } catch (e) {
      console.error(e); setError(e.message || "PDF export failed.");
      setServingPdfStatus("error"); setTimeout(() => setServingPdfStatus("idle"), 3000);
    }
  }

  // ── Drive: overwrite two fixed files so the Wednesday Weekly links never change ──
  // Filenames are deliberately undated. Replacing a file's CONTENT keeps its file ID,
  // so the shareable URL stays valid week after week and the email buttons are set once.
  const HALFSHEET_FILENAME = "FBC Half-Sheet.pdf";
  const SERVING_FILENAME = "Whos Serving Sunday.pdf";

  // "August 9, 2026" -> "2026-08-09" so archive copies sort chronologically in Drive.
  function sundaySlug() {
    const raw = backDate || getNextSunday(data?.date) || "";
    const d = new Date(cleanDateStr(raw));
    if (isNaN(d.getTime())) return cleanDateSlug();
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  // Archive copies live in an "Archive" subfolder so the shared folder stays tidy.
  // Falls back to the main folder if the subfolder can't be made.
  async function findOrCreateArchiveFolder(token) {
    try {
      const q = encodeURIComponent(`name='Archive' and '${FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
      const look = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)&supportsAllDrives=true&includeItemsFromAllDrives=true`,
        { headers: { Authorization: "Bearer " + token } }
      );
      if (look.ok) {
        const id = (await look.json()).files?.[0]?.id;
        if (id) return id;
      }
      const made = await fetch("https://www.googleapis.com/drive/v3/files?supportsAllDrives=true&fields=id", {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Archive", mimeType: "application/vnd.google-apps.folder", parents: [FOLDER_ID] }),
      });
      if (made.ok) return (await made.json()).id;
    } catch (e) { console.warn("Archive folder unavailable, using main folder:", e); }
    return FOLDER_ID;
  }

  async function findDriveFileId(token, name, parentId = FOLDER_ID) {
    const q = encodeURIComponent(`name='${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and trashed=false`);
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)&supportsAllDrives=true&includeItemsFromAllDrives=true`,
      { headers: { Authorization: "Bearer " + token } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.files?.[0]?.id || null;
  }

  // Returns the file id, creating the file on first run and replacing its bytes after.
  async function upsertDrivePdf(token, name, blob, parentId = FOLDER_ID) {
    const existingId = await findDriveFileId(token, name, parentId);
    if (existingId) {
      const res = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${existingId}?uploadType=media&supportsAllDrives=true`,
        { method: "PATCH", headers: { Authorization: "Bearer " + token, "Content-Type": "application/pdf" }, body: blob }
      );
      if (!res.ok) throw new Error(`Could not replace "${name}" (${res.status})`);
      return existingId;
    }
    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify({ name, mimeType: "application/pdf", parents: [parentId] })], { type: "application/json" }));
    form.append("file", blob);
    const res = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id",
      { method: "POST", headers: { Authorization: "Bearer " + token }, body: form }
    );
    if (!res.ok) throw new Error(`Could not create "${name}" (${res.status})`);
    return (await res.json()).id;
  }

  async function savePdfsToDrive() {
    if (!data) return;
    setDrivePdfStatus("saving");
    setDriveLinks(null);
    try {
      const token = await runOAuth();
      const archiveId = await findOrCreateArchiveFolder(token);
      const slug = sundaySlug();
      const links = {};

      // Build each PDF once, then write it twice: the permanent link copy and a
      // dated archive copy. Re-running the same week overwrites, never duplicates.
      const halfSheetPdf = await htmlToPdfBlob(buildPrintHTML(data, responseInstructions, backDate));
      links.halfSheet = await upsertDrivePdf(token, HALFSHEET_FILENAME, halfSheetPdf);
      await upsertDrivePdf(token, `${slug} ${HALFSHEET_FILENAME}`, halfSheetPdf, archiveId);

      if (order) {
        const servingPdf = await htmlToPdfBlob(buildDeaconCardHTML(), { landscape: false });
        links.serving = await upsertDrivePdf(token, SERVING_FILENAME, servingPdf);
        await upsertDrivePdf(token, `${slug} ${SERVING_FILENAME}`, servingPdf, archiveId);
      }
      setDriveLinks(links);
      setDrivePdfStatus("done"); setTimeout(() => setDrivePdfStatus("idle"), 5000);
    } catch (e) {
      console.error(e); setError(e.message || "Drive PDF upload failed.");
      setDrivePdfStatus("error"); setTimeout(() => setDrivePdfStatus("idle"), 3000);
    }
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

  // ── Order of worship extraction ────────────────────────────────────────────
  // Deliberately ChMS-neutral. ChurchTrac's API is closed, so there is nothing
  // to integrate against; this accepts pasted text from a ChurchTrac worship
  // outline, a Planning Center plan, an emailed service plan, or a typed list.
  async function generateOrder() {
    if (!orderInput.trim()) return;
    setOrderLoading(true);
    setError("");
    try {
      const parsed = await callClaudeJSON({
        user: `Extract the order of worship:\n\n${orderInput}`,
        system: `Extract a simplified congregational order of worship from a pasted worship service plan.
The plan may come from ChurchTrac, Planning Center, an email, or a typed list. Formats vary widely.
Return ONLY valid JSON, no markdown, no backticks, no explanation.

Schema:
{
  "serviceDate": "the service date printed on the plan, as 'Month D, YYYY', or null",
  "serviceTitle": "e.g. 'Promotion Sunday' or null",
  "isCommunion": true or false,
  "elements": [
    {
      "section": "liturgical movement heading this element falls under, or null",
      "name": "short service element name, title case",
      "leader": "full name of the person leading it, or null",
      "detail": "song title, scripture reference, or hymn number if it clarifies; else null"
    }
  ],
  "deacons": ["full names of deacons serving, if listed"],
  "presiding": "full name or null",
  "reader": "full name or null",
  "preacher": "full name or null",
  "sermonReading": { "reference": "passage or null", "leader": "full name or null" },
  "otherReading": { "reference": "passage or null", "leader": "full name or null" },
  "praiseTeam": [ { "role": "Piano", "names": ["Julie Kirklin"] } ],
  "avTeam": [ { "role": "Sound Board", "names": ["Ward Head"] } ],
  "otherTeams": [ { "team": "Greeters", "role": "Main Entrance", "names": ["Ella Lemen"] } ],
  "offeringCue": "name of the element during which the offering is collected, or null"
}

OFFERING
Plans mark this inline, usually as "***Offering Collected Here***" attached to a song.
Set offeringCue to the NAME of the element that marker sits on (e.g. "Great Is Thy
Faithfulness"), and strip the marker itself from that element's detail.
If no marker is present, fall back to the FBCM standing rule: the offering is collected
during the first song AFTER the sermon; on communion Sundays it is the first song AFTER
the Lord's Supper. Apply that rule to name the song, and only use null if you cannot
identify a song in that position.

DUPLICATED PASTES
Copying a worship order from a web page often duplicates the whole plan two or more times
in a row. If you see the same service repeated, extract it ONCE. Never emit the same
element twice in a row, and never emit two identical rosters.

THE TWO SCRIPTURE READINGS — keep them straight
FBCM services normally contain two readings, and they are NOT interchangeable:
1. The reading IMMEDIATELY BEFORE the sermon is the sermon passage. Element names vary
   ("Scripture Reading", "Sermon Scripture Reading"). Put its passage and reader in
   "sermonReading". This is the deacons' responsibility.
2. Any EARLIER reading exists so both Testaments are heard — if the sermon text is Old
   Testament this one is New Testament, and vice versa. Names vary ("Other Testament
   Reading", "Secondary Reading"). Put its passage and reader in "otherReading". This is
   usually a staff member and is NOT the deacons' reading.
Set "reader" to the sermonReading leader. If a reading has no named leader in the plan,
use null for that leader — never copy one reader across to the other reading.
If the service has only one reading, populate sermonReading and leave otherReading null.

MISSING INLINE LEADERS — infer from the roster
Some plans leave the Leader column blank for most rows and put the names only in the
end-of-plan roster. When an element has no inline leader, fill it from the roster by role:
- Welcome, and any presiding/host element  ->  the "Presiding" person
- Sermon / Message                          ->  the "Sermon" person
- The scripture reading IMMEDIATELY BEFORE the sermon  ->  the "Reading" person
Any OTHER reading (a secondary/"Other Testament" reading elsewhere in the service) does
NOT automatically get the roster Reading person — leave it null unless the plan names
someone. Do not guess leaders for prayers, offerings, or announcements.

PLANNING NOTES
Plans in progress contain notes to staff, not to the congregation: text starting with
"Ask:", anything in square brackets, trailing "[?]", and open questions. Keep the element
name, drop the note. "Ministry Moment / Ask: Ed could speak about praise team[?]" becomes
name "Ministry Moment" with detail null.

SECTIONS
Many plans group elements under liturgical movement headings — for example
"God Calls Us to Worship", "We Praise the Lord", "God Offers His Grace",
"We Witness Our Faith", "God Sends Us Out to Serve". These headings are rows with no
leader and no duration. Capture them in the "section" field of every element beneath
them. They teach the shape of worship, so preserve them. Use null if the plan has none.

NAMES
Plans often use first names only in the body ("Kendall", "Jonathan", "Janis") while a
roster at the end lists full names under headings like Deacons / Presiding / Reading /
Sermon / Instrumentalists / Vocals. ALWAYS cross-reference the roster and expand first
names to full names. "Jonathan" + roster "Sermon: Jonathan Balmer" becomes "Jonathan Balmer".
If a first name is ambiguous across two roster entries, leave it as the first name only.

ROSTER (for the separate "Who's Serving" sheet — NOT for the congregational order)
The plan usually ends with a roster grouped under headings. Capture it in full:
- praiseTeam: everyone under "Instrumentalists" and under "Vocals", grouped by their role
  heading (Piano, Organ, Acoustic Guitar, Bass Guitar, Drum Set, Keys, Autoharp,
  "Lead & Harmony", etc.). EXCLUDE any "Choir" grouping — the choir is a special, not the
  weekly praise team. Keep everyone else even if the same person appears twice.
- avTeam: everyone under "Audio/Visual Team", grouped by role (Sound Board, Projector
  Operation, Live Stream Screen, Live stream audio, etc.).
- otherTeams: remaining roster groups such as Greeters, Security Team, and Children's
  Volunteers. Record the group heading in "team" and the sub-heading in "role".
Use [] for any of these that the plan does not contain.

MUSIC — collapse hard (this rule is for the ELEMENTS list only)
- Any element led by instrumentalists, band, vocalists, or choir gets leader "Praise Team".
- Instrument-and-name strings are NOT leader names. "Piano (Julie), Drums, Guitar, Vox,
  Autoharp", "Organ (Molly)", "Vox only", "Summer Choir w/ Molly (piano)" all become
  "Praise Team". Never list individual musicians — the full team already receives the
  complete plan, and names here waste scarce space.
- Exception — SPECIALS. A solo, duet, choir anthem, or other special is not the praise
  team. If the element says "solo", "special", "anthem", "Choir", or credits named people
  rather than a list of instruments, name the performer(s) instead, expanded from the
  roster. "How Beautiful Are the Feet of Them / Soprano solo with piano / Caroline & Molly
  (piano)" gets leader "Caroline Koby & Molly Flodder", not "Praise Team".

STRIP
- Durations and running times ("2:00", "30:00", "64:00", "Length in mins").
- Chord/structure shorthand ("V, C, V, C, E", "V1, V2, C1").
- Full body text of responsive readings, prayers, and offering dedications — keep only the
  element name and a page/reference if present. Never copy long liturgy text into "detail".
- Production cues: "Recurring Announcements", "Invite Reader to Podium", "Invite choir up",
  "New Members if needed", camera/lighting/sound notes, "***Offering Collected Here***"
  (record that as offeringCue instead), and anything in asterisks or brackets that is a
  stage direction rather than something the congregation experiences.

KEEP
- Prelude/postlude, welcome, responsive reading, songs and hymns (with title and hymn
  number), scripture readings (with reference), special presentations, sermon, silent
  prayer, passing of the peace, communion, offering, announcements, benediction.
- Aim for 10-16 elements after stripping. This is a congregational summary.
- Preserve the order of the service exactly.

COMMUNION
Set isCommunion true only if an actual communion / Lord's Supper element appears in the
order. A responsive reading that merely mentions a communion table is not enough.

Do not invent elements, names, or sections that are not in the source text. Use null when
something is genuinely absent rather than guessing.`,
      });
      setOrder(applyStaffTitles(labelDeaconReader(normalizeReadings(parsed))));
      setBackMode("order");

      // The worship plan is authoritative for the service date. Deriving it from the
      // Wednesday Weekly ("next Sunday after the email") silently mislabels the sheet
      // whenever the two are for different weeks.
      if (parsed.serviceDate) {
        const d = new Date(cleanDateStr(parsed.serviceDate));
        if (!isNaN(d.getTime())) {
          const planDate = formatMonthDayYear(d);
          const derived = getNextSunday(data?.date);
          setBackDate(planDate);
          const mode = isFirstSundayOfMonth(planDate) ? "lords_supper" : "ways_to_respond";
          setResponseMode(mode);
          setResponseInstructions(getDefaultResponseInstructions(planDate));
          if (derived && derived !== planDate) {
            setDateWarning(`Heads up: the worship order is for ${planDate}, but the pasted Weekly points to ${derived}. Using ${planDate} from the plan.`);
          } else {
            setDateWarning("");
          }
        }
      }
    } catch (e) {
      setError("Order of worship: " + (e.message || "Could not parse. Check the pasted text."));
      console.error(e);
    }
    setOrderLoading(false);
  }

  async function generate() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const parsed = await callClaudeJSON({
        user: `Extract announcements:\n\n${input}`,
        system: `Extract structured announcement data from a church weekly news email or document.
Return ONLY valid JSON, no markdown, no backticks, no explanation.

Schema:
{
  "date": "Weekday, Month DDth, YYYY — use ordinal suffix (1st 2nd 3rd 4th) — extract the Wednesday date from the content",
  "sermon": {
    "series": "series name or null",
    "title": "sermon title or null",
    "scripture": "passage or null",
    "teaser": "one sentence drawn from the source text, or null"
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

Rules: include up to 9 most important announcements. Sermon block may be null. Keep descriptions under 25 words.

SERMON TEASER — accuracy matters more than having one
This line is printed in the congregation's hands, so it must not make claims the source
text does not make.
- Draw it ONLY from what the source says about the sermon. Condense; do not add.
- Never characterize, interpret, or summarize the Bible passage yourself. Do not name
  biblical figures, describe what happens in the passage, or state its theme unless the
  source text says so explicitly.
- The service may reference several passages. Never attribute one passage's content,
  author, or characters to another.
- If the source does not actually describe the sermon, set teaser to null. A missing
  teaser is fine; a wrong one is not.`,
      });
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
        .left { width: 300px; min-width: 260px; flex-shrink: 0; background: #13132a; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding: 18px 16px; gap: 12px; overflow-y: auto; overscroll-behavior: contain; }
        .lbl { font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(240,236,226,0.75); font-weight: 600; }
        /* Base styling only. flex/min-height live on .main-paste — this rule used to
           apply 280px to every textarea in the app, which made the rail thousands of
           pixels tall once edit mode added more of them. */
        textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 5px; color: #f0ece2; font-size: 12px; line-height: 1.6; padding: 10px; resize: none; font-family: inherit; outline: none; overscroll-behavior: contain; }
        .main-paste { flex: 1; min-height: 280px; }
        textarea:focus { border-color: rgba(181,146,58,0.45); }
        textarea::placeholder { color: rgba(240,236,226,0.55); }
        .gen-btn { background: ${GOLD}; color: #fff; border: none; border-radius: 5px; padding: 11px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: opacity 0.18s; }
        .gen-btn:hover:not(:disabled) { opacity: 0.85; }
        .gen-btn:disabled { opacity: 0.55; cursor: default; }
        .print-btn { background: transparent; border: 1px solid rgba(181,146,58,0.55); color: #e8dcc0; border-radius: 5px; padding: 9px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: background 0.18s; }
        .print-btn:hover { background: rgba(181,146,58,0.08); }
        .print-btn:disabled { opacity: 0.5; cursor: default; }
        .hint { font-size: 10px; color: rgba(240,236,226,0.72); line-height: 1.6; }
        .err { background: rgba(220,60,60,0.14); border: 1px solid rgba(220,60,60,0.28); color: #f87171; font-size: 11px; padding: 8px 10px; border-radius: 4px; line-height: 1.5; }
        .right { flex: 1; background: #22223b; overflow: auto; padding: 28px 32px; display: flex; flex-direction: column; gap: 10px; }
        .rlbl { font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(240,236,226,0.72); font-weight: 600; }
        .rnote { font-size: 10px; color: rgba(240,236,226,0.62); font-style: italic; }
        .page-label { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(181,146,58,0.95); font-weight: 700; margin-bottom: 4px; }
        .preview-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 24px; }
        .preview-scaled { height: 440px; overflow: hidden; }
        .preview-scaled.tall { height: 575px; }
        .preview-single { transform: scale(0.52); transform-origin: top left; }
        .preview-wrap { display: flex; align-items: flex-start; transform: scale(0.52); transform-origin: top left; }
        .cut { border-left: 2px dashed rgba(255,255,255,0.15); align-self: stretch; }
        .empty { width: 360px; background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.07); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 56px 32px; gap: 8px; color: rgba(240,236,226,0.6); text-align: center; }
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
        .edit-label { display: block; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(240,236,226,0.7); font-weight: 600; margin-bottom: 3px; }
        .edit-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 4px; color: #f0ece2; font-size: 11.5px; padding: 6px 8px; font-family: inherit; outline: none; resize: vertical; line-height: 1.5; }
        .edit-input:focus { border-color: rgba(181,146,58,0.5); background: rgba(255,255,255,0.07); }
        .edit-input::placeholder { color: rgba(240,236,226,0.55); }
        .ann-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 5px; padding: 9px 10px; margin-bottom: 7px; }
        .ann-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
        .ann-card-label { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(240,236,226,0.7); font-weight: 600; }
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
          .preview-wrap, .preview-single { transform: none !important; }
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

                  {/* ── Back page: sermon notes vs order of worship ── */}
                  {dateWarning && (
                    <div style={{
                      background: "rgba(200,150,40,0.16)", border: "1px solid rgba(200,150,40,0.5)",
                      borderRadius: "4px", padding: "8px 10px", marginBottom: "10px",
                      fontSize: "10.5px", lineHeight: 1.5, color: "#f2e6c8",
                    }}>
                      ⚠ {dateWarning}
                    </div>
                  )}

                  <div className="edit-field">
                    <label className="edit-label">Back page shows</label>
                    <select
                      className="edit-input"
                      value={backMode}
                      onChange={e => setBackMode(e.target.value)}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="notes">Sermon Notes (note-taking lines)</option>
                      <option value="order" disabled={!order}>
                        Order of Worship {order ? "(elements & leaders)" : "— paste one below first"}
                      </option>
                    </select>
                  </div>

                  {/* Always visible: this is the input for BOTH the order of worship
                      and the Who's Serving sheet, so it must not hide behind the toggle. */}
                  {(
                    <div className="edit-field">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <label className="edit-label" style={{ margin: 0 }}>
                          Order of Worship {!order && <span style={{ color: "#d8c48a" }}>— needed for Who's Serving</span>}
                        </label>
                        <button
                          style={{ fontSize: "9px", padding: "2px 7px", cursor: "pointer", background: "rgba(181,146,58,0.15)", border: "1px solid rgba(181,146,58,0.35)", color: "#f0ece2", borderRadius: "3px", flexShrink: 0 }}
                          onClick={() => { addOrderRow(); setOrderEditorOpen(true); }}
                        >+ Add element</button>
                      </div>

                      <textarea
                        className="edit-input"
                        rows={4}
                        value={orderInput}
                        onChange={e => setOrderInput(e.target.value)}
                        placeholder="Paste the worship order here (ChurchTrac, Planning Center, or the emailed plan), then click Extract. This fills BOTH the order of worship on the back page and the Who's Serving sheet."
                        style={{ fontSize: "10px", lineHeight: 1.5 }}
                      />
                      <button
                        className="gen-btn"
                        style={{ marginTop: "6px", padding: "8px", fontSize: "11px" }}
                        onClick={generateOrder}
                        disabled={orderLoading || !orderInput.trim()}
                      >
                        {orderLoading ? "Extracting…" : "⚡ Extract Order of Worship"}
                      </button>

                      {/* 19 elements x 3 inputs makes an unusable wall in a 300px rail.
                          Collapsed by default — most weeks the extraction needs no edits. */}
                      {order?.elements?.length > 0 && (
                        <button
                          onClick={() => setOrderEditorOpen(v => !v)}
                          style={{
                            width: "100%", marginTop: "8px", padding: "7px", cursor: "pointer",
                            fontSize: "10px", fontWeight: 600, letterSpacing: "0.05em",
                            borderRadius: "4px", border: "1px solid rgba(181,146,58,0.35)",
                            background: "rgba(181,146,58,0.12)", color: "#f0ece2", fontFamily: "inherit",
                          }}
                        >
                          {orderEditorOpen ? "▾ Hide" : "▸ Edit"} {order.elements.length} elements
                        </button>
                      )}

                      {orderEditorOpen && (order?.elements || []).map((el, i) => (
                        <div key={i} style={{ border: "1px solid rgba(181,146,58,0.25)", borderRadius: "4px", padding: "6px", marginTop: "6px" }}>
                          <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                            <input
                              className="edit-input"
                              value={el.name || ""}
                              onChange={e => setOrderField(i, "name", e.target.value)}
                              placeholder="Element (e.g. Pastoral Prayer)"
                              style={{ flex: 2 }}
                            />
                            <input
                              className="edit-input"
                              value={el.leader || ""}
                              onChange={e => setOrderField(i, "leader", e.target.value)}
                              placeholder="Leader"
                              style={{ flex: 1 }}
                            />
                          </div>
                          <input
                            className="edit-input"
                            value={el.detail || ""}
                            onChange={e => setOrderField(i, "detail", e.target.value)}
                            placeholder="Detail — song title, scripture ref (optional)"
                          />
                          <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                            <button style={{ fontSize: "9px", padding: "2px 6px", cursor: "pointer" }} onClick={() => moveOrderRow(i, -1)}>↑</button>
                            <button style={{ fontSize: "9px", padding: "2px 6px", cursor: "pointer" }} onClick={() => moveOrderRow(i, 1)}>↓</button>
                            <div style={{ flex: 1 }} />
                            <button style={{ fontSize: "9px", padding: "2px 6px", cursor: "pointer", color: "#b45" }} onClick={() => removeOrderRow(i)}>Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

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
                        style={{ fontSize: "9px", padding: "2px 7px", cursor: "pointer", background: "rgba(181,146,58,0.15)", border: "1px solid rgba(181,146,58,0.35)", color: "#f0ece2", borderRadius: "3px", flexShrink: 0 }}
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
                <button className="print-btn" onClick={downloadHalfSheetPdf} disabled={!data || pdfStatus === "saving"}>
                  {pdfStatus === "saving" && <span className="btn-spin" />}
                  {pdfStatus === "idle" && "📕 Download Half-Sheet PDF"}
                  {pdfStatus === "saving" && "Building PDF…"}
                  {pdfStatus === "done" && "✓ PDF Downloaded!"}
                  {pdfStatus === "error" && "✗ Failed — Retry"}
                </button>
                <button className="print-btn" onClick={downloadServingPdf} disabled={!order || servingPdfStatus === "saving"}>
                  {servingPdfStatus === "saving" && <span className="btn-spin" />}
                  {servingPdfStatus === "idle" && "🤝 Download Who's Serving PDF"}
                  {servingPdfStatus === "saving" && "Building PDF…"}
                  {servingPdfStatus === "done" && "✓ PDF Downloaded!"}
                  {servingPdfStatus === "error" && "✗ Failed — Retry"}
                </button>
                <button className="drive-btn" onClick={savePdfsToDrive} disabled={!data || drivePdfStatus === "saving"}>
                  {drivePdfStatus === "saving" && <span className="btn-spin" />}
                  {drivePdfStatus === "idle" && "☁ Save Both PDFs to Drive"}
                  {drivePdfStatus === "saving" && "Uploading…"}
                  {drivePdfStatus === "done" && "✓ PDFs in Drive!"}
                  {drivePdfStatus === "error" && "✗ Upload Failed — Retry"}
                </button>

                {driveLinks && (
                  <div style={{ background: "rgba(181,146,58,0.10)", border: "1px solid rgba(181,146,58,0.35)", borderRadius: "5px", padding: "9px 10px", fontSize: "10px", lineHeight: 1.5 }}>
                    <div style={{ fontWeight: 700, color: "#d8c48a", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "9px", marginBottom: "5px" }}>
                      Permanent links — set these once
                    </div>
                    <div style={{ color: "rgba(240,236,226,0.85)", marginBottom: "6px" }}>
                      These URLs stay the same every week. Paste them into the Wednesday Weekly buttons one time.
                    </div>
                    {[["Wednesday Weekly / Worship Order Halfsheet", driveLinks.halfSheet],
                      ["Who's Serving Sunday", driveLinks.serving]]
                      .filter(([, id]) => id)
                      .map(([label, id]) => {
                        const url = `https://drive.google.com/file/d/${id}/view`;
                        return (
                          <div key={id} style={{ marginBottom: "6px" }}>
                            <div style={{ color: "rgba(240,236,226,0.97)", fontWeight: 600, marginBottom: "2px" }}>{label}</div>
                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                              <input readOnly value={url} onFocus={e => e.target.select()}
                                style={{ flex: 1, fontSize: "9px", fontFamily: "monospace", padding: "3px 5px", borderRadius: "3px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.25)", color: "#f0ece2" }} />
                              <button onClick={() => navigator.clipboard?.writeText(url)}
                                style={{ fontSize: "9px", padding: "3px 7px", cursor: "pointer", borderRadius: "3px", border: "1px solid rgba(181,146,58,0.45)", background: "rgba(181,146,58,0.18)", color: "#f0ece2" }}>Copy</button>
                            </div>
                          </div>
                        );
                      })}
                    <div style={{ color: "rgba(240,236,226,0.72)", fontSize: "9px", marginTop: "2px" }}>
                      The Drive folder must be shared as “Anyone with the link — Viewer.”
                    </div>
                  </div>
                )}
                <button className="print-btn" onClick={printSheet} disabled={!data}>
                  ⬇ Download Print File (.html)
                </button>
                <button className="print-btn" onClick={printDeaconCard} disabled={!order}>
                  🤝 Who's Serving (.html)
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
                  className="main-paste"
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
                <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(240,236,226,0.65)" }}>No content yet</div>
                <div style={{ fontSize: "11px" }}>Paste your Wednesday Weekly and click Generate</div>
              </div>
            )}
            {loading && (
              <div className="empty">
                <div className="spin" />
                <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(240,236,226,0.65)" }}>Generating…</div>
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
                      <HalfSheetFront data={data} onCutoffChange={setFrontCutoff} communion={responseMode === "lords_supper"} />
                      <div className="cut" />
                      <HalfSheetFront data={data} communion={responseMode === "lords_supper"} />
                    </div>
                  </div>
                </div>
                <div className="preview-row">
                  <div className="page-label">▸ Page 2 — Back</div>
                  <div className="preview-scaled">
                    <div className="preview-wrap">
                      <HalfSheetBack data={data} responseInstructions={responseInstructions} backDate={backDate} backMode={backMode} order={order} />
                      <div className="cut" />
                      <HalfSheetBack data={data} responseInstructions={responseInstructions} backDate={backDate} backMode={backMode} order={order} />
                    </div>
                  </div>
                </div>

                {/* Who's Serving — separate sheet, so preview it separately.
                    Rendered from the same HTML the PDF export uses. */}
                {order && (
                  <div className="preview-row">
                    <div className="page-label">
                      ▸ Who's Serving Today — separate 8.5″ × 11″ page (not printed with the bulletin)
                    </div>
                    <div className="preview-scaled tall">
                      <div className="preview-single" dangerouslySetInnerHTML={{ __html: buildServingPageHTML() }} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
