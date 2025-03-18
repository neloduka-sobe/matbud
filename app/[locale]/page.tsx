import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import Hero from "@/components/hero"
import Services from "@/components/services"
import AboutUs from "@/components/about-us"
import Certificates from "@/components/certificates"
import Clients from "@/components/clients"
import Gallery from "@/components/gallery"
import LatestBlogs from "@/components/latest-blogs"
import Contact from "@/components/contact"

export const metadata: Metadata = {
  title: "FireGuard Systems | Professional Fire Safety Solutions",
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
}

export default async function Home({
  params,
}: {
  params: { locale: string }
}) {
  // Await the params object before accessing its properties
  const resolvedParams = await Promise.resolve(params)
  const locale = resolvedParams.locale
  
  const dict = await getDictionary(locale)
  
  return (
    <>
      <Hero dictionary={dict.hero} />
      <Services dictionary={dict.services} />
      <AboutUs dictionary={dict.aboutUs} />
      <Gallery dictionary={dict.gallery} />
      <Certificates dictionary={dict.certificates} />
      <Clients dictionary={dict.clients} />
      <Contact dictionary={dict.contact} />
      <LatestBlogs locale={locale} dictionary={dict.latestBlogs} />
    </>
  )
}