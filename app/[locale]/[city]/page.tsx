import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/dictionaries"
import { getCities } from "@/lib/cities"
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CityPageProps {
  params: {
    locale: string
    city: string
  }
}

export async function generateMetadata(props: CityPageProps): Promise<Metadata> {
  // Await the entire params object first
  const params = await props.params
  const locale = params.locale
  const city = params.city
  
  const cities = await getCities(locale)
  const cityData = cities.find((c) => c.slug === city)

  if (!cityData) {
    return {
      title: "City Not Found",
    }
  }

  return {
    title: `Systemy Przeciwpożarowe w ${cityData.name} | FireGuard Systems`,
    description: `Profesjonalne rozwiązania przeciwpożarowe w ${cityData.name}. Instalacja, konserwacja i certyfikacja systemów alarmowych, tryskaczy i gaśnic.`,
    keywords: [
      `systemy przeciwpożarowe ${cityData.name}`,
      `ochrona przeciwpożarowa ${cityData.name}`,
      `instalacje ppoż ${cityData.name}`,
      `zabezpieczenia przeciwpożarowe ${cityData.name}`,
      `przeglądy ppoż ${cityData.name}`,
      `projektowanie systemów ppoż ${cityData.name}`,
    ],
  }
}

export async function generateStaticParams(props: {
  params: { locale: string }
}) {
  // Await the entire params object first
  const params = await props.params
  const locale = params.locale
  
  const cities = await getCities(locale)

  return cities.map((city) => ({
    city: city.slug,
  }))
}

export default async function CityPage(props: CityPageProps) {
  // Await the entire params object first
  const params = await props.params
  const locale = params.locale
  const city = params.city
  
  const dict = await getDictionary(locale)
  const cities = await getCities(locale)
  const cityData = cities.find((c) => c.slug === city)

  if (!cityData) {
    notFound()
  }

  // Replace {city} placeholders with actual city name
  const title = dict.cityPage.title.replace(/{city}/g, cityData.name)
  const intro = dict.cityPage.intro.replace(/{city}/g, cityData.name)
  const servicesDescription = dict.cityPage.servicesDescription.replace(/{city}/g, cityData.name)
  const whyChooseDescription = dict.cityPage.whyChooseDescription.replace(/{city}/g, cityData.name)
  const ctaButton = dict.cityPage.ctaButton.replace(/{city}/g, cityData.name)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16 md:py-24 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-6">{title}</h1>
              <p className="text-xl mb-8">{intro}</p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="#contact-form">{ctaButton}</Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/city-services.jpg"
                alt={`Fire Safety Services in ${cityData.name}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray">
              {dict.cityPage.servicesTitle.replace(/{city}/g, cityData.name)}
            </h2>
            <p className="text-lg mb-8">{servicesDescription}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {dict.cityPage.servicesList.map((service: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-muted bg-card">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray">
              {dict.cityPage.whyChooseTitle.replace(/{city}/g, cityData.name)}
            </h2>
            <p className="text-lg mb-8">{whyChooseDescription}</p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">25+</span>
                </div>
                <h3 className="font-semibold mb-2">{dict.aboutUs.stats[0].label}</h3>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">100%</span>
                </div>
                <h3 className="font-semibold mb-2">{dict.cityPage.certifiedTechs}</h3>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">24/7</span>
                </div>
                <h3 className="font-semibold mb-2">{dict.cityPage.support}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray">
                {dict.cityPage.contactTitle.replace(/{city}/g, cityData.name)}
              </h2>
              <p className="text-lg text-muted-foreground">{dict.cityPage.contactSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6">{dict.contact.contactInfo.title}</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{dict.contact.contactInfo.addressTitle}</h4>
                      <address className="not-italic text-muted-foreground">
                        {cityData.name}, ul. Bezpieczeństwa 123
                        <br />
                        00-000 {cityData.name}
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{dict.contact.contactInfo.phoneTitle}</h4>
                      <p className="text-muted-foreground">
                        <a href="tel:+48123456789" className="hover:text-primary transition-colors">
                          +48 123 456 789
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{dict.contact.contactInfo.emailTitle}</h4>
                      <p className="text-muted-foreground">
                        <a
                          href={`mailto:${cityData.slug}@fireguardsystems.com`}
                          className="hover:text-primary transition-colors"
                        >
                          {cityData.slug}@fireguardsystems.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6">{dict.cityPage.formTitle}</h3>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {dict.contact.form.nameLabel}
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-2 border border-input rounded-md"
                        placeholder={dict.contact.form.namePlaceholder}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        {dict.contact.form.phoneLabel}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full p-2 border border-input rounded-md"
                        placeholder={dict.contact.form.phonePlaceholder}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {dict.contact.form.emailLabel}
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-2 border border-input rounded-md"
                      placeholder={dict.contact.form.emailPlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {dict.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-2 border border-input rounded-md"
                      placeholder={dict.contact.form.messagePlaceholder}
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                    {dict.contact.form.submit}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}