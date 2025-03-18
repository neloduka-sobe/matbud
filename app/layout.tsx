import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "FireGuard Systems | Professional Fire Safety Solutions",
    template: "%s | FireGuard Systems",
  },
  description:
    "Professional fire safety systems installation, maintenance and certification services for commercial and residential buildings.",
  keywords: [
    "systemy przeciwpożarowe",
    "ochrona przeciwpożarowa",
    "instalacje ppoż",
    "zabezpieczenia przeciwpożarowe",
    "systemy sygnalizacji pożarowej",
    "systemy gaszenia pożarów",
    "projektowanie systemów ppoż",
    "konserwacja systemów ppoż",
    "audyt przeciwpożarowy",
    "czujki pożarowe",
    "systemy oddymiania",
    "hydranty przeciwpożarowe",
    "centrale sygnalizacji pożarowej",
    "systemy tryskaczowe",
    "gaśnice",
    "szkolenia ppoż",
    "przepisy przeciwpożarowe",
    "instrukcja bezpieczeństwa pożarowego",
    "normy ppoż",
    "ocena zagrożenia wybuchem",
    "matbud systemy ppoż",
    "ochrona ppoż",
    "instalacje przeciwpożarowe",
    "przeglądy ppoż",
    "bezpieczeństwo pożarowe",
  ],
  authors: [{ name: "FireGuard Systems" }],
  creator: "FireGuard Systems",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fireguardsystems.com",
    title: "FireGuard Systems | Professional Fire Safety Solutions",
    description:
      "Professional fire safety systems installation, maintenance and certification services for commercial and residential buildings.",
    siteName: "FireGuard Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "FireGuard Systems | Professional Fire Safety Solutions",
    description:
      "Professional fire safety systems installation, maintenance and certification services for commercial and residential buildings.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

