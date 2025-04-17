import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries"; // Assuming this path is correct
import { getCities } from "@/lib/cities";         // Assuming this path is correct
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";   // Assuming this path is correct

// Type definition for the specific route parameters
type CityParams = {
  locale: string;
  city: string;
};

// Define the standard props structure Next.js often expects for pages
// This interface is used to fix the build error related to type constraints


// Generates static paths for all city pages during the build
export async function generateStaticParams(): Promise<CityParams[]> {
  const cities = await getCities();
  const locales = ["pl"]; // Define supported locales

  // Create paths for each locale and city combination
  return locales.flatMap(locale =>
    cities.map(city => ({
      locale,
      city: city.slug // Use the city slug for the URL parameter
    }))
  );
}

// Generates metadata (like title, description) for each city page
// Uses the PageProps interface to satisfy Next.js type constraints
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // --- FIX 1: Perform an await *before* accessing params ---
  const cities = await getCities();
  // Now it's safe to access params synchronously
  const { city } = await params;
  // --- End of Fix 1 ---

  // Find the specific city data based on the slug from params
  const cityData = cities.find(c => c.slug === city);

  // Handle case where city data is not found
  if (!cityData) {
    return {
      title: "City Not Found", // Fallback title
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
  const { locale, city } = await params; // Destructure locale and city slug from params

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
    // Use the city's proper name for display
    return text.replace(/{city}/g, cityData.name);
  };


  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16 md:py-24 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-6">
                {/* Use replaceCity helper for dynamic text */}
                {replaceCity(dict.cityPage?.title)}
              </h1>
              <p className="text-xl mb-8">{replaceCity(dict.cityPage?.intro)}</p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="#contact-form">
                  {replaceCity(dict.cityPage?.ctaButton)}
                </Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder-city-services.jpg" // Use a relevant placeholder or dynamic image
                alt={`Usługi przeciwpożarowe w ${cityData.name}`}
                fill
                className="object-cover"
                priority // Load hero image faster
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {replaceCity(dict.cityPage?.servicesTitle)}
            </h2>
            <p className="text-lg mb-10 text-gray-600">{replaceCity(dict.cityPage?.servicesDescription)}</p>

            {/* Check if servicesList exists before mapping */}
            {dict.cityPage?.servicesList && (
               <div className="grid md:grid-cols-2 gap-6 mb-12">
                {dict.cityPage.servicesList.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {replaceCity(dict.cityPage?.whyChooseTitle)}
             </h2>
             <p className="text-lg mb-12 text-gray-600">{replaceCity(dict.cityPage?.whyChooseDescription)}</p>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                {/* Stat 1: Experience */}
                <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                    {/* Dynamically use value from dictionary if available */}
                    <span className="text-primary text-2xl font-bold">{dict.aboutUs?.stats?.[0]?.value ?? '25+'}</span>
                  </div>
                  <h3 className="font-semibold mb-1 text-gray-700">{dict.aboutUs?.stats?.[0]?.label ?? 'Lat Doświadczenia'}</h3>
                </div>

                {/* Stat 2: Certified Techs */}
                <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                   <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                     <span className="text-primary text-2xl font-bold">100%</span>
                   </div>
                   <h3 className="font-semibold mb-1 text-gray-700">{dict.cityPage?.certifiedTechs ?? 'Certyfikowani Technicy'}</h3>
                 </div>

                {/* Stat 3: Support */}
                <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                   <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                      <span className="text-primary text-2xl font-bold">24/7</span>
                   </div>
                   <h3 className="font-semibold mb-1 text-gray-700">{dict.cityPage?.support ?? 'Wsparcie Techniczne'}</h3>
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
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {replaceCity(dict.cityPage?.contactTitle)}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{dict.cityPage?.contactSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Info Side */}
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">{dict.contact?.contactInfo?.title ?? 'Informacje Kontaktowe'}</h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-700">{dict.contact?.contactInfo?.addressTitle ?? 'Adres Biura'}</h4>
                      {/* Use a placeholder address structure - replace with real data if available */}
                      <address className="not-italic text-gray-600">
                        ul. Przykładowa 123<br />
                        {cityData?.zipCode ?? '00-000'} {cityData.name} {/* Assuming zipCode exists */}
                      </address>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                       <h4 className="font-medium text-gray-700">{dict.contact?.contactInfo?.phoneTitle ?? 'Telefon'}</h4>
                       <p className="text-gray-600">
                         {/* Replace with actual phone number */}
                         <a href="tel:+48123456789" className="hover:text-primary transition-colors duration-200">
                           +48 123 456 789
                         </a>
                       </p>
                     </div>
                   </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-700">{dict.contact?.contactInfo?.emailTitle ?? 'Email'}</h4>
                      <p className="text-gray-600">
                        {/* Replace with actual email address */}
                        <a
                          href={`mailto:kontakt@matbud-ppoz.pl`} // Consider city-specific email if applicable
                          className="hover:text-primary transition-colors duration-200"
                        >
                          kontakt@matbud-ppoz.pl
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Side */}
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">{dict.cityPage?.formTitle ?? 'Zapytaj o Ofertę'}</h3>

                {/* Replace with an actual form component (e.g., using react-hook-form) */}
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        {dict.contact?.form?.nameLabel ?? 'Imię i Nazwisko'}
                      </label>
                      <input
                        id="name"
                        name="name" // Add name attribute for form submission
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200"
                        placeholder={dict.contact?.form?.namePlaceholder ?? 'Jan Kowalski'}
                        required
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                       <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                         {dict.contact?.form?.phoneLabel ?? 'Numer Telefonu'}
                       </label>
                       <input
                         id="phone"
                         name="phone" // Add name attribute
                         type="tel"
                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200"
                         placeholder={dict.contact?.form?.phonePlaceholder ?? '+48 123 456 789'}
                         required
                       />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {dict.contact?.form?.emailLabel ?? 'Adres Email'}
                    </label>
                    <input
                      id="email"
                      name="email" // Add name attribute
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200"
                      placeholder={dict.contact?.form?.emailPlaceholder ?? 'jan.kowalski@example.com'}
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      {dict.contact?.form?.messageLabel ?? 'Twoja Wiadomość'}
                    </label>
                    <textarea
                      id="message"
                      name="message" // Add name attribute
                      rows={5} // Increased rows for better UX
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200"
                      placeholder={dict.contact?.form?.messagePlaceholder ?? 'Opisz czego potrzebujesz...'}
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-dark transition-colors duration-200">
                    {dict.contact?.form?.submit ?? 'Wyślij Zapytanie'}
                  </Button>
                </form>
                {/* Add form submission handling logic here */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
