const form = document.querySelector("#invoiceForm");
const result = document.querySelector("#result");
const badge = document.querySelector("#statusBadge");
const copyAll = document.querySelector("#copyAll");
const reset = document.querySelector("#reset");

const templates = {
  warm: {
    subject: "Quick invoice follow-up",
    opener: "I hope your week is going smoothly. I am checking in on {invoice} for {amount}, which is now {days} days overdue.",
    ask: "Could you confirm the expected payment date when you have a moment?",
    close: "Thanks again. I appreciate the update and am happy to resend the invoice if that helps."
  },
  firm: {
    subject: "Payment status needed for {invoice}",
    opener: "I am following up on {invoice} for {amount}. It is currently {days} days overdue.",
    ask: "Please reply with the payment date or let me know if your team needs anything from me to process it.",
    close: "Thank you for taking care of this promptly."
  },
  final: {
    subject: "Final reminder before next steps: {invoice}",
    opener: "I am sending a final reminder about {invoice} for {amount}, which is now {days} days overdue.",
    ask: "Please reply today with the payment date or the specific reason payment is delayed.",
    close: "If I do not hear back, I will pause any remaining work and review the next steps available under our agreement."
  }
};

const nextStepCopy = {
  pay: "Ask for a clear payment date and keep the message short.",
  confirm: "Ask them to confirm receipt first, then resend the invoice if needed.",
  plan: "Offer a brief payment-plan conversation without changing terms until you approve them in writing."
};

function money(value) {
  const number = Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(number) || number <= 0) return "$0";
  return number.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function clean(value, fallback) {
  const text = String(value || "").trim();
  return text || fallback;
}

function fill(template, data) {
  return template
    .replaceAll("{client}", data.clientName)
    .replaceAll("{invoice}", data.invoiceNumber)
    .replaceAll("{amount}", data.amountDue)
    .replaceAll("{days}", data.daysOverdue);
}

function buildKit(data) {
  const tone = templates[data.tone] || templates.warm;
  const email = [
    `Subject: ${fill(tone.subject, data)}`,
    "",
    `Hi ${data.clientName},`,
    "",
    fill(tone.opener, data),
    data.context ? `Context: ${data.context}` : "",
    fill(tone.ask, data),
    "",
    fill(tone.close, data),
    "",
    "Best,"
  ].filter(Boolean).join("\n");

  const sms = `${data.clientName}, quick follow-up on ${data.invoiceNumber} for ${data.amountDue}. It is ${data.daysOverdue} days overdue. Could you send the expected payment date?`;
  const call = `Call opener: I am checking on ${data.invoiceNumber}. Is there anything blocking payment, and what date should I expect it?`;
  const checklist = [
    "Confirm the invoice was sent to the correct billing contact.",
    "Attach or link the original invoice.",
    nextStepCopy[data.nextStep],
    "Log the reply date and promised payment date.",
    "Do not add fees, deadlines, or escalation language unless your agreement and local rules support it."
  ];

  return { email, sms, call, checklist };
}

function render(data) {
  const kit = buildKit(data);
  badge.textContent = `${data.daysOverdue} days overdue`;
  result.innerHTML = `
    <article><h3>Email reminder</h3><p>${kit.email.replace(/\n/g, "<br>")}</p></article>
    <article><h3>Short SMS note</h3><p>${kit.sms}</p></article>
    <article><h3>Call script</h3><p>${kit.call}</p></article>
    <article><h3>Follow-up checklist</h3><ul>${kit.checklist.map(item => `<li>${item}</li>`).join("")}</ul></article>
  `;
  result.dataset.copy = [
    "Invoice Follow-Up Kit",
    "",
    "EMAIL",
    kit.email,
    "",
    "SMS",
    kit.sms,
    "",
    "CALL SCRIPT",
    kit.call,
    "",
    "CHECKLIST",
    kit.checklist.map(item => `- ${item}`).join("\n")
  ].join("\n");
}

function getData() {
  const data = Object.fromEntries(new FormData(form).entries());
  return {
    clientName: clean(data.clientName, "Client"),
    invoiceNumber: clean(data.invoiceNumber, "the invoice"),
    amountDue: money(data.amountDue),
    daysOverdue: clean(data.daysOverdue, "0"),
    tone: data.tone,
    nextStep: data.nextStep,
    context: clean(data.context, "")
  };
}

form.addEventListener("submit", event => {
  event.preventDefault();
  render(getData());
});

copyAll.addEventListener("click", async () => {
  const text = result.dataset.copy || "";
  if (!text) return;
  await navigator.clipboard.writeText(text);
  badge.textContent = "Copied";
});

reset.addEventListener("click", () => {
  form.reset();
  render(getData());
});

render(getData());
