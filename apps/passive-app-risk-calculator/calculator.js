(function () {
  "use strict";

  const RULESET_VERSION = "passive-app-risk-v1";

  const RISK_WEIGHTS = {
    unknownCompany: 18,
    requiresKyc: 14,
    residentialProxy: 24,
    unclearDataUse: 18,
    ispConcern: 20,
    alwaysOnDevice: 8,
    lowReviews: 12
  };

  const FLAG_COPY = {
    unknownCompany: "Operator is hard to verify.",
    requiresKyc: "Identity or payment details are required before terms are clear.",
    residentialProxy: "Residential traffic routing can create account, privacy, or ISP risk.",
    unclearDataUse: "Data collection or traffic use is unclear.",
    ispConcern: "Terms may conflict with ISP, device, or account rules.",
    alwaysOnDevice: "Always-on device use adds electricity, wear, and monitoring needs.",
    lowReviews: "Independent reviews or complaint resolution evidence is limited."
  };

  function asNumber(value, fallback = 0) {
    const parsed = Number.parseFloat(String(value ?? "").replace(/[^0-9.\-]/g, ""));
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function money(value) {
    return `$${Number(value || 0).toFixed(2)}`;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function readFlags(raw) {
    return Object.keys(RISK_WEIGHTS).filter((key) => Boolean(raw[key]));
  }

  function calculate(raw) {
    const request = {
      app_name: String(raw.appName || "Passive app experiment").trim(),
      category: String(raw.category || "Other passive app").trim(),
      claimed_monthly_payout: asNumber(raw.claimedPayout),
      payout_threshold: asNumber(raw.payoutThreshold),
      device_watts: asNumber(raw.deviceWatts),
      hours_per_day: clamp(asNumber(raw.hoursPerDay), 0, 24),
      electricity_cost_per_kwh: asNumber(raw.kwhCost),
      bandwidth_gb_month: asNumber(raw.bandwidthGb),
      data_cap_gb_month: asNumber(raw.dataCapGb),
      overage_cost_per_gb: asNumber(raw.overageCost),
      notes: String(raw.notes || "").trim(),
      flags: readFlags(raw)
    };

    const kwhMonthly = (request.device_watts * request.hours_per_day * 30) / 1000;
    const electricityCost = kwhMonthly * request.electricity_cost_per_kwh;
    const overageGb = request.data_cap_gb_month > 0 ? Math.max(0, request.bandwidth_gb_month - request.data_cap_gb_month) : 0;
    const overageCost = overageGb * request.overage_cost_per_gb;
    const estimatedCosts = electricityCost + overageCost;
    const netEstimate = request.claimed_monthly_payout - estimatedCosts;
    const payoutDelayMonths = request.claimed_monthly_payout > 0
      ? Math.ceil(request.payout_threshold / request.claimed_monthly_payout)
      : null;

    let score = request.flags.reduce((total, flag) => total + RISK_WEIGHTS[flag], 0);
    if (netEstimate <= 0 && request.claimed_monthly_payout > 0) score += 16;
    if (request.claimed_monthly_payout === 0) score += 10;
    if (payoutDelayMonths && payoutDelayMonths > 3) score += 8;
    if (request.bandwidth_gb_month > 0 && request.data_cap_gb_month > 0 && request.bandwidth_gb_month > request.data_cap_gb_month * 0.5) score += 8;
    score = clamp(Math.round(score), 0, 100);

    let decision = "review_first";
    if (score >= 70 || request.flags.includes("residentialProxy") || request.flags.includes("ispConcern")) {
      decision = "avoid_or_quarantine";
    } else if (score <= 30 && netEstimate > 0) {
      decision = "small_test_only";
    }

    const riskFlags = request.flags.map((flag) => ({
      id: flag,
      weight: RISK_WEIGHTS[flag],
      message: FLAG_COPY[flag]
    }));

    const checklist = [
      "Read the app terms, privacy policy, payout rules, and deletion process.",
      "Check ISP, device, app-store, and account rules before installing.",
      "Use a test device or isolated profile if you proceed.",
      "Set a stop date, bandwidth cap, payout review, and uninstall trigger.",
      "Track actual payout, electricity, bandwidth, support issues, and time spent.",
      "Do not install if traffic use, operator identity, or account risk remains unclear."
    ];

    return {
      ruleset_version: RULESET_VERSION,
      request,
      decision,
      risk_score: score,
      cost_breakdown: {
        claimed_monthly_payout: Number(request.claimed_monthly_payout.toFixed(2)),
        electricity_kwh_month: Number(kwhMonthly.toFixed(2)),
        electricity_cost: Number(electricityCost.toFixed(2)),
        overage_gb: Number(overageGb.toFixed(2)),
        overage_cost: Number(overageCost.toFixed(2)),
        estimated_total_cost: Number(estimatedCosts.toFixed(2)),
        monthly_net_estimate: Number(netEstimate.toFixed(2)),
        payout_delay_months: payoutDelayMonths
      },
      risk_flags: riskFlags,
      checklist,
      disclaimer: "Educational estimate only. Not an endorsement, payout prediction, tax advice, legal advice, or privacy advice."
    };
  }

  function toCsv(report) {
    const rows = [
      ["field", "value"],
      ["decision", report.decision],
      ["risk_score", report.risk_score],
      ["claimed_monthly_payout", money(report.cost_breakdown.claimed_monthly_payout)],
      ["electricity_cost", money(report.cost_breakdown.electricity_cost)],
      ["overage_cost", money(report.cost_breakdown.overage_cost)],
      ["monthly_net_estimate", money(report.cost_breakdown.monthly_net_estimate)],
      ["risk_flags", report.risk_flags.map((flag) => flag.id).join("|") || "none"]
    ];
    return rows.map((row) => row.map((item) => `"${String(item).replaceAll('"', '""')}"`).join(",")).join("\n");
  }

  window.PassiveAppRiskCalculator = {
    calculate,
    toCsv,
    money,
    rulesetVersion: RULESET_VERSION
  };
})();
