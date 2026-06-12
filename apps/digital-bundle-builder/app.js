(function () {
  "use strict";

  var STORAGE_KEY = "digitalBundleBuilderDraft";

  var defaultDraft = {
    bundleTitle: "",
    audience: "",
    deliverables: "",
    licenseType: "Personal use",
    supportText: "",
    version: "1.0.0",
    updateNotes: ""
  };

  var outputMeta = {
    manifest: {
      elementId: "manifestOutput",
      filename: "bundle-manifest.json",
      mime: "application/json"
    },
    startHere: {
      elementId: "startHereOutput",
      filename: "START-HERE.md",
      mime: "text/markdown"
    },
    storefront: {
      elementId: "storefrontOutput",
      filename: "STOREFRONT-CHECKLIST.md",
      mime: "text/markdown"
    },
    qa: {
      elementId: "qaOutput",
      filename: "QA-CHECKLIST.md",
      mime: "text/markdown"
    }
  };

  function cleanText(value) {
    return String(value || "")
      .replace(/\r\n/g, "\n")
      .replace(/\t/g, " ")
      .trim();
  }

  function createSlug(value) {
    var slug = cleanText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return slug || "digital-bundle";
  }

  function titleFromFilename(filename) {
    return cleanText(filename)
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
      });
  }

  function parseDeliverables(value) {
    return cleanText(value)
      .split("\n")
      .map(function (line) {
        return cleanText(line);
      })
      .filter(Boolean)
      .map(function (line, index) {
        var parts = line.split("|").map(cleanText);
        var filename = parts[0] || "deliverable-" + String(index + 1).padStart(2, "0");
        var type = parts[1] || "File";
        var notes = parts.slice(2).filter(Boolean).join(" | ");

        return {
          id: "item-" + String(index + 1).padStart(2, "0"),
          title: titleFromFilename(filename),
          filename: filename,
          type: type,
          notes: notes
        };
      });
  }

  function normalizeDraft(input) {
    var draft = Object.assign({}, defaultDraft, input || {});
    return {
      bundleTitle: cleanText(draft.bundleTitle),
      audience: cleanText(draft.audience),
      deliverables: cleanText(draft.deliverables),
      licenseType: cleanText(draft.licenseType) || defaultDraft.licenseType,
      supportText: cleanText(draft.supportText),
      version: cleanText(draft.version) || defaultDraft.version,
      updateNotes: cleanText(draft.updateNotes)
    };
  }

  function buildManifest(draft, deliverables, createdAt) {
    return {
      product: {
        title: draft.bundleTitle || "Untitled Digital Bundle",
        slug: createSlug(draft.bundleTitle),
        audience: draft.audience || "Not specified",
        version: draft.version,
        createdAt: createdAt
      },
      license: {
        label: draft.licenseType,
        note: "Plain-language license summary only. Review final terms with qualified counsel when needed."
      },
      support: {
        text: draft.supportText || "Support terms have not been provided yet."
      },
      deliverables: deliverables,
      updateNotes: draft.updateNotes || "No update notes provided.",
      packagingNotes: [
        "Keep this manifest inside the customer ZIP.",
        "Test the ZIP by downloading and extracting it before listing.",
        "Do not include unsupported earnings, legal, or marketplace approval claims."
      ]
    };
  }

  function bulletDeliverables(deliverables) {
    if (!deliverables.length) {
      return "- No deliverables entered yet.";
    }

    return deliverables
      .map(function (item) {
        var note = item.notes ? " - " + item.notes : "";
        return "- " + item.filename + " (" + item.type + ")" + note;
      })
      .join("\n");
  }

  function buildStartHere(draft, deliverables) {
    var title = draft.bundleTitle || "Untitled Digital Bundle";
    var audience = draft.audience || "the intended customer";
    var support = draft.supportText || "Support terms have not been provided yet.";
    var updates = draft.updateNotes || "No update notes provided.";

    return [
      "# START HERE",
      "",
      "## " + title,
      "",
      "Version: " + draft.version,
      "Audience: " + audience,
      "License: " + draft.licenseType,
      "",
      "## What is included",
      "",
      bulletDeliverables(deliverables),
      "",
      "## Suggested first steps",
      "",
      "1. Extract the ZIP file to a folder on your device.",
      "2. Read this document before editing or distributing any files.",
      "3. Open the manifest to confirm every deliverable is present.",
      "4. Review the license summary before using the materials.",
      "",
      "## Support",
      "",
      support,
      "",
      "## Update notes",
      "",
      updates,
      "",
      "## Important notes",
      "",
      "- This bundle does not promise earnings, business results, or marketplace approval.",
      "- License details are a seller-provided summary and are not legal advice.",
      "- Keep a backup copy of the original downloaded ZIP."
    ].join("\n");
  }

  function buildStorefrontChecklist(draft, deliverables) {
    var title = draft.bundleTitle || "Untitled Digital Bundle";
    var count = deliverables.length;

    return [
      "# Storefront Checklist",
      "",
      "Product: " + title,
      "Version: " + draft.version,
      "",
      "## Listing copy",
      "",
      "- Title clearly matches the contents of the ZIP.",
      "- Audience is specific: " + (draft.audience || "add the target buyer before publishing."),
      "- Description explains what the buyer receives without earnings promises.",
      "- License type is visible: " + draft.licenseType + ".",
      "- Support terms are visible and match the support document.",
      "- Update notes are current for version " + draft.version + ".",
      "",
      "## Download contents",
      "",
      "- ZIP contains " + count + " listed deliverable" + (count === 1 ? "" : "s") + ".",
      "- Manifest file is included at the top level of the ZIP.",
      "- START-HERE.md is included at the top level of the ZIP.",
      "- File names are readable and do not expose private working notes.",
      "- Preview images or samples, if used, are seller-owned or properly licensed.",
      "",
      "## Marketplace readiness",
      "",
      "- Category, tags, and file type fields are filled in accurately.",
      "- Refund, support, and update policies are consistent with the storefront.",
      "- No legal advice, income claims, or approval guarantees appear in the listing.",
      "- Final ZIP has been tested from a customer-style download flow."
    ].join("\n");
  }

  function buildQaChecklist(draft, deliverables) {
    return [
      "# QA Checklist",
      "",
      "Product: " + (draft.bundleTitle || "Untitled Digital Bundle"),
      "Version: " + draft.version,
      "",
      "## Files",
      "",
      deliverables.length
        ? deliverables
            .map(function (item) {
              return "- [ ] Confirm " + item.filename + " opens correctly.";
            })
            .join("\n")
        : "- [ ] Add and confirm at least one deliverable.",
      "",
      "## Package test",
      "",
      "- [ ] Create the final customer ZIP.",
      "- [ ] Extract the final ZIP into a clean folder.",
      "- [ ] Confirm the manifest, START-HERE, storefront checklist, and QA checklist are included.",
      "- [ ] Confirm filenames match the storefront listing.",
      "- [ ] Confirm license and support language match the product page.",
      "- [ ] Confirm no draft files, private notes, or source-only files are included.",
      "",
      "## Copy review",
      "",
      "- [ ] Remove earnings promises, legal advice, and approval promises.",
      "- [ ] Check version number and update notes.",
      "- [ ] Check spelling and customer-facing tone.",
      "- [ ] Archive a seller backup copy before uploading anywhere manually."
    ].join("\n");
  }

  function buildOutputs(input, options) {
    var draft = normalizeDraft(input);
    var deliverables = parseDeliverables(draft.deliverables);
    var createdAt = options && options.createdAt ? options.createdAt : new Date().toISOString();
    var manifestObject = buildManifest(draft, deliverables, createdAt);

    return {
      draft: draft,
      manifestObject: manifestObject,
      manifest: JSON.stringify(manifestObject, null, 2),
      startHere: buildStartHere(draft, deliverables),
      storefront: buildStorefrontChecklist(draft, deliverables),
      qa: buildQaChecklist(draft, deliverables)
    };
  }

  function readForm(form) {
    var data = new FormData(form);
    return normalizeDraft({
      bundleTitle: data.get("bundleTitle"),
      audience: data.get("audience"),
      deliverables: data.get("deliverables"),
      licenseType: data.get("licenseType"),
      supportText: data.get("supportText"),
      version: data.get("version"),
      updateNotes: data.get("updateNotes")
    });
  }

  function writeForm(form, draft) {
    var normalized = normalizeDraft(draft);
    Object.keys(normalized).forEach(function (key) {
      if (form.elements[key]) {
        form.elements[key].value = normalized[key];
      }
    });
  }

  function setStatus(message, tone) {
    var node = document.getElementById("saveStatus");
    if (!node) {
      return;
    }

    node.textContent = message;
    if (tone) {
      node.dataset.tone = tone;
    } else {
      delete node.dataset.tone;
    }
  }

  function saveDraft(draft) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeDraft(draft)));
      setStatus("Draft saved", "ok");
    } catch (error) {
      setStatus("Draft not saved", "warn");
    }
  }

  function loadDraft() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? normalizeDraft(JSON.parse(raw)) : Object.assign({}, defaultDraft);
    } catch (error) {
      return Object.assign({}, defaultDraft);
    }
  }

  function downloadText(filename, text, mime) {
    var blob = new Blob([text], { type: mime || "text/plain" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function getCurrentOutputs(form) {
    return buildOutputs(readForm(form));
  }

  function renderOutputs(outputs) {
    Object.keys(outputMeta).forEach(function (key) {
      var node = document.getElementById(outputMeta[key].elementId);
      if (node) {
        node.textContent = outputs[key];
      }
    });
  }

  function combinedExport(outputs) {
    return [
      "DIGITAL BUNDLE BUILDER EXPORT",
      "",
      "===== bundle-manifest.json =====",
      outputs.manifest,
      "",
      "===== START-HERE.md =====",
      outputs.startHere,
      "",
      "===== STOREFRONT-CHECKLIST.md =====",
      outputs.storefront,
      "",
      "===== QA-CHECKLIST.md =====",
      outputs.qa,
      ""
    ].join("\n");
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    var ok = document.execCommand("copy");
    textarea.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error("Copy failed"));
  }

  function initApp() {
    var form = document.getElementById("bundleForm");
    if (!form) {
      return;
    }

    writeForm(form, loadDraft());
    renderOutputs(buildOutputs(readForm(form)));

    form.addEventListener("input", function () {
      var draft = readForm(form);
      saveDraft(draft);
      renderOutputs(buildOutputs(draft));
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var draft = readForm(form);
      saveDraft(draft);
      renderOutputs(buildOutputs(draft));
      setStatus("Generated", "ok");
    });

    document.getElementById("resetDraft").addEventListener("click", function () {
      if (!window.confirm("Reset the saved draft?")) {
        return;
      }

      window.localStorage.removeItem(STORAGE_KEY);
      writeForm(form, defaultDraft);
      renderOutputs(buildOutputs(defaultDraft));
      setStatus("Draft reset", "warn");
    });

    document.getElementById("copyAll").addEventListener("click", function () {
      var outputs = getCurrentOutputs(form);
      copyText(combinedExport(outputs))
        .then(function () {
          setStatus("Copied all", "ok");
        })
        .catch(function () {
          setStatus("Copy failed", "warn");
        });
    });

    document.getElementById("downloadAll").addEventListener("click", function () {
      var outputs = getCurrentOutputs(form);
      var slug = createSlug(outputs.draft.bundleTitle);
      downloadText(slug + "-bundle-docs.txt", combinedExport(outputs), "text/plain");
      setStatus("Downloaded all", "ok");
    });

    document.getElementById("exportDraft").addEventListener("click", function () {
      var draft = readForm(form);
      downloadText(createSlug(draft.bundleTitle) + "-draft.json", JSON.stringify(draft, null, 2), "application/json");
      setStatus("Draft exported", "ok");
    });

    document.getElementById("importDraft").addEventListener("click", function () {
      document.getElementById("draftFile").click();
    });

    document.getElementById("draftFile").addEventListener("change", function (event) {
      var file = event.target.files && event.target.files[0];
      if (!file) {
        return;
      }

      var reader = new FileReader();
      reader.onload = function () {
        try {
          var imported = normalizeDraft(JSON.parse(String(reader.result || "{}")));
          writeForm(form, imported);
          saveDraft(imported);
          renderOutputs(buildOutputs(imported));
          setStatus("Draft imported", "ok");
        } catch (error) {
          setStatus("Import failed", "warn");
        }
        event.target.value = "";
      };
      reader.readAsText(file);
    });

    document.addEventListener("click", function (event) {
      var copyKey = event.target.getAttribute("data-copy");
      var downloadKey = event.target.getAttribute("data-download");
      var outputs = getCurrentOutputs(form);

      if (copyKey && outputs[copyKey]) {
        copyText(outputs[copyKey])
          .then(function () {
            setStatus("Copied " + outputMeta[copyKey].filename, "ok");
          })
          .catch(function () {
            setStatus("Copy failed", "warn");
          });
      }

      if (downloadKey && outputs[downloadKey]) {
        downloadText(outputMeta[downloadKey].filename, outputs[downloadKey], outputMeta[downloadKey].mime);
        setStatus("Downloaded " + outputMeta[downloadKey].filename, "ok");
      }
    });
  }

  window.DigitalBundleBuilder = {
    STORAGE_KEY: STORAGE_KEY,
    cleanText: cleanText,
    createSlug: createSlug,
    parseDeliverables: parseDeliverables,
    normalizeDraft: normalizeDraft,
    buildOutputs: buildOutputs,
    combinedExport: combinedExport
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
