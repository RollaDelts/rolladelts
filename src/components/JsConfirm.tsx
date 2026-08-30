"use client";

import { useEffect, useRef } from "react";

/**
 * Second anti-spam layer, paired with BotTrap and the check in
 * submitLeadAction. Where BotTrap catches bots that render the form and
 * blindly fill every field, this catches the opposite and more common
 * case seen in practice: bots that skip rendering entirely and POST
 * straight to the server action with only the fields they can see in the
 * page source. Real browsers run this effect and stamp the field with the
 * current time before any submit is possible; a raw HTTP POST never does.
 *
 * Deliberately just a presence/plausibility check, not a minimum-elapsed-
 * time threshold — a prior fill-time check was removed because it dropped
 * genuine fast/autofilled submissions with no visible error. Silent data
 * loss from a real visitor is worse than the marginal spam a stricter
 * check would catch.
 */
export default function JsConfirm() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.value = String(Date.now());
  }, []);

  return <input ref={ref} type="hidden" name="js_ts" defaultValue="" />;
}
