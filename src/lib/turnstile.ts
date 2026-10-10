const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Cloudflare Turnstile token server-side. No-ops (returns true,
 * same as "not checked") if TURNSTILE_SECRET_KEY isn't configured, so lead
 * forms keep working exactly as before until Turnstile is set up — same
 * degrade-gracefully pattern as RESEND_API_KEY in src/lib/email.ts.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;
  if (!token) return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    // Never let a network hiccup against Cloudflare block a real submission.
    return true;
  }
}
