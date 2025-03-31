import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/dictionaries"
import { getCities } from "@/lib/cities"
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

type CityParams = {
  locale: string
  city: string
}

export async function generateStaticParams(): Promise<CityParams[]> {
  const cities = await getCities()
  const locales = ["pl"]

  return locales.flatMap(locale => 
    cities.map(city => ({
      locale,
      city: city.slug
    }))
  )
}

export async function generateMetadata({ params }: { params: CityParams }): Promise<Metadata> {
  const { city } = params
  const cities = await getCities()
  const cityData = cities.find(c => c.slug === city)

  if (!cityData) {
    return {
      title: "City Not Found",
    }
  }

  return {
    title: `Systemy Przeciwpożarowe w ${cityData.name} | Matbud Systemy Ppoż`,
    description: `Profesjonalne rozwiązania przeciwpożarowe ${cityData.conjugation}. Instalacja, konserwacja i certyfikacja systemów.`,
    keywords: [
      `systemy przeciwpożarowe ${cityData.name}`,
      `ochrona przeciwpożarowa ${cityData.name}`,
      `instalacje ppoż ${cityData.name}`,
    ],
  }
}

export default async function CityPage({ params }: { params: CityParams }) {
  const { locale, city } = params
  const dict = await getDictionary(locale)
  const cities = await getCities()
  const cityData = cities.find(c => c.slug === city)

  if (!cityData) {
    notFound()
  }

  // Text replacements
  const replaceCity = (text: string) => text.replace(/{city}/g, cityData.name)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16 md:py-24 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-6">
                {replaceCity(dict.cityPage.title)}
              </h1>
              <p className="text-xl mb-8">{replaceCity(dict.cityPage.intro)}</p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="#contact-form">
                  {replaceCity(dict.cityPage.ctaButton)}
                </Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/city-services.jpg"
                alt={`Usługi przeciwpożarowe w ${cityData.name}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {replaceCity(dict.cityPage.servicesTitle)}
            </h2>
            <p className="text-lg mb-8">{replaceCity(dict.cityPage.servicesDescription)}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {dict.cityPage.servicesList.map((service, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {replaceCity(dict.cityPage.whyChooseTitle)}
            </h2>
            <p className="text-lg mb-8">{replaceCity(dict.cityPage.whyChooseDescription)}</p>

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
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {replaceCity(dict.cityPage.contactTitle)}
              </h2>
              <p className="text-lg text-gray-600">{dict.cityPage.contactSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6">{dict.contact.contactInfo.title}</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{dict.contact.contactInfo.addressTitle}</h4>
                      <address className="not-italic text-gray-600">
                        {cityData.name}, ul. Bezpieczeństwa 123<br />
                        00-000 {cityData.name}
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{dict.contact.contactInfo.phoneTitle}</h4>
                      <p className="text-gray-600">
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
                      <p className="text-gray-600">
                        <a
                          href={`mailto:kontakt@matbud-ppoz.pl`}
                          className="hover:text-primary transition-colors"
                        >
                          kontakt@matbud-ppoz.pl
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
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
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder={dict.contact.form.namePlaceholder}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        {dict.contact.form.phoneLabel}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder={dict.contact.form.phonePlaceholder}
                        required
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
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder={dict.contact.form.emailPlaceholder}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {dict.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder={dict.contact.form.messagePlaceholder}
                      required
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
