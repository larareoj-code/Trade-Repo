(function (root) {
  "use strict";

  const defaults = {
    clientName: "Client",
    businessName: "Your Studio",
    projectName: "New Project",
    outcome: "Create a clear project path and shared expectations.",
    deliverables: "Kickoff agenda\nProject checklist\nWeekly status notes",
    startDate: "To be scheduled",
    wrapDate: "To be confirmed",
    communication: "Weekly status update plus async questions by email.",
    boundaries: "Scope changes, rush work, and extra review rounds are discussed before work continues.",
    nextSteps: "Confirm kickoff date\nSend required assets\nReview this welcome packet"
  };

  function clean(value) {
    return String(value || "").replace(/\r\n/g, "\n").replace(/\t/g, " ").trim();
  }

  function lines(value, fallback) {
    const source = clean(value || fallback);
    return source.split("\n").map(clean).filter(Boolean);
  }

  function normalize(input) {
    const data = Object.assign({}, defaults, input || {});
    Object.keys(data).forEach((key) => { data[key] = clean(data[key]) || defaults[key]; });
    return data;
  }

  function bullets(items) {
    return items.length ? items.map((item) => `- ${item}`).join("\n") : "- To be confirmed";
  }

  function numbered(items) {
    return items.length ? items.map((item, index) => `${index + 1}. ${item}`).join("\n") : "1. Confirm next steps";
  }

  function buildPacket(input) {
    const data = normalize(input);
    const deliverables = lines(data.deliverables, defaults.deliverables);
    const nextSteps = lines(data.nextSteps, defaults.nextSteps);
    return [
      `# Welcome, ${data.clientName}`,
      "",
      `Prepared by: ${data.businessName}`,
      `Project: ${data.projectName}`,
      "",
      "## Project Outcome",
      "",
      data.outcome,
      "",
      "## What Is Included",
      "",
      bullets(deliverables),
      "",
      "## Timeline",
      "",
      `- Start: ${data.startDate}`,
      `- Target wrap: ${data.wrapDate}`,
      "- Dates may shift if approvals, assets, or scope decisions are delayed.",
      "",
      "## Communication Rhythm",
      "",
      data.communication,
      "",
      "## Working Boundaries",
      "",
      data.boundaries,
      "",
      "## Next Steps",
      "",
      numbered(nextSteps),
      "",
      "## Review Notes",
      "",
      "This packet is an organizational draft. It does not replace a contract, professional advice, or final project terms. Review all details before sharing with a client."
    ].join("\n");
  }

  function buildEmail(input) {
    const data = normalize(input);
    const firstStep = lines(data.nextSteps, defaults.nextSteps)[0] || "review the welcome packet";
    return [
      `Subject: Welcome to ${data.projectName}`,
      "",
      `Hi ${data.clientName},`,
      "",
      `I am excited to get started on ${data.projectName}. I put together a short welcome packet so we have the outcome, deliverables, timeline, communication rhythm, and next steps in one place.`,
      "",
      `The first step is: ${firstStep}.`,
      "",
      "Please review the packet and send back any edits or questions before kickoff.",
      "",
      `Thanks,\n${data.businessName}`
    ].join("\n");
  }

  function buildAll(input) {
    const data = normalize(input);
    return { data, packet: buildPacket(data), email: buildEmail(data), createdAt: new Date().toISOString() };
  }

  const api = { defaults, clean, lines, normalize, buildPacket, buildEmail, buildAll };
  root.ClientWelcomeKit = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
