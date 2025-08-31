/* =======================
   CONFIG
======================= */
// Center for service radius (Yellareddyguda/Kapra/ECIL approx)
const SERVICE_CENTER = { lat: 17.4876, lon: 78.5580 };
const MAX_DISTANCE_KM = 50;

// Change this later to your dad's WhatsApp number (country code + number, no '+' or spaces)
const WHATSAPP_NUMBER = "919000655955";

/* =======================
   DATA (With Telugu Names)
   - Update/expand as needed
======================= */
const CATEGORIES = [
  {
    title: "Life Events",
    icon: "👨‍👩‍👧",
    items: [
      "Jātakarma (జాతకర్మ)",
      "Nāmakaranam (నామకరణం)",
      "Chaulam (చౌలము)",
      "Annaprāsana (అన్నప్రాశనం)",
      "Upanayanam (ఉపనయనం)",
      "Vivāham (వివాహం)",
      "Garbhādhanam (గర్భాధానం)",
      "Seemantham (శీమంతం)"
    ]
  },
  {
    title: "Vratams & Poojas",
    icon: "🕉️",
    items: [
      "Satyanārāyana Vratham (సత్యనారాయణ వ్రతం)",
      "Varalakshmi Vratham (వరలక్ష్మి వ్రతం)",
      "Vaibhava Lakshmi Vratham (వైభవ లక్ష్మి వ్రతం)",
      "Kedāreshwara Vratham (కేదారేశ్వర వ్రతం)"
    ]
  },
  {
    title: "Japam / Parayanam",
    icon: "📿",
    items: [
      "Navagraha Japam (నవగ్రహ జపం)",
      "Nakshatra Japam (నక్షత్ర జపం)",
      "Mahā Mrityunjaya Japam (మహా మృత్యుంజయ జపం)",
      "Pāśupata Japam (పాశుపత జపం)",
      "Sundarakānda Pārāyanam (సుందరకాండ పారాయణం)",
      "Rudra Pārāyanam (రుద్ర పారాయణం)",
      "Chandi Pārāyanam (చండీ పారాయణం)",
      "Veda Pārāyanam (వేద పారాయణం)",
      "Śrī Sūkta Pārāyanam (శ్రీ సూక్త పారాయణం)",
      "Mantra Sūkta Pārāyanam (మంత్ర సూక్త పారాయణం)"
    ]
  },
  {
    title: "Homams & Abhishekams",
    icon: "🔥",
    items: [
      "Rudrābhishekam (రుద్రాభిషేకం)",
      "Nitya Abhishekam (నిత్య అభిషేకం)",
      "Nitya Pooja (నిత్య పూజ)",
      "Nitya Homam (నిత్య హోమం)",
      "Navagraha Homam (నవగ్రహ హోమం)",
      "Ganapati Homam (గణపతి హోమం)",
      "Vāstu Shānti (గృహ శాంతి)"
    ]
  },
  {
    title: "Festivals & Special",
    icon: "🎉",
    items: [
      "Deepāvali Lakshmi Pooja (దీపావళి లక్ష్మీ పూజ)",
      "Vināyaka Chavithi Pooja (వినాయక చవితి పూజ)",
      "Dasara Navarātri Pooja (దసరా నవరాత్రి పూజ)",
      "Ugādi Pooja (ఉగాది పూజ)",
      "Shop Opening (దుకాణ ప్రారంభం పూజ)",
      "Gruhapravesham (గృహప్రవేశం)",
      "Lakshmi Pooja (లక్ష్మి పూజ)",
      "Ganapati Navaratri – 3/5/9 days (గణపతి నవరాత్రి – 3/5/9 రోజులు)",
      "Devatha Prathista"
    ]
  }
];

/* =======================
   RENDER
======================= */
const sectionsRoot = document.getElementById("sections");

function renderSections(list){
  sectionsRoot.innerHTML = "";
  list.forEach(cat => {
    const sec = document.createElement("section");
    sec.className = "section";

    const h2 = document.createElement("h2");
    h2.innerHTML = `<span class="icon">${cat.icon}</span>${cat.title}`;
    sec.appendChild(h2);

    const grid = document.createElement("div");
    grid.className = "grid";

    cat.items.forEach(name => {
      const card = document.createElement("div");
      card.className = "card glass";

      const top = document.createElement("div");
      top.innerHTML = `<div class="name">${name}</div>`;

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `<span>Available in Hyderabad</span>`;

      const btn = document.createElement("button");
      btn.className = "btn btn-primary";
      btn.textContent = "Enquire now ";
      btn.onclick = () => openModal(name);

      card.appendChild(top);
      card.appendChild(meta);
      card.appendChild(btn);
      grid.appendChild(card);
    });

    sec.appendChild(grid);
    sectionsRoot.appendChild(sec);
  });
}

renderSections(CATEGORIES);

/* =======================
   SEARCH
======================= */
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", () => {
  const q = searchBar.value.toLowerCase().trim();

  if (!q){
    renderSections(CATEGORIES);
    return;
  }

  const filtered = CATEGORIES.map(c => ({
    ...c,
    items: c.items.filter(n => n.toLowerCase().includes(q))
  })).filter(c => c.items.length > 0);

  renderSections(filtered);
});

/* =======================
   MODAL & BOOKING
======================= */
const bookingModal = document.getElementById("bookingModal");
const modalTitle = document.getElementById("modalTitle");
const bookingForm = document.getElementById("bookingForm");

let selectedPooja = "";

function openModal(poojaName){
  selectedPooja = poojaName;
  modalTitle.textContent = `Book – ${poojaName}`;
  bookingForm.reset();
  // set default date = tomorrow
  const dateEl = document.getElementById("custDate");
  dateEl.value = new Date(Date.now()+86400000).toISOString().slice(0,10);

  bookingModal.showModal();
}

function closeModal(){
  bookingModal.close();
}

// submit
bookingForm.addEventListener("submit", async (e)=>{
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const date = document.getElementById("custDate").value;
  const address = document.getElementById("custAddress").value.trim();
  const notes = document.getElementById("custNotes").value.trim();

  if (!name || !phone || !date || !address){
    alert("Please fill all required fields.");
    return;
  }

  // Get geolocation for radius check
  if (!navigator.geolocation){
    alert("Geolocation not supported on this device.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos)=>{
      const { latitude, longitude } = pos.coords;
      const distance = haversineKm(
        SERVICE_CENTER.lat, SERVICE_CENTER.lon,
        latitude, longitude
      );

      if (distance > MAX_DISTANCE_KM){
        alert(`Sorry! We currently serve only within ${MAX_DISTANCE_KM} km of ECIL/Kapra, Hyderabad.\n(You appear ~${distance.toFixed(1)} km away.)`);
        return;
      }

      // Build WhatsApp message
      const locationPin = `https://maps.google.com/?q=${latitude},${longitude}`;
      const msg =
`Namaste 🙏
I'd like to book: ${selectedPooja}
Date: ${date}

Name: ${name}
Phone: ${phone}
Address/Landmark: ${address}
Notes: ${notes || "-"}

My live location pin:
${locationPin}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
      closeModal();
    },
    ()=>{
      alert("Please allow location access to confirm service area.");
    },
    { enableHighAccuracy: true, timeout: 15000 }
  );
});

/* =======================
   UTILS
======================= */
function haversineKm(lat1, lon1, lat2, lon2){
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function deg2rad(d){ return d * (Math.PI/180); }
