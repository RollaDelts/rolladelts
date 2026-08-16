/**
 * Anti-spam honeypot field for lead-capture forms, paired with the check
 * in submitLeadAction. Invisible to real users; bots that autofill every
 * input on a form trip it.
 */
export default function BotTrap() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
    >
      <label htmlFor="company">Company</label>
      <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
