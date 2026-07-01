import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Lora } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { clerkAppearance } from "@/lib/clerk-appearance";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venuvyy Events | Event Planners — Celebrations Worldwide",
  description:
    "Premium event planning for weddings, surprises, and celebrations — thoughtful design, warm hospitality, and flawless execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/auth/callback"
      signUpFallbackRedirectUrl="/auth/callback"
      appearance={clerkAppearance}
    >
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable} ${lora.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
