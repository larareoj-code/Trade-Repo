(function () {
  const fields = {
    idea: document.getElementById("idea"), audience: document.getElementById("audience"), outcome: document.getElementById("outcome"), format: document.getElementById("format"), tone: document.getElementById("tone"), runtime: document.getElementById("runtime"), sceneCount: document.getElementById("sceneCount"), noFaces: document.getElementById("noFaces"), localAssets: document.getElementById("localAssets"), noClaims: document.getElementById("noClaims"), mustInclude: document.getElementById("mustInclude"), avoid: document.getElementById("avoid")
  };
  const views = { brief: document.getElementById("briefView"), prompts: document.getElementById("promptsView"), qa: document.getElementById("qaView"), export: document.getElementById("exportView") };
  const saveStatus = document.getElementById("saveStatus");
  const sceneMetric = document.getElementById("sceneMetric");
  const runtimeMetric = document.getElementById("runtimeMetric");
  const storageKey = "video-prompt-pack-builder-state";
  let currentPack = null;

  function readInput() { return Object.fromEntries(Object.entries(fields).map(([key, element]) => [key, element.type === "checkbox" ? element.checked : element.value])); }
  function saveState() { localStorage.setItem(storageKey, JSON.stringify(readInput())); saveStatus.textContent = "Saved locally"; }
  function loadState() { const saved = localStorage.getItem(storageKey); if (!saved) return; try { const state = JSON.parse(saved); Object.entries(state).forEach(([key, value]) => { if (!fields[key]) return; if (fields[key].type === "checkbox") fields[key].checked = Boolean(value); else fields[key].value = value; }); } catch { localStorage.removeItem(storageKey); } }
  function el(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }

  function renderBrief(pack) {
    views.brief.innerHTML = "";
    const summary = el("div", "summary-grid");
    [["Audience", pack.brief.audience], ["Outcome", pack.brief.outcome], ["Hook Strategy", pack.brief.hookStrategy]].forEach(([label, value]) => { const box = el("div", "summary-box"); box.append(el("strong", "", label), el("span", "", value)); summary.append(box); });
    const tags = el("div", "tag-row"); ["No APIs", "Planning only", "Local storage", "Exportable"].forEach((tag) => tags.append(el("span", "tag", tag)));
    const sceneList = el("div", "scene-list");
    pack.scenes.forEach((scene) => { const card = el("article", "scene-card"); const top = el("div", "scene-top"); top.append(el("strong", "", `${scene.id} ${scene.purpose}`), el("span", "", `${scene.duration}s`)); card.append(top, el("p", "", scene.visualAction)); sceneList.append(card); });
    views.brief.append(summary, tags, sceneList);
  }
  function renderPrompts(pack) {
    views.prompts.innerHTML = "";
    const list = el("div", "prompt-list");
    Object.entries(pack.prompts).forEach(([label, value]) => { const block = el("article", "prompt-block"); block.append(el("h3", "", label.replace(/^\w/, (c) => c.toUpperCase())), el("p", "", value)); list.append(block); });
    pack.scenes.forEach((scene) => { const block = el("article", "prompt-block"); block.append(el("h3", "", `${scene.id} scene prompt`), el("p", "", scene.prompt), el("p", "", `Negative: ${scene.negativePrompt}`)); list.append(block); });
    views.prompts.append(list);
  }
  function renderQa(pack) {
    views.qa.innerHTML = "";
    const list = el("div", "qa-list");
    pack.qaChecks.forEach((check) => { const row = el("article", "qa-row"); row.append(el("strong", check.status === "pass" ? "pass" : "warn", `${check.status.toUpperCase()} ${check.label}`), el("p", "", check.note)); list.append(row); });
    const checklist = el("article", "prompt-block"); checklist.append(el("h3", "", "Continuity checklist")); pack.continuityChecklist.forEach((item) => checklist.append(el("p", "", `- ${item}`))); list.append(checklist); views.qa.append(list);
  }
  function renderExport(pack) { views.export.innerHTML = ""; views.export.append(el("pre", "", pack.markdown)); }
  function render() { currentPack = window.VideoPromptPackBuilder.buildPack(readInput()); sceneMetric.textContent = `${currentPack.brief.sceneCount} scenes`; runtimeMetric.textContent = `${currentPack.brief.runtimeSeconds} sec`; renderBrief(currentPack); renderPrompts(currentPack); renderQa(currentPack); renderExport(currentPack); saveState(); }
  function download(filename, body, type) { const blob = new Blob([body], { type }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url); }
  function resetInputs() { localStorage.removeItem(storageKey); window.location.reload(); }

  document.getElementById("buildBtn").addEventListener("click", render);
  document.getElementById("resetBtn").addEventListener("click", resetInputs);
  document.getElementById("copyBtn").addEventListener("click", async () => { await navigator.clipboard.writeText(currentPack.markdown); saveStatus.textContent = "Copied pack"; setTimeout(() => { saveStatus.textContent = "Saved locally"; }, 1500); });
  document.getElementById("downloadTxtBtn").addEventListener("click", () => download(`${currentPack.slug}-prompt-pack.txt`, currentPack.markdown, "text/plain"));
  document.getElementById("downloadJsonBtn").addEventListener("click", () => download(`${currentPack.slug}-prompt-pack.json`, JSON.stringify(currentPack, null, 2), "application/json"));
  document.querySelectorAll(".tab").forEach((tab) => { tab.addEventListener("click", () => { document.querySelectorAll(".tab").forEach((node) => node.classList.remove("active")); document.querySelectorAll(".tab-view").forEach((node) => node.classList.remove("active")); tab.classList.add("active"); views[tab.dataset.tab].classList.add("active"); }); });
  Object.values(fields).forEach((field) => { field.addEventListener("input", () => { saveStatus.textContent = "Unsaved changes"; }); });
  loadState();
  render();
})();
