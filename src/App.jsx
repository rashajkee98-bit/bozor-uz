import { useState } from "react";

const C = {
  blue: "#1B4FD8",
  blueDark: "#1440B0",
  blueLight: "#E8EEFB",
  amber: "#F5A623",
  amberLight: "#FEF3DC",
  dark: "#0D1B2A",
  gray600: "#4B5563",
  gray400: "#9CA3AF",
  gray100: "#F4F6FB",
  white: "#FFFFFF",
};

const CITIES = ["Butun O'zbekiston", "Toshkent", "Samarqand", "Buxoro", "Namangan", "Andijon", "Farg'ona", "Nukus"];

const CATEGORIES = [
  { id: "all", label: "Hammasi", icon: "🏪", count: 124500 },
  { id: "auto", label: "Avtomobil", icon: "🚗" },
  { id: "realty", label: "Ko'chmas mulk", icon: "🏠" },
  { id: "phones", label: "Telefonlar", icon: "📱" },
  { id: "electro", label: "Elektronika", icon: "💻" },
  { id: "work", label: "Ish & Vakansiya", icon: "💼" },
  { id: "fashion", label: "Kiyim-kechak", icon: "👗" },
  { id: "home", label: "Uy-joy", icon: "🛋️" },
  { id: "animals", label: "Hayvonlar", icon: "🐾" },
  { id: "kids", label: "Bolalar", icon: "🧸" },
  { id: "sport", label: "Sport", icon: "⚽" },
  { id: "other", label: "Boshqa", icon: "📦" },
];

const ADS = [
  { id: 1, title: "Chevrolet Nexia 3, 2022 yil, 28 000 km", category: "auto", price: "185 000 000 so'm", city: "Toshkent", date: "Bugun, 14:32", seller: "Jasur T.", badge: "VIP", img: "🚗", desc: "Chevrolet Nexia 3, 2022 yil, oq rang. Bitta xo'jayin, hech qanday muammo yo'q. To'liq jihozlangan." },
  { id: 2, title: "iPhone 15 Pro 256GB, Natural Titanium", category: "phones", price: "11 500 000 so'm", city: "Toshkent", date: "Bugun, 13:15", seller: "Dilnoza M.", badge: "TOP", img: "📱", desc: "iPhone 15 Pro 256GB Natural Titanium. Yangi holat, qutisi bilan. Kafolat bor." },
  { id: 3, title: "3 xonali kvartira, Yunusobod tumani", category: "realty", price: "95 000 $", city: "Toshkent", date: "Kecha", seller: "Nodir R.", badge: null, img: "🏠", desc: "Yunusobod tumanida 3 xonali kvartira. 9-qavat, lift bor. Evro ta'mirlangan, mebel bilan." },
  { id: 4, title: "Samsung Galaxy S24 Ultra, 512GB", category: "phones", price: "9 800 000 so'm", city: "Samarqand", date: "Kecha", seller: "Akbar H.", badge: null, img: "📱", desc: "Samsung Galaxy S24 Ultra 512GB, qora rang. Yangi, ochilmagan quti." },
  { id: 5, title: "Senior Frontend Developer (React/Vue)", category: "work", price: "5 000 000+ so'm", city: "Remote", date: "2 kun oldin", seller: "TechUz", badge: "Yangi", img: "💼", desc: "Xalqaro IT kompaniya React/Vue biluvchi dasturchi izlayapti. Ingliz tili B2+." },
  { id: 6, title: "MacBook Pro M3, 14 dyuym, 16GB RAM", category: "electro", price: "16 200 000 so'm", city: "Toshkent", date: "3 kun oldin", seller: "Kamola S.", badge: "VIP", img: "💻", desc: "MacBook Pro M3 chip, 14 dyuym, 16GB RAM, 512GB SSD. Ajoyib holat." },
  { id: 7, title: "Krossovka Nike Air Max 270, 42 o'lcham", category: "fashion", price: "850 000 so'm", city: "Namangan", date: "3 kun oldin", seller: "Sherzod B.", badge: null, img: "👟", desc: "Nike Air Max 270 original. 42 o'lcham. Bir marta kiyilgan. Qutisi bor." },
  { id: 8, title: "Siamese mushuk bolalari, 2 oylik", category: "animals", price: "500 000 so'm", city: "Farg'ona", date: "4 kun oldin", seller: "Lola N.", badge: "Yangi", img: "🐱", desc: "Siamese zotli mushuk bolalari, 2 oylik. 3 ta bor. Salomatlik muammolari yo'q." },
];

