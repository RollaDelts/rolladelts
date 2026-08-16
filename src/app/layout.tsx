import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createAuthClient, authAvailable } from "@/lib/supabase-server";
import { getServerClient } from "@/lib/supabase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Epsilon Nu | Delta Tau Delta at Missouri S&T",
  description:
    "The Epsilon Nu chapter of Delta Tau Delta at Missouri University of Science & Technology. Join a brotherhood built on Truth, Courage, Faith, and Power.",
};

async function getUserDisplay() {
  if (!authAvailable()) return null;
  try {
    const supabase = await createAuthClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await getServerClient()
      .from("profiles")
      .select("first_name, role")
      .eq("id", user.id)
      .single();

    if (!profile) return null;
    return {
      name: profile.first_name as string,
      role: profile.role as string,
    };
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userDisplay = await getUserDisplay();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header userDisplay={userDisplay} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
