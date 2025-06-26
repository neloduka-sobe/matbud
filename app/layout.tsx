import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Matbud Systemy Ppoż. Sp. z o.o. | Systemy Przeciwpożarowe",
    template: "%s | Matbud Systemy Ppoż. Sp. z o.o.",
  },
  description:
    "Profesjonalne usługi instalacji, konserwacji i certyfikacji systemów bezpieczeństwa pożarowego dla budynków komercyjnych i mieszkalnych.",
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
  authors: [{ name: "Matbud Systemy Ppoż. sp. z o.o." }],
  creator: "Matbud Systemy Ppoż. sp. z o.o.",
  openGraph: {
    type: "website",
    locale: "pl",
    url: "https://matbud.net",
    title: "Matbud Systemy Ppoż. sp. z o.o. | Systemy Przeciwpożarowe",
    description:
      "Profesjonalne usługi instalacji, konserwacji i certyfikacji systemów bezpieczeństwa pożarowego dla budynków komercyjnych i mieszkalnych.",
    siteName: "Matbud Systemy Ppoż. sp. z o.o.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