const BADGE_COLORS = {
  VIP: { bg: "#FEF3DC", color: "#D97706", border: "#F5A623" },
  TOP: { bg: "#E8EEFB", color: "#1B4FD8", border: "#1B4FD8" },
  Yangi: { bg: "#D1FAE5", color: "#065F46", border: "#10B981" },
};

function Badge({ label }) {
  if (!label) return null;
  const s = BADGE_COLORS[label] || BADGE_COLORS.Yangi;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: s.bg, color: s.color, border: "1px solid " + s.border }}>
      {label}
    </span>
  );
}

function AdCard({ ad, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onClick(ad)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.white, borderRadius: 14, overflow: "hidden", cursor: "pointer",
        border: "1.5px solid " + (hov ? C.blue : "#E5E9F2"),
        boxShadow: hov ? "0 8px 28px rgba(27,79,216,0.13)" : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.18s ease", transform: hov ? "translateY(-2px)" : "none",
        display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, " + C.blueLight + " 0%, #EEF2FF 100%)",
        height: 160, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 64, position: "relative" }}>
        {ad.img}
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Badge label={ad.badge} />
        </div>
      </div>
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.blue }}>{ad.city}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.4 }}>{ad.title}</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginTop: 2 }}>{ad.price}</div>
        <div style={{ fontSize: 12, color: C.gray400, marginTop: "auto", paddingTop: 8,
          borderTop: "1px solid " + C.gray100, display: "flex", justifyContent: "space-between" }}>
          <span>👤 {ad.seller}</span>
          <span>{ad.date}</span>
        </div>
      </div>
    </div>
  );
}

