const assert = require("node:assert/strict");
const test = require("node:test");
const kit = require("../generator.js");

const sample = {
  clientName: "Morgan Lee",
  businessName: "Bright Desk Studio",
  projectName: "Website refresh",
  outcome: "Relaunch a clearer service website.",
  deliverables: "Strategy brief\nHomepage copy\nLaunch checklist",
  startDate: "July 8",
  wrapDate: "August 2",
  communication: "Weekly Friday update by email.",
  boundaries: "Two feedback rounds are included.",
  nextSteps: "Sign agreement\nSend brand files\nBook kickoff call"
};

test("buildPacket includes required onboarding sections", () => {
  const packet = kit.buildPacket(sample);
  ["Project Outcome", "What Is Included", "Timeline", "Communication Rhythm", "Working Boundaries", "Next Steps", "Review Notes"].forEach((heading) => assert.match(packet, new RegExp(heading)));
});

test("buildEmail stays draft-only and avoids claims", () => {
  const email = kit.buildEmail(sample);
  assert.match(email, /Subject: Welcome to Website refresh/);
  assert.doesNotMatch(email, /guarantee|earnings|send automatically/i);
});

test("normalization applies safe fallbacks", () => {
  const data = kit.normalize({ clientName: "", projectName: "  " });
  assert.equal(data.clientName, "Client");
  assert.equal(data.projectName, "New Project");
});
