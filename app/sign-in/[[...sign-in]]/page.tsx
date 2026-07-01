import { SignIn } from "@clerk/nextjs";
import Logo from "@/components/Logo";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="md" blend />
        </div>
        <SignIn
          forceRedirectUrl="/auth/callback"
          appearance={{
            ...clerkAppearance,
            elements: {
              rootBox: "mx-auto w-full",
              card: "bg-surface border border-border shadow-sm rounded-sm",
              headerTitle: "font-logo text-foreground",
              headerSubtitle: "text-muted",
              formButtonPrimary: "bg-accent hover:bg-accent-hover text-white rounded-sm",
              formFieldInput: "bg-background border-border text-foreground rounded-sm",
              footerActionLink: "text-accent hover:text-accent-hover",
            },
          }}
        />
        <p className="mt-6 text-center">
          <a href="/" className="text-sm text-muted hover:text-foreground">
            ← Back to website
          </a>
        </p>
      </div>
    </main>
  );
}
