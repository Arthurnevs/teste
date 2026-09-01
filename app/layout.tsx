import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://para-voce-angeliny.arthurnbnb.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Para Angeliny, com amor",
  description: "Uma declaração feita de memórias, carinho e muito amor.",
  openGraph: {
    title: "Para você, Angeliny.",
    description: "Uma surpresa em forma de amor.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1680, height: 907, alt: "Para você, Angeliny" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Para você, Angeliny.",
    description: "Uma surpresa em forma de amor.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
