const form = document.querySelector("#rushForm");
const result = document.querySelector("#result");
const statusBadge = document.querySelector("#statusBadge");
const copyButton = document.querySelector("#copyAll");
const resetButton = document.querySelector("#reset");

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function asNumber(value, fallback) {
  const parsed = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function calculate(data) {
  const baseQuote = asNumber(data.get("baseQuote"), 1200);
  const normalDays = asNumber(data.get("normalDays"), 10);
  const rushDays = Math.max(1, asNumber(data.get("rushDays"), 3));
  const compression = Math.max(0, 1 - rushDays / normalDays);

  let multiplier = 0.12 + compression * 0.55;
  const afterHours = data.get("afterHours");
  const clarity = data.get("scopeClarity");
  const approvals = data.get("approvalSpeed");

  if (afterHours === "some") multiplier += 0.08;
  if (afterHours === "heavy") multiplier += 0.18;
  if (clarity === "mixed") multiplier += 0.08;
  if (clarity === "unclear") multiplier += 0.18;
  if (approvals === "normal") multiplier += 0.04;
  if (approvals === "slow") multiplier += 0.14;

  multiplier = Math.min(0.95, Math.max(0.12, multiplier));
  const low = Math.round(baseQuote * Math.max(0.1, multiplier - 0.07));
  const mid = Math.round(baseQuote * multiplier);
  const high = Math.round(baseQuote * Math.min(1.1, multiplier + 0.12));
  const total = baseQuote + mid;

  const risks = [];
  if (compression > 0.5) risks.push("Timeline is compressed by more than half; reduce deliverables or add approval cutoffs.");
  if (afterHours !== "none") risks.push("After-hours work should have a written cutoff for feedback, revisions, and response times.");
  if (clarity !== "clear") risks.push("Unclear scope can turn a rush job into unpaid expansion; list what is excluded.");
  if (approvals === "slow") risks.push("Slow approvals conflict with a rush timeline; require same-day feedback windows.");
  if (!risks.length) risks.push("Risk appears manageable if scope, approvals, and delivery checkpoints are written down.");

  return { baseQuote, low, mid, high, total, multiplier, compression, risks };
}

function noteFor(data, calc) {
  const name = data.get("projectName") || "the project";
  const tone = data.get("tone");
  const rushDays = asNumber(data.get("rushDays"), 3);
  const normalDays = asNumber(data.get("normalDays"), 10);
  const constraints = data.get("constraints") || "The faster timeline requires protected production time and quicker approvals.";

  if (tone === "firm") {
    return `I can prioritize ${name} for a ${rushDays}-day turnaround instead of the usual ${normalDays}-day window. Because this compresses production time and requires protected capacity, the rush premium would be ${money.format(calc.mid)}, bringing the estimated total to ${money.format(calc.total)}. To keep the timeline workable, scope, assets, and approvals need to stay inside the checkpoints below. ${constraints}`;
  }

  if (tone === "direct") {
    return `Yes, I can price a rush option for ${name}. The accelerated ${rushDays}-day timeline adds a rush premium of ${money.format(calc.mid)}, for an estimated total of ${money.format(calc.total)}. This assumes the scope is locked, source materials are ready, and feedback arrives within the agreed review windows. ${constraints}`;
  }

  return `I can help with a faster path for ${name}. To protect the timeline and reserve the extra production capacity, I would add a rush premium of ${money.format(calc.mid)}, making the estimated total ${money.format(calc.total)}. The main thing that keeps this smooth is a clear scope, ready assets, and quick approvals at each checkpoint. ${constraints}`;
}

function render(event) {
  event?.preventDefault();
  const data = new FormData(form);
  const calc = calculate(data);
  const project = escapeHtml(data.get("projectName") || "Rush project");
  const note = escapeHtml(noteFor(data, calc));
  const premiumPercent = Math.round(calc.multiplier * 100);
  const compressionPercent = Math.round(calc.compression * 100);

  statusBadge.textContent = premiumPercent >= 60 ? "High rush load" : "Draft";
  result.innerHTML = `
    <article class="card">
      <h3>${project} rush range</h3>
      <div class="fee">
        <div><span>Conservative</span><strong>${money.format(calc.low)}</strong></div>
        <div><span>Suggested</span><strong>${money.format(calc.mid)}</strong></div>
        <div><span>Upper range</span><strong>${money.format(calc.high)}</strong></div>
      </div>
      <p>Estimated total with suggested rush premium: <strong>${money.format(calc.total)}</strong>. The timeline is compressed by about <strong>${compressionPercent}%</strong>, and the suggested premium is about <strong>${premiumPercent}%</strong> of the standard quote.</p>
    </article>
    <article class="card">
      <h3>Client-ready note</h3>
      <p>${note}</p>
    </article>
    <article class="card">
      <h3>Delivery safeguards</h3>
      <ul>
        <li>Confirm what is included, what is excluded, and what counts as a new request.</li>
        <li>Require assets, access, and approvals before the rush timeline starts.</li>
        <li>Set one or two feedback windows instead of open-ended revisions.</li>
        <li>Collect written approval for rush premium, due date, and handoff format.</li>
      </ul>
    </article>
    <article class="card">
      <h3>Risk notes</h3>
      <ul>${calc.risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join("")}</ul>
    </article>
    <article class="card">
      <h3>Boundary note</h3>
      <p>This is an operational estimate and writing aid, not legal, tax, accounting, or financial advice. Review the fee, scope, and wording against your contract, client relationship, and local rules before sending. No acceptance, revenue, profit, client response, or project outcome is guaranteed.</p>
    </article>
  `;
}

function copyOutput() {
  const text = result.innerText.trim();
  if (!text) return;
  navigator.clipboard?.writeText(text);
  copyButton.textContent = "Copied";
  setTimeout(() => { copyButton.textContent = "Copy output"; }, 1400);
}

function resetForm() {
  form.reset();
  statusBadge.textContent = "Draft";
  render();
}

form.addEventListener("submit", render);
copyButton.addEventListener("click", copyOutput);
resetButton.addEventListener("click", resetForm);
render();
