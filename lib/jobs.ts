export type Job = {
  id: string
  title: string
  location: string
  type: 'full-time' | 'part-time' | 'contract'
  experience: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  isActive: boolean
}

export async function getJobs(): Promise<Job[]> {
  return [
    {
      id: "technik-systemow-ppoz",
      title: "Technik Systemów Przeciwpożarowych",
      location: "Warszawa",
      type: "full-time",
      experience: "2-5 lat",
      description: "Poszukujemy doświadczonego technika do instalacji, konserwacji i serwisu systemów przeciwpożarowych. Osoba na tym stanowisku będzie odpowiedzialna za zapewnienie najwyższej jakości usług naszym klientom.",
      requirements: [
        "Wykształcenie techniczne w dziedzinie elektrotechniki, automatyki lub pokrewnej",
        "Minimum 2 lata doświadczenia w branży przeciwpożarowej",
        "Znajomość systemów sygnalizacji pożaru i tryskaczowych",
        "Uprawnienia SEP do 1kV",
        "Prawo jazdy kat. B",
        "Umiejętność czytania dokumentacji technicznej",
        "Dobra znajomość przepisów przeciwpożarowych"
      ],
      responsibilities: [
        "Instalacja i konfiguracja systemów przeciwpożarowych",
        "Konserwacja i serwis systemów sygnalizacji pożaru",
        "Diagnostyka i naprawa usterek",
        "Przeprowadzanie testów funkcjonalnych",
        "Sporządzanie dokumentacji technicznej",
        "Współpraca z klientami i koordynacja prac"
      ],
      benefits: [
        "Stała umowa o pracę",
        "Konkurencyjne wynagrodzenie",
        "Samochód służbowy",
        "Telefon służbowy",
        "Szkolenia i rozwój zawodowy",
        "Ubezpieczenie grupowe",
        "Dodatkowe benefity"
      ],
      isActive: true
    },
    {
      id: "projektant-systemow-ppoz",
      title: "Projektant Systemów Przeciwpożarowych",
      location: "Kraków",
      type: "full-time",
      experience: "3-7 lat",
      description: "Dołącz do naszego zespołu projektowego jako projektant systemów przeciwpożarowych. Będziesz odpowiedzialny za projektowanie kompleksowych rozwiązań bezpieczeństwa dla naszych klientów.",
      requirements: [
        "Wykształcenie wyższe techniczne (automatyka, elektrotechnika, inżynieria bezpieczeństwa)",
        "Minimum 3 lata doświadczenia w projektowaniu systemów przeciwpożarowych",
        "Znajomość AutoCAD, Revit lub podobnych programów CAD",
        "Znajomość przepisów przeciwpożarowych i norm technicznych",
        "Doświadczenie w projektowaniu systemów sygnalizacji pożaru i tryskaczowych",
        "Umiejętność pracy w zespole i komunikacji z klientami",
        "Znajomość języka angielskiego w stopniu komunikatywnym"
      ],
      responsibilities: [
        "Projektowanie systemów przeciwpożarowych",
        "Przygotowywanie dokumentacji projektowej",
        "Konsultacje z klientami i architektami",
        "Współpraca z zespołem instalacyjnym",
        "Nadzór nad realizacją projektów",
        "Aktualizacja dokumentacji technicznej"
      ],
      benefits: [
        "Stała umowa o pracę",
        "Konkurencyjne wynagrodzenie",
        "Elastyczne godziny pracy",
        "Możliwość pracy zdalnej",
        "Szkolenia i certyfikacje",
        "Ubezpieczenie zdrowotne",
        "Dodatkowe benefity"
      ],
      isActive: true
    },
    {
      id: "serwisant-systemow-ppoz",
      title: "Serwisant Systemów Przeciwpożarowych",
      location: "Wrocław",
      type: "full-time",
      experience: "1-3 lata",
      description: "Poszukujemy serwisanta do obsługi technicznej systemów przeciwpożarowych. Idealna osoba dla kogoś, kto chce rozwijać się w branży bezpieczeństwa.",
      requirements: [
        "Wykształcenie techniczne",
        "Podstawowa znajomość systemów przeciwpożarowych",
        "Umiejętność obsługi narzędzi elektrycznych",
        "Prawo jazdy kat. B",
        "Dobra organizacja pracy",
        "Komunikatywność i umiejętność pracy w zespole",
        "Chęć do nauki i rozwoju"
      ],
      responsibilities: [
        "Konserwacja systemów przeciwpożarowych",
        "Przeprowadzanie przeglądów technicznych",
        "Wymiana elementów eksploatacyjnych",
        "Obsługa zgłoszeń serwisowych",
        "Sporządzanie raportów z prac",
        "Współpraca z zespołem technicznym"
      ],
      benefits: [
        "Stała umowa o pracę",
        "Konkurencyjne wynagrodzenie",
        "Samochód służbowy",
        "Szkolenia i rozwój zawodowy",
        "Możliwość awansu",
        "Ubezpieczenie grupowe",
        "Dodatkowe benefity"
      ],
      isActive: true
    },
    {
      id: "kierownik-projektow",
      title: "Kierownik Projektów Przeciwpożarowych",
      location: "Poznań",
      type: "full-time",
      experience: "5-10 lat",
      description: "Dołącz do nas jako kierownik projektów przeciwpożarowych. Będziesz odpowiedzialny za zarządzanie kompleksowymi projektami i zespołem technicznym.",
      requirements: [
        "Wykształcenie wyższe techniczne",
        "Minimum 5 lat doświadczenia w branży przeciwpożarowej",
        "Doświadczenie w zarządzaniu projektami",
        "Znajomość przepisów przeciwpożarowych i norm technicznych",
        "Umiejętności menedżerskie i komunikacyjne",
        "Znajomość języka angielskiego",
        "Prawo jazdy kat. B"
      ],
      responsibilities: [
        "Zarządzanie projektami przeciwpożarowymi",
        "Koordynacja pracy zespołu technicznego",
        "Kontakty z klientami i kontrahentami",
        "Planowanie i kontrola harmonogramów",
        "Zarządzanie budżetami projektów",
        "Nadzór nad jakością realizacji"
      ],
      benefits: [
        "Stała umowa o pracę",
        "Konkurencyjne wynagrodzenie",
        "Samochód służbowy",
        "Telefon służbowy",
        "Elastyczne godziny pracy",
        "Szkolenia menedżerskie",
        "Ubezpieczenie zdrowotne",
        "Dodatkowe benefity"
      ],
      isActive: true
    }
  ]
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const jobs = await getJobs()
  return jobs.find(job => job.id === id)
} 