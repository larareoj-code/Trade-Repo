(function () {
  "use strict";

  const STORAGE_KEY = "rainy-day-quest-maker-v1";
  const locations = [
    "under a pillow", "beside a bookshelf", "near a window", "under a chair", "beside a lamp", "near the coat hooks", "under a small table", "beside the toy bin", "near a plant", "under a folded blanket", "beside a door mat", "near the art supplies"
  ];
  const taskBank = {
    cozy: ["Name one thing that feels cozy here.", "Draw a tiny rain cloud on the clue back.", "Whisper the next clue title together.", "Find something soft nearby."],
    detective: ["Look for a shape with four corners.", "Say what changed since the last clue.", "Point to the quietest object nearby.", "Make a careful detective note."],
    museum: ["Pretend this spot is an exhibit.", "Give one object a museum label.", "Choose a color you would put on a gallery wall.", "Describe the clue location in one sentence."],
    maker: ["Fold a paper bridge before moving on.", "Build a tiny sign from scrap paper.", "Sketch the next room as a simple map.", "Invent a team handshake before the next clue."]
  };

  function clean(value) { return String(value || "").replace(/\r\n/g, "\n").trim(); }
  function hash(input) { let h = 2166136261; for (let i = 0; i < input.length; i += 1) { h ^= input.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function picker(seed) { let state = seed || 1; return function (list) { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return list[state % list.length]; }; }
  function splitList(value) { return clean(value).split(/[,\n]/).map((item) => item.trim().toLowerCase()).filter(Boolean); }
  function safeCount(value) { return Math.max(3, Math.min(10, Number(value) || 6)); }

  function readForm(form) {
    const data = new FormData(form);
    return {
      title: clean(data.get("title")) || "Rainy Day Quest",
      age: clean(data.get("age")) || "7-9",
      theme: clean(data.get("theme")) || "cozy",
      difficulty: clean(data.get("difficulty")) || "medium",
      count: safeCount(data.get("count")),
      exclusions: clean(data.get("exclusions")),
      supplies: clean(data.get("supplies")) || "paper, pencils, tape, timer"
    };
  }

  function buildQuest(input) {
    const settings = Object.assign({}, input);
    const excluded = splitList(settings.exclusions);
    const allowed = locations.filter((place) => !excluded.some((blocked) => place.includes(blocked)));
    const seed = hash(JSON.stringify(settings));
    const pick = picker(seed);
    const route = [];
    const pool = allowed.length >= settings.count ? allowed.slice() : locations.slice();
    while (route.length < settings.count && pool.length) {
      const place = pick(pool);
      pool.splice(pool.indexOf(place), 1);
      route.push(place);
    }
    const tasks = taskBank[settings.theme] || taskBank.cozy;
    const clues = route.map((place, index) => ({
      number: index + 1,
      title: index === 0 ? "Start here" : `Clue ${index + 1}`,
      location: place,
      text: index === route.length - 1 ? `Final stop: look ${place}. Celebrate with a grown-up high five.` : `Look ${place}. Before the next clue, ${pick(tasks).toLowerCase()}`,
      setupNote: `Place card ${index + 1} ${place}.`
    }));
    const safety = [
      "A grown-up should place every clue before play starts.",
      "Use reachable locations only; avoid stairs, heat, water, sharp objects, medicine, and private storage.",
      "Walk the route once before inviting children to play.",
      "Keep supplies simple and age-appropriate."
    ];
    return { settings, seed, clues, safety, createdAt: new Date().toISOString() };
  }

  function questToText(quest) {
    return [
      `# ${quest.settings.title}`,
      "",
      `Age: ${quest.settings.age}`,
      `Theme: ${quest.settings.theme}`,
      `Difficulty: ${quest.settings.difficulty}`,
      `Supplies: ${quest.settings.supplies}`,
      "",
      "## Safety Review",
      ...quest.safety.map((item) => `- ${item}`),
      "",
      "## Setup Route",
      ...quest.clues.map((card) => `- ${card.setupNote}`),
      "",
      "## Clue Cards",
      ...quest.clues.map((card) => `${card.number}. ${card.text}`)
    ].join("\n");
  }

  function setStatus(message) {
    const status = document.getElementById("status");
    status.textContent = message;
    clearTimeout(setStatus.timer);
    setStatus.timer = setTimeout(() => { status.textContent = "Ready"; }, 1800);
  }

  function render(quest) {
    document.getElementById("questTitle").textContent = quest.settings.title;
    document.getElementById("questMeta").textContent = `${quest.settings.age} years | ${quest.settings.theme} | ${quest.clues.length} clues`;
    document.getElementById("briefOutput").textContent = questToText(quest).split("## Clue Cards")[0].trim();
    document.getElementById("cardsOutput").innerHTML = quest.clues.map((card) => `<article class="clue-card"><span>Card ${card.number}</span><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p></article>`).join("");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quest.settings));
  }

  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
  async function copy(text) { try { await navigator.clipboard.writeText(text); } catch (_) { const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); } setStatus("Copied"); }
  function download(quest) { const blob = new Blob([JSON.stringify(quest, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "rainy-day-quest.json"; link.click(); URL.revokeObjectURL(url); setStatus("JSON exported"); }

  const form = document.getElementById("questForm");
  const sample = { title: "Window Seat Mystery", age: "7-9", theme: "detective", difficulty: "medium", count: 6, exclusions: "kitchen, bathroom, stairs", supplies: "paper, pencil, tape" };
  let current = buildQuest(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || sample);
  Object.entries(current.settings).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
  render(current);
  form.addEventListener("submit", (event) => { event.preventDefault(); current = buildQuest(readForm(form)); render(current); setStatus("Quest generated"); });
  form.addEventListener("input", () => { current = buildQuest(readForm(form)); render(current); });
  document.getElementById("sampleButton").addEventListener("click", () => { Object.entries(sample).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; }); current = buildQuest(sample); render(current); setStatus("Sample loaded"); });
  document.getElementById("copyButton").addEventListener("click", () => copy(questToText(current)));
  document.getElementById("jsonButton").addEventListener("click", () => download(current));
  document.getElementById("printButton").addEventListener("click", () => window.print());
  window.RainyDayQuestMaker = { buildQuest, questToText, hash };
})();
