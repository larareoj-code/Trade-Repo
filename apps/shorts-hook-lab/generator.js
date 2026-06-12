(function (root) {
  "use strict";

  const platformData = {
    fastfeed: {
      name: "Fast feed",
      lens: "Lead with tension in the first sentence, keep the language spoken and direct, then invite a specific comment or save.",
      titleLead: "POV:",
      captionLimit: 150,
      checklist: ["Hook text appears in the first second", "Cuts or visual changes happen every 2-3 seconds", "Spoken delivery sounds natural", "Caption invites one clear action", "Relevant sound choice is reviewed", "On-screen text is readable without audio", "Cover frame communicates the payoff"]
    },
    visualfeed: {
      name: "Visual feed",
      lens: "Make the result visually clear, write a saveable caption, and use a clean cover phrase that works on your profile grid.",
      titleLead: "Save this:",
      captionLimit: 300,
      checklist: ["Cover phrase is readable on the profile grid", "Hook works with sound off", "Visual result appears early", "Caption adds useful context", "3-8 focused hashtags are included", "Call to save or share feels natural", "People or products are tagged where relevant"]
    },
    searchfeed: {
      name: "Search feed",
      lens: "Promise a specific payoff, use a searchable title, maintain momentum through the middle, and close the loop before the final CTA.",
      titleLead: "How to",
      captionLimit: 220,
      checklist: ["Title includes a searchable phrase", "Payoff is clear in the first 3 seconds", "No long intro or channel greeting", "Visual changes support retention", "The ending closes the opening loop", "Description includes useful keywords", "CTA points to a relevant next video"]
    }
  };

  const toneData = {
    conversational: { lead: "Real talk:", adjective: "simple", delivery: "Talk to camera like you are helping one person." },
    bold: { lead: "Stop scrolling:", adjective: "unfiltered", delivery: "Use direct eye contact and decisive, clipped delivery." },
    helpful: { lead: "Try this:", adjective: "practical", delivery: "Use a calm teaching pace and show every important step." },
    playful: { lead: "Okay, hear me out:", adjective: "surprisingly fun", delivery: "Use quick reactions, visual contrast, and a light pace." },
    story: { lead: "I learned this the hard way:", adjective: "honest", delivery: "Open on the consequence, then rewind to the turning point." }
  };

  function hashString(input) {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededPicker(seed) {
    let state = seed || 1;
    return function pick(list, offset) {
      state = (Math.imul(state ^ (offset || 0), 1664525) + 1013904223) >>> 0;
      return list[state % list.length];
    };
  }

  function cleanTopic(value) {
    const topic = String(value || "").trim().replace(/\s+/g, " ");
    return topic || "a useful idea your audience can try today";
  }

  function sentence(value) {
    const text = cleanTopic(value).replace(/[.!?]+$/, "");
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function shortTopic(value) {
    const topic = cleanTopic(value).replace(/^(how to|ways to|tips for|a guide to)\s+/i, "");
    const words = topic.split(" ");
    return words.slice(0, 9).join(" ");
  }

  function keywords(value) {
    const stop = new Set(["this", "that", "with", "from", "your", "ways", "about", "into", "have", "make", "making", "simple", "better", "three", "cheap", "home"]);
    return cleanTopic(value).toLowerCase().replace(/[^a-z0-9\s-]/g, "").split(/\s+/).filter((word) => word.length > 3 && !stop.has(word)).slice(0, 4);
  }

  function buildHooks(topic, tone, platform, pick) {
    const base = shortTopic(topic);
    const capital = sentence(base);
    const number = pick(["3", "4", "5"], 2);
    const tension = pick(["Most people get this backward", "You are probably skipping the easiest part", "The common advice is making it harder", "One small mistake changes the whole result"], 3);
    const outcome = pick(["without spending more", "without overcomplicating it", "in less time than you think", "even if you are starting from scratch"], 4);
    const lead = toneData[tone].lead;
    const platformLead = platformData[platform].titleLead;

    return [
      `${lead} ${capital} is easier when you stop doing this one thing.`,
      `${tension}: ${base}.`,
      `${number} ${toneData[tone].adjective} ways to improve ${base} ${outcome}.`,
      `I tested the usual advice about ${base}. Here is what actually worked.`,
      `${platformLead} get a better result with ${base} in ${number} steps.`
    ];
  }

  function buildTitles(topic, tone, platform, pick) {
    const base = shortTopic(topic);
    const capital = sentence(base);
    const number = pick(["3", "5", "7"], 5);
    const yearless = pick(["That Actually Work", "Without the Overwhelm", "A Beginner-Friendly Guide", "The Simple Version"], 6);
    return [
      `${capital}: ${yearless}`,
      `${number} Ways to Improve ${capital}`,
      `I Tried ${capital} So You Don't Have To`,
      `${platformData[platform].titleLead} ${capital}`,
      `The ${toneData[tone].adjective} Guide to ${capital}`
    ];
  }

  function buildShots(topic, tone, length) {
    const total = Number(length);
    const beats = total <= 15 ? 4 : total <= 30 ? 5 : total <= 45 ? 6 : 7;
    const labels = ["Hook", "Show the problem", "First move", "Second move", "Proof / payoff", "Bonus detail", "Call to action"];
    const spoken = [
      `Open with the selected hook about ${shortTopic(topic)}.`,
      "Name the frustration your viewer already recognizes.",
      "Show the first useful action and explain why it matters.",
      "Add the next step with one concrete example.",
      "Reveal the visible result or summarize the transformation.",
      "Share the detail most people miss.",
      "Ask viewers to save this and try one step today."
    ];
    const visuals = [
      "Tight close-up, direct eye contact, large on-screen hook text.",
      "Show the before state or a relatable point-of-view clip.",
      "Hands-on demonstration with a concise text label.",
      "Switch angle or crop; show the next action in progress.",
      "Use a side-by-side, reaction, result, or clean reveal.",
      "Quick insert shot with a highlighted detail.",
      "Return to camera; point toward the save or follow affordance."
    ];
    const shots = [];
    let start = 0;
    for (let i = 0; i < beats; i += 1) {
      const remaining = total - start;
      const slots = beats - i;
      const segment = i === beats - 1 ? remaining : Math.max(2, Math.round(remaining / slots));
      const end = Math.min(total, start + segment);
      shots.push({
        time: `${start.toString().padStart(2, "0")}-${end.toString().padStart(2, "0")}s`,
        label: labels[i],
        spoken: spoken[i],
        visual: `${visuals[i]} ${i === 0 ? toneData[tone].delivery : ""}`.trim()
      });
      start = end;
    }
    return shots;
  }

  function buildCaption(topic, platform, pick) {
    const base = shortTopic(topic);
    const opener = pick(["A small shift can change the whole result.", "You do not need a complicated system.", "Save this for the next time you feel stuck.", "Here is the version I wish I had sooner."], 8);
    const cta = platform === "searchfeed" ? "What should I break down next?" : platform === "visualfeed" ? "Save this and send it to someone who needs the simpler version." : "Which step would you try first?";
    return `${opener}\n\nThis is a practical starting point for ${base}. Try one step, notice what changes, and build from there.\n\n${cta}`;
  }

  function buildHashtags(topic, platform) {
    const tags = keywords(topic);
    const platformTags = { fastfeed: ["creatortips", "quicktips"], visualfeed: ["visualtips", "contentcreator"], searchfeed: ["shortformtips", "howtotips"] };
    return Array.from(new Set(tags.concat(platformTags[platform], ["smallcreator"]))).slice(0, 7).map((tag) => `#${tag.replace(/-/g, "")}`);
  }

  function generate(input) {
    const normalized = {
      topic: cleanTopic(input.topic),
      tone: toneData[input.tone] ? input.tone : "conversational",
      platform: platformData[input.platform] ? input.platform : "fastfeed",
      length: [15, 30, 45, 60].includes(Number(input.length)) ? Number(input.length) : 30
    };
    const seed = hashString(`${normalized.topic}|${normalized.tone}|${normalized.platform}|${normalized.length}`);
    const pick = seededPicker(seed);
    const hooks = buildHooks(normalized.topic, normalized.tone, normalized.platform, pick);
    const titles = buildTitles(normalized.topic, normalized.tone, normalized.platform, pick);
    return {
      id: seed.toString(36),
      createdAt: new Date().toISOString(),
      input: normalized,
      hooks,
      selectedHook: 0,
      favorites: [],
      titles,
      shots: buildShots(normalized.topic, normalized.tone, normalized.length),
      caption: buildCaption(normalized.topic, normalized.platform, pick),
      hashtags: buildHashtags(normalized.topic, normalized.platform),
      checklist: platformData[normalized.platform].checklist.map((label) => ({ label, done: false })),
      rationale: `Uses ${toneData[normalized.tone].adjective} tension, a clear payoff, and ${platformData[normalized.platform].name}-appropriate pacing.`,
      why: ["Creates an immediate curiosity gap", "Signals a useful, specific payoff", "Uses language that sounds natural aloud", `Fits a ${normalized.length}-second content arc`],
      platformLens: platformData[normalized.platform].lens
    };
  }

  function toText(result) {
    const lines = [
      "SHORTS HOOK LAB CONTENT KIT",
      `Topic: ${result.input.topic}`,
      `Platform: ${platformData[result.input.platform].name}`,
      `Tone: ${result.input.tone}`,
      `Length: ${result.input.length}s`,
      "",
      "HOOKS",
      ...result.hooks.map((item, index) => `${index + 1}. ${item}`),
      "",
      "TITLES",
      ...result.titles.map((item, index) => `${index + 1}. ${item}`),
      "",
      "SHOT LIST",
      ...result.shots.map((item) => `${item.time} | ${item.label}\nSpoken: ${item.spoken}\nVisual: ${item.visual}`),
      "",
      "CAPTION",
      result.caption,
      result.hashtags.join(" "),
      "",
      "POSTING CHECKLIST",
      ...result.checklist.map((item) => `${item.done ? "[x]" : "[ ]"} ${item.label}`)
    ];
    return lines.join("\n");
  }

  root.ShortsHookGenerator = { generate, hashString, toText, platformData, toneData };
})(typeof window !== "undefined" ? window : globalThis);
