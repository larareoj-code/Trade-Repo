(function () {
  const formatLabels = { short: "Vertical short", explainer: "Product explainer", tutorial: "Tutorial sequence", promo: "Marketplace promo" };
  const toneProfiles = {
    clear: { hook: "Name the practical problem in plain language.", movement: "steady screen-led pacing", voice: "clear, useful, direct" },
    playful: { hook: "Open with a small surprising contrast.", movement: "quick cuts with bright caption beats", voice: "playful, warm, energetic" },
    premium: { hook: "Begin with a calm before-and-after promise.", movement: "slow, polished product walkthrough", voice: "premium, composed, focused" },
    urgent: { hook: "Lead with the cost of staying disorganized.", movement: "fast proof-led sequence", voice: "direct, punchy, action-oriented" }
  };
  const scenePurposes = ["Hook the viewer with the core tension", "Show the messy before state", "Introduce the planning framework", "Walk through the most useful output", "Show the finished pack in context", "Add trust with boundaries and provenance", "Close with the next practical action", "Leave a memorable final frame"];
  const visualPatterns = { short: ["phone-screen mockup", "over-the-shoulder desk shot", "caption-first closeup", "checklist reveal"], explainer: ["clean product dashboard", "before-and-after split", "cursor-led walkthrough", "result preview"], tutorial: ["step number card", "screen recording crop", "annotated cursor path", "finished example"], promo: ["marketplace cover", "benefit stack", "included files spread", "buyer outcome screen"] };

  function cleanList(value) { return String(value || "").split(/,|\n/).map((item) => item.trim()).filter(Boolean); }
  function clampScenes(value) { const count = Number.parseInt(value, 10); if (Number.isNaN(count)) return 5; return Math.min(8, Math.max(3, count)); }
  function secondsForScene(runtime, sceneCount, index) { const total = Number.parseInt(runtime, 10) || 30; const base = Math.floor(total / sceneCount); const extra = index < total % sceneCount ? 1 : 0; return base + extra; }
  function titleCase(value) { return String(value || "").replace(/\s+/g, " ").trim().replace(/\b\w/g, (letter) => letter.toUpperCase()); }

  function buildScenes(input) {
    const patterns = visualPatterns[input.format] || visualPatterns.short;
    return Array.from({ length: input.sceneCount }, (_, index) => {
      const duration = secondsForScene(input.runtime, input.sceneCount, index);
      const visual = patterns[index % patterns.length];
      const purpose = scenePurposes[index] || scenePurposes[scenePurposes.length - 1];
      const movement = toneProfiles[input.tone].movement;
      return {
        id: `S${String(index + 1).padStart(2, "0")}`,
        duration,
        purpose,
        visualAction: `${visual}: connect "${input.idea}" to ${input.outcome}.`,
        camera: index % 2 === 0 ? "tight vertical frame, readable text, stable motion" : "medium vertical frame, one clear focal point",
        motion: movement,
        caption: index === 0 ? input.idea : purpose,
        prompt: [`Create a ${input.formatLabel.toLowerCase()} scene for ${input.audience}.`, `Visual: ${visual}.`, `Goal: ${purpose.toLowerCase()}.`, "Show original or licensed assets only. Keep text readable in 9:16."].join(" "),
        negativePrompt: ["No copyrighted characters.", "No scraped clips.", "No fake earnings, view counts, testimonials, platform guarantees, or unsafe claims.", input.noFaces ? "No identifiable faces required." : "Use only consented likenesses if people appear."].join(" ")
      };
    });
  }

  function buildPack(rawInput) {
    const input = {
      idea: rawInput.idea.trim() || "Untitled video idea",
      audience: rawInput.audience.trim() || "busy creators",
      outcome: rawInput.outcome.trim() || "create a clear video plan",
      format: rawInput.format || "short",
      formatLabel: formatLabels[rawInput.format] || formatLabels.short,
      tone: rawInput.tone || "clear",
      runtime: rawInput.runtime || "30",
      sceneCount: clampScenes(rawInput.sceneCount),
      mustInclude: cleanList(rawInput.mustInclude),
      avoid: cleanList(rawInput.avoid),
      noFaces: Boolean(rawInput.noFaces),
      localAssets: Boolean(rawInput.localAssets),
      noClaims: Boolean(rawInput.noClaims)
    };
    const profile = toneProfiles[input.tone] || toneProfiles.clear;
    const scenes = buildScenes(input);
    const slug = titleCase(input.idea).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "video-pack";
    const hooks = [`${input.idea} is easier to plan when every scene has a job.`, `Here is the fast way to turn ${input.idea.toLowerCase()} into a video pack.`, "Before you generate anything, map the shot, caption, and proof.", "Stop starting from a blank timeline. Start with this plan.", `One idea, ${input.sceneCount} scenes, zero API spend.`];
    const qaChecks = [
      { label: "Generation boundary", status: "pass", note: "This pack contains planning text only and does not call generation APIs." },
      { label: "Asset rights", status: input.localAssets ? "pass" : "warn", note: input.localAssets ? "Prompts require original or properly licensed assets." : "Add a rights review before production." },
      { label: "Claims", status: input.noClaims ? "pass" : "warn", note: input.noClaims ? "Revenue, view, and performance promises are excluded." : "Review copy for unsupported claims." },
      { label: "Faceless option", status: input.noFaces ? "pass" : "warn", note: input.noFaces ? "Shots work without identifiable people." : "Keep consent records for any visible people." }
    ];
    const pack = {
      product: "Video Prompt Pack Builder",
      schemaVersion: "vppb-local-v1",
      generationEnabled: false,
      slug,
      createdAt: new Date().toISOString(),
      input,
      brief: { title: `${titleCase(input.idea)} - ${input.formatLabel} Prompt Pack`, audience: input.audience, outcome: input.outcome, tone: profile.voice, hookStrategy: profile.hook, runtimeSeconds: Number.parseInt(input.runtime, 10) || 30, sceneCount: input.sceneCount },
      hooks,
      scenes,
      prompts: {
        cover: `Design an original 9:16 cover for "${input.idea}" with large readable title text, a clean planning-board visual, and no copyrighted assets.`,
        voiceover: `Write a ${input.runtime}-second ${profile.voice} voiceover for ${input.audience} that helps them ${input.outcome}.`,
        captions: "Create short caption beats for each scene. Keep each caption under eight words and aligned to the scene purpose.",
        production: `Use screen recordings, original graphics, and simple motion to demonstrate ${input.idea}. Keep the video planning-only until human review approves production.`
      },
      mustInclude: input.mustInclude,
      avoid: input.avoid,
      qaChecks,
      continuityChecklist: ["Same product name, color palette, and visual style across every scene.", "Each scene has one readable focal point.", "The final CTA points to a practical next action, not a guaranteed result.", "Every asset source can be documented before publication."]
    };
    pack.markdown = renderMarkdown(pack);
    return pack;
  }

  function renderMarkdown(pack) {
    const lines = [];
    lines.push(`# ${pack.brief.title}`, "", `Schema: ${pack.schemaVersion}`, `Generation enabled: ${pack.generationEnabled}`, `Audience: ${pack.brief.audience}`, `Outcome: ${pack.brief.outcome}`, `Tone: ${pack.brief.tone}`, `Runtime: ${pack.brief.runtimeSeconds} seconds`, "", "## Hooks");
    pack.hooks.forEach((hook) => lines.push(`- ${hook}`));
    lines.push("", "## Scene Plan");
    pack.scenes.forEach((scene) => { lines.push(`### ${scene.id} - ${scene.duration}s`, `Purpose: ${scene.purpose}`, `Visual action: ${scene.visualAction}`, `Camera: ${scene.camera}`, `Motion: ${scene.motion}`, `Caption: ${scene.caption}`, ""); });
    lines.push("## Prompt Pack", `Cover: ${pack.prompts.cover}`, `Voiceover: ${pack.prompts.voiceover}`, `Captions: ${pack.prompts.captions}`, `Production: ${pack.prompts.production}`);
    pack.scenes.forEach((scene) => { lines.push("", `${scene.id} prompt: ${scene.prompt}`, `${scene.id} negative prompt: ${scene.negativePrompt}`); });
    lines.push("", "## Continuity Checklist"); pack.continuityChecklist.forEach((item) => lines.push(`- ${item}`));
    lines.push("", "## QA Checks"); pack.qaChecks.forEach((check) => lines.push(`- ${check.label}: ${check.status.toUpperCase()} - ${check.note}`));
    lines.push("", "## Must Include"); pack.mustInclude.forEach((item) => lines.push(`- ${item}`));
    lines.push("", "## Avoid"); pack.avoid.forEach((item) => lines.push(`- ${item}`));
    return lines.join("\n");
  }

  window.VideoPromptPackBuilder = { buildPack };
})();
