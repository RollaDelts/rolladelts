import { loginAction } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dtd-purple px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-dtd-gold bg-dtd-purple-dark text-xl font-bold text-dtd-gold">
            ΔΤΔ
          </span>
          <h1 className="mt-3 text-xl font-bold text-dtd-purple">Admin Login</h1>
          <p className="text-sm text-foreground/60">Delta Tau Delta · Epsilon Nu Chapter</p>
        </div>

        <form action={loginAction} className="grid gap-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-dtd-purple py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
          >
            Sign In
          </button>
        </form>

        {/* Error message rendered after form submission */}
        <InvalidCredentials searchParams={searchParams} />
      </div>
    </div>
  );
}

async function InvalidCredentials({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (!params.error) return null;
  return (
    <p className="mt-4 text-center text-sm text-red-600">
      Invalid username or password.
    </p>
  );
}
