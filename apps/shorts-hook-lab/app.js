(function () {
  "use strict";

  const Generator = window.ShortsHookGenerator;
  const HISTORY_KEY = "shorts-hook-lab-history-v1";
  const state = { result: null, tab: "hooks", history: loadHistory() };
  const byId = (id) => document.getElementById(id);
  const form = byId("generatorForm");
  const topicInput = byId("topicInput");
  const statusMessage = byId("statusMessage");

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
    catch (_) { return []; }
  }

  function saveHistory() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(state.history.slice(0, 20)));
    renderHistory();
  }

  function setStatus(message) {
    if (!statusMessage) return;
    statusMessage.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => { statusMessage.textContent = "Ready"; }, 2200);
  }

  async function copyText(text, label) {
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

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    setStatus(`${filename} exported`);
  }

  function currentInputs() {
    return {
      topic: topicInput.value,
      tone: byId("toneSelect").value,
      platform: form.elements.platform.value,
      length: Number(form.querySelector('input[name="length"]:checked').value)
    };
  }

  function generate(save) {
    state.result = Generator.generate(currentInputs());
    state.tab = "hooks";
    if (save !== false) {
      state.history = [state.result, ...state.history.filter((item) => item.id !== state.result.id)].slice(0, 20);
      saveHistory();
    }
    render();
    setStatus("Content kit generated and saved locally");
  }

  function render() {
    const result = state.result;
    if (!result) return;
    byId("topHook").textContent = result.hooks[result.selectedHook];
    byId("hookRationale").textContent = result.rationale;
    byId("hookCount").textContent = result.hooks.length;
    byId("favoriteTopButton").classList.toggle("active", result.favorites.includes(result.selectedHook));
    byId("favoriteTopButton").textContent = result.favorites.includes(result.selectedHook) ? "*" : "+";
    byId("whyList").innerHTML = result.why.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    byId("platformLens").textContent = result.platformLens;
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.tab));
    renderTab();
  }

  function renderTab() {
    const result = state.result;
    const content = byId("tabContent");
    if (state.tab === "hooks" || state.tab === "titles") {
      const items = state.tab === "hooks" ? result.hooks : result.titles;
      content.innerHTML = `<div class="section-toolbar"><h2>${state.tab === "hooks" ? "Hook options" : "Searchable titles"}</h2><button class="quiet-button" type="button" data-copy-section="${state.tab}">Copy all</button></div><div class="result-list">${items.map((item, index) => `<div class="result-row ${state.tab === "hooks" && result.selectedHook === index ? "selected" : ""}"><span class="row-number">${index + 1}</span><button class="row-copy" type="button" data-select-index="${index}">${escapeHtml(item)}</button><span class="row-actions">${state.tab === "hooks" ? `<button class="mini-button" type="button" data-favorite-index="${index}" title="Favorite">${result.favorites.includes(index) ? "*" : "+"}</button>` : ""}<button class="mini-button" type="button" data-copy-index="${index}" title="Copy">Copy</button></span></div>`).join("")}</div>`;
    } else if (state.tab === "shots") {
      content.innerHTML = `<div class="section-toolbar"><h2>${result.input.length}-second shot plan</h2><button class="quiet-button" type="button" data-copy-section="shots">Copy all</button></div><div class="shot-list">${result.shots.map((shot) => `<div class="shot-row"><span class="timecode">${shot.time}</span><span class="shot-label">${escapeHtml(shot.label)}</span><span>${escapeHtml(shot.spoken)}</span><span class="shot-direction">${escapeHtml(shot.visual)}</span></div>`).join("")}</div>`;
    } else if (state.tab === "caption") {
      content.innerHTML = `<div class="section-toolbar"><h2>Caption and hashtags</h2><button class="quiet-button" type="button" data-copy-section="caption">Copy all</button></div><div class="caption-box">${escapeHtml(result.caption)}</div><div class="hashtag-list">${result.hashtags.map((tag) => `<span class="hashtag">${escapeHtml(tag)}</span>`).join("")}</div>`;
    } else {
      const done = result.checklist.filter((item) => item.done).length;
      content.innerHTML = `<div class="section-toolbar"><h2>Posting checklist</h2><span class="counter">${done} / ${result.checklist.length} ready</span></div><div class="checklist">${result.checklist.map((item, index) => `<label class="check-item ${item.done ? "done" : ""}"><input type="checkbox" data-check-index="${index}" ${item.done ? "checked" : ""}><span>${escapeHtml(item.label)}</span></label>`).join("")}</div>`;
    }
  }

  function renderHistory() {
    const list = byId("historyList");
    if (!list) return;
    if (!state.history.length) {
      list.innerHTML = '<p class="history-empty">Your generated kits will appear here.</p>';
      return;
    }
    list.innerHTML = state.history.map((item, index) => `<article class="history-item"><button type="button" data-history-index="${index}"><span class="history-topic">${escapeHtml(item.input.topic)}</span><span class="history-meta">${escapeHtml(item.input.platform)} - ${escapeHtml(item.input.tone)} - ${item.input.length}s</span></button></article>`).join("");
  }

  function updatePlatformTip() {
    const notes = {
      fastfeed: "Fast-feed clips reward immediate tension and conversational delivery.",
      visualfeed: "Visual-feed clips benefit from saveable value and a clear cover phrase.",
      searchfeed: "Search-feed clips benefit from searchable phrasing and a closed-loop payoff."
    };
    byId("platformTip").querySelector("span").textContent = notes[form.elements.platform.value];
  }

  function openHistory(open) {
    byId("historyPanel").classList.toggle("open", open);
    byId("historyPanel").setAttribute("aria-hidden", String(!open));
    byId("scrim").hidden = !open;
  }

  function openUpgrade() { byId("upgradeDialog").showModal(); }

  form.addEventListener("submit", (event) => { event.preventDefault(); generate(true); });
  topicInput.addEventListener("input", () => { byId("topicCounter").textContent = `${topicInput.value.length} / 180`; });
  form.elements.platform.forEach((radio) => radio.addEventListener("change", updatePlatformTip));
  form.querySelectorAll('input[name="length"]').forEach((radio) => radio.addEventListener("change", () => {
    byId("durationHint").textContent = { 15: "One fast idea", 30: "Fast, focused value", 45: "Room for examples", 60: "Deeper mini-tutorial" }[radio.value];
  }));
  document.querySelectorAll(".topic-chip").forEach((button) => button.addEventListener("click", () => {
    topicInput.value = button.dataset.topic;
    topicInput.dispatchEvent(new Event("input"));
    topicInput.focus();
  }));
  document.querySelector(".tabs").addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (!tab) return;
    state.tab = tab.dataset.tab;
    render();
  });
  byId("tabContent").addEventListener("click", (event) => {
    const select = event.target.closest("[data-select-index]");
    const favorite = event.target.closest("[data-favorite-index]");
    const copy = event.target.closest("[data-copy-index]");
    const copySection = event.target.closest("[data-copy-section]");
    if (select && state.tab === "hooks") { state.result.selectedHook = Number(select.dataset.selectIndex); render(); }
    if (favorite) {
      const index = Number(favorite.dataset.favoriteIndex);
      state.result.favorites = state.result.favorites.includes(index) ? state.result.favorites.filter((item) => item !== index) : state.result.favorites.concat(index);
      render();
    }
    if (copy) {
      const list = state.tab === "hooks" ? state.result.hooks : state.result.titles;
      copyText(list[Number(copy.dataset.copyIndex)], state.tab === "hooks" ? "Hook" : "Title");
    }
    if (copySection) {
      const key = copySection.dataset.copySection;
      const text = key === "caption" ? `${state.result.caption}\n\n${state.result.hashtags.join(" ")}` : key === "shots" ? state.result.shots.map((shot) => `${shot.time} ${shot.label}: ${shot.spoken} Visual: ${shot.visual}`).join("\n") : state.result[key].map((item, index) => `${index + 1}. ${item}`).join("\n");
      copyText(text, "Section");
    }
  });
  byId("tabContent").addEventListener("change", (event) => {
    const check = event.target.closest("[data-check-index]");
    if (!check) return;
    state.result.checklist[Number(check.dataset.checkIndex)].done = check.checked;
    renderTab();
  });
  byId("favoriteTopButton").addEventListener("click", () => {
    const index = state.result.selectedHook;
    state.result.favorites = state.result.favorites.includes(index) ? state.result.favorites.filter((item) => item !== index) : state.result.favorites.concat(index);
    render();
  });
  byId("copyTopButton").addEventListener("click", () => copyText(state.result.hooks[state.result.selectedHook], "Hook"));
  byId("copyKitButton").addEventListener("click", () => copyText(Generator.toText(state.result), "Full kit"));
  byId("printButton").addEventListener("click", () => window.print());
  byId("jsonButton").addEventListener("click", () => downloadFile(`shorts-hook-lab-${state.result.id}.json`, JSON.stringify(state.result, null, 2), "application/json"));
  byId("textButton").addEventListener("click", () => downloadFile(`shorts-hook-lab-${state.result.id}.txt`, Generator.toText(state.result), "text/plain"));
  byId("historyButton").addEventListener("click", () => openHistory(true));
  byId("closeHistoryButton").addEventListener("click", () => openHistory(false));
  byId("scrim").addEventListener("click", () => openHistory(false));
  byId("clearHistoryButton").addEventListener("click", () => { state.history = []; saveHistory(); setStatus("Local history cleared"); });
  byId("historyList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-history-index]");
    if (!button) return;
    state.result = JSON.parse(JSON.stringify(state.history[Number(button.dataset.historyIndex)]));
    const input = state.result.input;
    topicInput.value = input.topic;
    byId("toneSelect").value = input.tone;
    form.querySelector(`[name="platform"][value="${input.platform}"]`).checked = true;
    form.querySelector(`[name="length"][value="${input.length}"]`).checked = true;
    topicInput.dispatchEvent(new Event("input"));
    updatePlatformTip();
    state.tab = "hooks";
    render();
    openHistory(false);
    setStatus("Saved kit restored");
  });
  [byId("upgradeButton"), byId("railUpgradeButton")].forEach((button) => button.addEventListener("click", openUpgrade));
  byId("closeUpgradeButton").addEventListener("click", () => byId("upgradeDialog").close());
  byId("marketplaceCopyButton").addEventListener("click", () => copyText("Lifetime edition: one-time purchase for unlimited saved projects, custom formula packs, brand voice presets, batch generation, and branded exports. No subscription.", "Sales-page note"));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") openHistory(false); if ((event.ctrlKey || event.metaKey) && event.key === "Enter") generate(true); });

  topicInput.dispatchEvent(new Event("input"));
  renderHistory();
  generate(false);
})();
