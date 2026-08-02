/**
 * Anti-spam fields for lead-capture forms, paired with the checks in
 * submitLeadAction. Two layers, both invisible to real users:
 *  - Honeypot: a field real visitors never see or fill in; bots that
 *    autofill every input trip it.
 *  - Timestamp: records when the form rendered; submissions that come
 *    back faster than a human could plausibly fill the form are dropped.
 */
export default function BotTrap() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
      >
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="renderedAt" value={Date.now()} />
    </>
  );
}
