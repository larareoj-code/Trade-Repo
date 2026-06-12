(function () {
  "use strict";

  const STORAGE_KEY = "client-welcome-kit-v1";
  const form = document.getElementById("kitForm");
  const packetOutput = document.getElementById("packetOutput");
  const emailOutput = document.getElementById("emailOutput");
  const status = document.getElementById("status");

  const sample = {
    clientName: "Morgan Lee",
    businessName: "Bright Desk Studio",
    projectName: "Website refresh",
    outcome: "Relaunch a clearer five-page service website that explains the offer, answers common questions, and gives prospects a simple next step.",
    deliverables: "Kickoff agenda\nMessaging outline\nFive-page copy draft\nLaunch checklist",
    startDate: "July 8",
    wrapDate: "August 2",
    communication: "Weekly Friday update by email. Questions are batched in one shared notes document unless something blocks progress.",
    boundaries: "Two standard feedback rounds are included. New pages, rush requests, and strategy changes are quoted before work continues.",
    nextSteps: "Sign the agreement\nSend brand files and current website links\nBook the kickoff call"
  };

  function setStatus(message) {
    status.textContent = message;
    clearTimeout(setStatus.timer);
    setStatus.timer = setTimeout(() => { status.textContent = "Ready"; }, 1800);
  }

  function readForm() {
    const data = new FormData(form);
    return Object.fromEntries(data.entries());
  }

  function writeForm(data) {
    Object.entries(data).forEach(([key, value]) => {
      if (form.elements[key]) form.elements[key].value = value;
    });
  }

  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
    catch (_) { return null; }
  }

  function render(data) {
    const result = window.ClientWelcomeKit.buildAll(data);
    packetOutput.textContent = result.packet;
    emailOutput.textContent = result.email;
    save(result.data);
    return result;
  }

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setStatus(`${label} copied`);
  }

  function downloadJson() {
    const result = window.ClientWelcomeKit.buildAll(readForm());
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "client-welcome-kit.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("JSON exported");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render(readForm());
    setStatus("Packet generated");
  });
  form.addEventListener("input", () => render(readForm()));
  document.getElementById("sampleButton").addEventListener("click", () => { writeForm(sample); render(sample); setStatus("Sample loaded"); });
  document.getElementById("resetButton").addEventListener("click", () => { localStorage.removeItem(STORAGE_KEY); writeForm(window.ClientWelcomeKit.defaults); render(window.ClientWelcomeKit.defaults); setStatus("Reset complete"); });
  document.getElementById("printButton").addEventListener("click", () => window.print());
  document.getElementById("copyPacket").addEventListener("click", () => copy(packetOutput.textContent, "Packet"));
  document.getElementById("copyEmail").addEventListener("click", () => copy(emailOutput.textContent, "Email"));
  document.getElementById("downloadJson").addEventListener("click", downloadJson);

  const initial = load() || sample;
  writeForm(initial);
  render(initial);
})();
