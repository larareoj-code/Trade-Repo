(function () {
  "use strict";

  const STORAGE_KEY = "passive-app-risk-calculator.v1";

  const fields = {
    appName: document.getElementById("appName"),
    category: document.getElementById("category"),
    claimedPayout: document.getElementById("claimedPayout"),
    payoutThreshold: document.getElementById("payoutThreshold"),
    deviceWatts: document.getElementById("deviceWatts"),
    hoursPerDay: document.getElementById("hoursPerDay"),
    kwhCost: document.getElementById("kwhCost"),
    bandwidthGb: document.getElementById("bandwidthGb"),
    dataCapGb: document.getElementById("dataCapGb"),
    overageCost: document.getElementById("overageCost"),
    unknownCompany: document.getElementById("unknownCompany"),
    requiresKyc: document.getElementById("requiresKyc"),
    residentialProxy: document.getElementById("residentialProxy"),
    unclearDataUse: document.getElementById("unclearDataUse"),
    ispConcern: document.getElementById("ispConcern"),
    alwaysOnDevice: document.getElementById("alwaysOnDevice"),
    lowReviews: document.getElementById("lowReviews"),
    notes: document.getElementById("notes")
  };

  const defaults = {
    appName: "Bandwidth-sharing review",
    category: "Bandwidth sharing",
    claimedPayout: "12",
    payoutThreshold: "20",
    deviceWatts: "35",
    hoursPerDay: "12",
    kwhCost: "0.30",
    bandwidthGb: "150",
    dataCapGb: "1000",
    overageCost: "0",
    unknownCompany: false,
    requiresKyc: false,
    residentialProxy: true,
    unclearDataUse: true,
    ispConcern: true,
    alwaysOnDevice: true,
    lowReviews: false,
    notes: "Review terms and uninstall path before any test."
  };

  const decisionValue = document.getElementById("decisionValue");
  const riskScore = document.getElementById("riskScore");
  const netEstimate = document.getElementById("netEstimate");
  const costList = document.getElementById("costList");
  const riskList = document.getElementById("riskList");
  const checklist = document.getElementById("checklist");
  const reportJson = document.getElementById("reportJson");
  const saveState = document.getElementById("saveState");

  let currentReport = null;

  function readForm() {
    return Object.fromEntries(Object.entries(fields).map(([key, input]) => [key, input.type === "checkbox" ? input.checked : input.value]));
  }

  function setForm(values) {
    Object.entries(fields).forEach(([key, input]) => {
      if (!Object.prototype.hasOwnProperty.call(values, key)) return;
      if (input.type === "checkbox") {
        input.checked = Boolean(values[key]);
      } else {
        input.value = values[key];
      }
    });
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readForm()));
    saveState.textContent = "Draft saved";
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      setForm(saved && typeof saved === "object" ? saved : defaults);
    } catch (_error) {
      setForm(defaults);
    }
  }

  function li(text) {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }

  function setList(node, items) {
    node.innerHTML = "";
    if (!items || items.length === 0) {
      node.appendChild(li("None"));
      return;
    }
    items.forEach((item) => node.appendChild(li(item)));
  }

  function labelDecision(decision) {
    if (decision === "avoid_or_quarantine") return "Avoid or quarantine";
    if (decision === "small_test_only") return "Small test only";
    return "Review first";
  }

  function render(report) {
    const money = window.PassiveAppRiskCalculator.money;
    decisionValue.textContent = labelDecision(report.decision);
    decisionValue.className = report.decision;
    riskScore.textContent = `${report.risk_score} / 100`;
    netEstimate.textContent = money(report.cost_breakdown.monthly_net_estimate);

    setList(costList, [
      `Claimed payout: ${money(report.cost_breakdown.claimed_monthly_payout)}`,
      `Electricity: ${report.cost_breakdown.electricity_kwh_month} kWh / ${money(report.cost_breakdown.electricity_cost)}`,
      `Data overage: ${report.cost_breakdown.overage_gb} GB / ${money(report.cost_breakdown.overage_cost)}`,
      `Estimated total cost: ${money(report.cost_breakdown.estimated_total_cost)}`,
      `Payout threshold delay: ${report.cost_breakdown.payout_delay_months === null ? "unavailable" : `${report.cost_breakdown.payout_delay_months} month(s)`}`
    ]);
    setList(riskList, report.risk_flags.map((flag) => `${flag.message} (+${flag.weight})`));
    setList(checklist, report.checklist);
    reportJson.textContent = JSON.stringify(report, null, 2);
  }

  function calculate() {
    currentReport = window.PassiveAppRiskCalculator.calculate(readForm());
    render(currentReport);
    persist();
  }

  function download(name, type, text) {
    const blob = new Blob([text], { type });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  }

  document.getElementById("calculateBtn").addEventListener("click", calculate);
  document.getElementById("copyBtn").addEventListener("click", () => {
    if (!currentReport) calculate();
    navigator.clipboard.writeText(reportJson.textContent).then(
      () => { saveState.textContent = "Report copied"; },
      () => { saveState.textContent = "Copy blocked"; }
    );
  });
  document.getElementById("downloadJsonBtn").addEventListener("click", () => {
    if (!currentReport) calculate();
    download("passive-app-risk-report.json", "application/json", JSON.stringify(currentReport, null, 2));
  });
  document.getElementById("downloadCsvBtn").addEventListener("click", () => {
    if (!currentReport) calculate();
    download("passive-app-risk-report.csv", "text/csv", window.PassiveAppRiskCalculator.toCsv(currentReport));
  });
  document.getElementById("resetBtn").addEventListener("click", () => {
    setForm(defaults);
    localStorage.removeItem(STORAGE_KEY);
    calculate();
  });

  document.getElementById("riskForm").addEventListener("input", persist);
  load();
  calculate();
})();
