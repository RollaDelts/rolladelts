/**
 * Anti-spam honeypot field for lead-capture forms, paired with the check
 * in submitLeadAction. Invisible to real users; bots that blindly fill
 * every input on a form trip it.
 *
 * Uses `display: none` (not position/opacity tricks) and a field name
 * with no resemblance to any common autofill category — browsers won't
 * autofill a field they can't render, but they will happily fill an
 * off-screen-but-rendered field with heuristic-matching name like
 * "company" (that's what broke this the first time: Chrome's own
 * autofill was filling it, tripping the check on real submissions).
 */
export default function BotTrap() {
  return (
    <div aria-hidden="true" style={{ display: "none" }}>
      <label htmlFor="hp_confirm_9f2">Leave this field blank</label>
      <input type="text" id="hp_confirm_9f2" name="hp_confirm_9f2" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
