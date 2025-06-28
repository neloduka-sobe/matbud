import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { getCities } from "@/lib/cities";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact-form";

// Type definition for the specific route parameters
type CityParams = {
  locale: string;
  city: string;
};

// Interface for page props
interface PageProps {
  params: Promise<{ locale: string; city: string }>;
}

// Generates static paths for all city pages during the build
export async function generateStaticParams(): Promise<CityParams[]> {
  const cities = await getCities();
  const locales = ["pl"];

  // Create paths for each locale and city combination
  return locales.flatMap(locale =>
    cities.map(city => ({
      locale,
      city: city.slug
    }))
  );
}

// Generates metadata (like title, description) for each city page
// Uses the PageProps interface to satisfy Next.js type constraints
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cities = await getCities();
  const { city } = await params;

  // Find the specific city data based on the slug from params
  const cityData = cities.find(c => c.slug === city);

  // Handle case where city data is not found
  if (!cityData) {
    return {
      title: "City Not Found",
    };
  }

  // Return dynamic metadata based on the city data
  return {
    title: `Systemy Przeciwpożarowe w ${cityData.name} | Matbud Systemy Ppoż`,
    description: `Profesjonalne rozwiązania przeciwpożarowe ${cityData.conjugation}. Instalacja, konserwacja i certyfikacja systemów.`, // Using conjugation field
    keywords: [
      `systemy przeciwpożarowe ${cityData.name}`,
      `ochrona przeciwpożarowa ${cityData.name}`,
      `instalacje ppoż ${cityData.name}`,
    ],
  };
}

// The main page component - this is an async Server Component
// Uses the PageProps interface to satisfy Next.js type constraints
export default async function CityPage({ params }: PageProps) {
  const { locale, city } = await params;

  // Fetch dictionary and city data concurrently
  const [dict, cities] = await Promise.all([
    getDictionary(locale),
    getCities()
  ]);

  // Find the specific city data using the slug
  const cityData = cities.find(c => c.slug === city);

  // If no city data is found for the given slug, render the 404 page
  if (!cityData) {
    notFound();
  }

  // Helper function to replace {city} placeholder in dictionary strings
  const replaceCity = (text: string | undefined): string => {
    // Handle potential undefined text gracefully
    if (text === undefined) return "";
    return text.replace(/{city}/g, cityData.conjugation);
  };

  // Helper function to trim text to a certain number of words
  function trimWords(text: string | undefined, maxWords: number): string {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-primary dark:from-black/70 dark:via-black/50 dark:to-black/30 py-16 md:py-24 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-6">
                {trimWords(replaceCity(dict.cityPage?.title), 7)}
              </h1>
              <p className="text-xl mb-8">{trimWords(replaceCity(dict.cityPage?.intro), 20)}</p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="#contact-form">
                  {replaceCity(dict.cityPage?.ctaButton)}
                </Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder-city-services.jpg"
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
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">
              {replaceCity(dict.cityPage?.servicesTitle)}
            </h2>
            <p className="text-lg mb-10 text-muted-foreground">{replaceCity(dict.cityPage?.servicesDescription)}</p>

            {/* Check if servicesList exists before mapping */}
            {dict.cityPage?.servicesList && (
               <div className="grid md:grid-cols-2 gap-6 mb-12">
                {dict.cityPage.servicesList.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow duration-200">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-3xl font-bold mb-6">
                {replaceCity(dict.cityPage?.whyChooseTitle)}
             </h2>
             <p className="text-lg mb-12 text-muted-foreground">{replaceCity(dict.cityPage?.whyChooseDescription)}</p>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                {/* Stat 1: Experience */}
                <div className="bg-card p-6 rounded-lg shadow-sm text-center border">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                    {/* Dynamically use value from dictionary if available */}
                    <span className="text-primary text-2xl font-bold">{dict.aboutUs?.stats?.[0]?.value ?? '25+'}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{dict.aboutUs?.stats?.[0]?.label ?? 'Lat Doświadczenia'}</h3>
                </div>

                {/* Stat 2: Certified Techs */}
                <div className="bg-card p-6 rounded-lg shadow-sm text-center border">
                   <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                     <span className="text-primary text-2xl font-bold">100%</span>
                   </div>
                   <h3 className="font-semibold mb-1">{dict.cityPage?.certifiedTechs ?? 'Certyfikowani Technicy'}</h3>
                 </div>

                {/* Stat 3: Support */}
                <div className="bg-card p-6 rounded-lg shadow-sm text-center border">
                   <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                      <span className="text-primary text-2xl font-bold">24/7</span>
                   </div>
                   <h3 className="font-semibold mb-1">{dict.cityPage?.support ?? 'Wsparcie Techniczne'}</h3>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {replaceCity(dict.cityPage?.contactTitle)}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{dict.cityPage?.contactSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Info Side */}
              <div className="bg-card p-6 md:p-8 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-6">{dict.contact?.contactInfo?.title ?? 'Informacje Kontaktowe'}</h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{dict.contact?.contactInfo?.addressTitle ?? 'Adres Biura'}</h4>
                      <address className="not-italic text-muted-foreground">
                        Słocin 36F<br />
                        62-065 Grodzisk Wielkopolski
                      </address>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                       <h4 className="font-medium">{dict.contact?.contactInfo?.phoneTitle ?? 'Telefon'}</h4>
                       <p className="text-muted-foreground">
                         <a href="tel:+48614481028" className="hover:text-primary transition-colors duration-200">
                           +48 61 448 10 28
                         </a>
                       </p>
                     </div>
                   </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{dict.contact?.contactInfo?.emailTitle ?? 'Email'}</h4>
                      <p className="text-muted-foreground">
                        <a
                          href="mailto:matbud@m-so.pl"
                          className="hover:text-primary transition-colors duration-200"
                        >
                          matbud@m-so.pl
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Side */}
              <ContactForm 
                dictionary={dict.contact?.form || {
                  title: dict.cityPage?.formTitle || 'Wyślij nam wiadomość',
                  nameLabel: 'Imię i Nazwisko',
                  namePlaceholder: 'Jan Kowalski',
                  emailLabel: 'Adres Email',
                  emailPlaceholder: 'jan.kowalski@example.com',
                  phoneLabel: 'Numer Telefonu',
                  phonePlaceholder: '+48 123 456 789',
                  messageLabel: 'Twoja Wiadomość',
                  messagePlaceholder: 'Opisz czego potrzebujesz...',
                  submit: 'Wyślij Zapytanie',
                  submitting: 'Wysyłanie...',
                  successTitle: 'Wiadomość wysłana',
                  successMessage: 'Dziękujemy za skontaktowanie się z nami. Odpowiemy wkrótce.',
                  validation: {
                    nameMin: 'Imię musi mieć co najmniej 2 znaki.',
                    emailInvalid: 'Proszę podać prawidłowy adres e-mail.',
                    phoneMin: 'Proszę podać prawidłowy numer telefonu.',
                    messageMin: 'Wiadomość musi mieć co najmniej 10 znaków.'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
