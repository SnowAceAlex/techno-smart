import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Techno Smart",
  description:
    "Techno Smart is a e commerce website for buying electronic products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        elements: {
          rootBox: "mx-auto",
          card: "shadow-lg",
          headerTitle: "text-dark_blue font-semibold",
          headerSubtitle: "text-light_gray",
          socialButtonsBlockButton:
            "border border-gray-200 hover:bg-light_bg transition-colors",
          socialButtonsBlockButtonText: "font-medium",
          formButtonPrimary:
            "bg-light_blue hover:bg-dark_blue text-white font-semibold transition-colors",
          formFieldInput:
            "border-gray-200 focus:border-light_blue focus:ring-light_blue",
          formFieldLabel: "text-dark_blue font-medium",
          footerActionLink:
            "text-light_blue hover:text-dark_blue font-semibold",
          identityPreviewText: "text-dark_blue",
          identityPreviewEditButton: "text-light_blue hover:text-dark_blue",
          formResendCodeLink: "text-light_blue hover:text-dark_blue",
          userButtonBox: "w-auto h-auto",
          userButtonTrigger: "w-auto h-auto",
          userButtonPopoverCard: "shadow-xl",
        },
        variables: {
          colorPrimary: "#5284fb",
          colorText: "#12498d",
          colorTextSecondary: "#707070",
          colorBackground: "#ffffff",
          colorInputBackground: "#ffffff",
          colorInputText: "#12498d",
          borderRadius: "0.625rem",
          fontFamily: "var(--font-poppins), sans-serif",
          fontSize: "14px",
        },
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="max-w-screen-xl mx-auto px-4">{children}</div>
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