function AdModal({ ad, onClose }) {
  if (!ad) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0,
      background: "rgba(13,27,42,0.6)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white,
        borderRadius: 20, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ background: "linear-gradient(135deg, " + C.blueLight + " 0%, #EEF2FF 100%)",
          height: 220, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 88, position: "relative" }}>
          {ad.img}
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14,
            background: "rgba(255,255,255,0.85)", border: "none", borderRadius: 50,
            width: 36, height: 36, cursor: "pointer", fontSize: 18, color: C.dark }}>✕</button>
          <div style={{ position: "absolute", top: 14, left: 14 }}>
            <Badge label={ad.badge} />
          </div>
        </div>
        <div style={{ padding: 28 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, color: C.dark, margin: "0 0 10px", lineHeight: 1.35 }}>{ad.title}</h2>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.blue, marginBottom: 16 }}>{ad.price}</div>
          <p style={{ fontSize: 14, color: C.gray600, lineHeight: 1.7, marginBottom: 20 }}>{ad.desc}</p>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: C.gray400, marginBottom: 24,
            background: C.gray100, borderRadius: 10, padding: "10px 14px", flexWrap: "wrap" }}>
            <span>📍 {ad.city}</span>
            <span>👤 {ad.seller}</span>
            <span>🕐 {ad.date}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ flex: 1, background: "linear-gradient(90deg, " + C.blue + ", " + C.blueDark + ")",
              color: C.white, border: "none", borderRadius: 12, padding: "14px 0",
              fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              📞 Bog'lanish
            </button>
            <button style={{ background: C.amberLight, color: "#92400E", border: "none",
              borderRadius: 12, padding: "14px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              ♡ Saqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewAdModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", category: "auto", price: "", city: "Toshkent", desc: "" });
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = () => {
    if (!form.title.trim() || !form.price.trim()) return;
    const cat = CATEGORIES.find(c => c.id === form.category);
    onAdd({ ...form, id: Date.now(), date: "Hozir", seller: "Siz", badge: "Yangi",
      img: cat ? cat.icon : "📦" });
    onClose();
  };

  const inp = { width: "100%", border: "1.5px solid #E5E9F2", borderRadius: 10,
    padding: "11px 14px", fontSize: 14, color: C.dark, outline: "none",
    background: C.gray100, boxSizing: "border-box", fontFamily: "inherit" };
  const lbl = { fontSize: 12, fontWeight: 700, color: C.gray600, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0,
      background: "rgba(13,27,42,0.6)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white,
        borderRadius: 20, maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ background: "linear-gradient(90deg, " + C.blue + ", " + C.blueDark + ")",
          padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: C.white }}>Yangi e'lon joylash</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none",
            borderRadius: 50, width: 32, height: 32, color: C.white, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={lbl}>Sarlavha *</label>
            <input style={inp} placeholder="Nimani sotmoqchisiz?" value={form.title} onChange={e => up("title", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Kategoriya</label>
            <select style={inp} value={form.category} onChange={e => up("category", e.target.value)}>
              {CATEGORIES.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Shahar</label>
            <select style={inp} value={form.city} onChange={e => up("city", e.target.value)}>
              {CITIES.filter(c => c !== "Butun O'zbekiston").map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Narx *</label>
            <input style={inp} placeholder="Masalan: 1 500 000 so'm" value={form.price} onChange={e => up("price", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Tavsif</label>
            <textarea style={{ ...inp, resize: "vertical", minHeight: 90 }} placeholder="Mahsulot haqida batafsil yozing..." value={form.desc} onChange={e => up("desc", e.target.value)} />
          </div>
          <button onClick={submit} style={{ background: "linear-gradient(90deg, " + C.blue + ", " + C.blueDark + ")",
            color: C.white, border: "none", borderRadius: 12, padding: "15px 0",
            fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>
            E'lonni joylash →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [ads, setAds] = useState(ADS);
  const [search, setSearch] = useState("");
  const [activeCity, setActiveCity] = useState("Butun O'zbekiston");
  const [activeCat, setActiveCat] = useState("all");
  const [selectedAd, setSelectedAd] = useState(null);
  const [showNewAd, setShowNewAd] = useState(false);

  const filtered = ads.filter(ad => {
    const matchCat = activeCat === "all" || ad.category === activeCat;
    const matchCity = activeCity === "Butun O'zbekiston" || ad.city === activeCity;
    const q = search.toLowerCase();
    const matchSearch = !q || ad.title.toLowerCase().includes(q) || (ad.desc || "").toLowerCase().includes(q);
    return matchCat && matchCity && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: C.gray100, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: C.dark }}>

      <div style={{ background: C.dark, padding: "0 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center",
          gap: 16, height: 44, fontSize: 12, overflowX: "auto" }}>
          {CITIES.map(c => (
            <span key={c} onClick={() => setActiveCity(c)} style={{ cursor: "pointer", whiteSpace: "nowrap",
              color: activeCity === c ? C.amber : "rgba(255,255,255,0.5)",
              fontWeight: activeCity === c ? 700 : 400 }}>
              {c === "Butun O'zbekiston" ? "🇺🇿 " + c : c}
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: C.white, borderBottom: "1px solid #E5E9F2", padding: "0 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex",
          alignItems: "center", gap: 14, height: 70, flexWrap: "wrap", paddingTop: 8, paddingBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, " + C.blue + ", " + C.amber + ")",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏪</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: C.blue, letterSpacing: "-0.5px", lineHeight: 1 }}>
                BOZOR<span style={{ color: C.amber }}>.UZ</span>
              </div>
              <div style={{ fontSize: 9, color: C.gray400, fontWeight: 500 }}>
                O'ZBEKISTON E'LONLAR SAYTI
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              style={{ width: "100%", border: "2px solid " + C.blueLight, borderRadius: 12,
                padding: "10px 16px", fontSize: 14, color: C.dark, outline: "none",
                background: C.gray100, boxSizing: "border-box" }}
              placeholder="🔍 Nima qidiryapsiz?"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setShowNewAd(true)}
            style={{ background: "linear-gradient(90deg, " + C.amber + ", #E8920A)",
              color: C.dark, border: "none", borderRadius: 12, padding: "11px 18px",
              fontSize: 13, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
            + E'lon joylash
          </button>
        </div>
      </div>

      <div style={{ background: C.white, borderBottom: "1px solid #E5E9F2", padding: "0 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4,
          overflowX: "auto", paddingBottom: 12, paddingTop: 12 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              style={{ border: "none", borderRadius: 10, padding: "8px 14px",
                fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                background: activeCat === cat.id ? C.blue : "transparent",
                color: activeCat === cat.id ? C.white : C.gray600, flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 18 }}>
          {filtered.length} ta e'lon topildi
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: C.gray400 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Hech narsa topilmadi</div>
            <div style={{ fontSize: 14 }}>So'rovingizni o'zgartiring yoki boshqa kategoriya tanlang</div>
          </div>
        ) : (
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
            {filtered.map(ad => <AdCard key={ad.id} ad={ad} onClick={setSelectedAd} />)}
          </div>
        )}

        <div style={{ marginTop: 48, background: "linear-gradient(135deg, " + C.blue + " 0%, " + C.blueDark + " 100%)",
          borderRadius: 20, padding: "28px 24px", display: "flex", justifyContent: "space-around",
          alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.amber }}>124 500</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Jami e'lonlar</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.amber }}>2.4M+</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Foydalanuvchilar</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.amber }}>14</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Viloyat va shahar</div>
          </div>
        </div>
      </div>

      {selectedAd && <AdModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
      {showNewAd && <NewAdModal onClose={() => setShowNewAd(false)} onAdd={ad => setAds(p => [ad, ...p])} />}
    </div>
  );
}
