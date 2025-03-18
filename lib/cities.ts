export type City = {
  name: string
  slug: string
}

export async function getCities(locale: string): Promise<City[]> {
  // In a real implementation, you would read from a database or file
  // For demo purposes, we'll return mock data

  if (locale === "en") {
    return [
      { name: "New York", slug: "new-york" },
      { name: "Los Angeles", slug: "los-angeles" },
      { name: "Chicago", slug: "chicago" },
      { name: "Houston", slug: "houston" },
      { name: "Phoenix", slug: "phoenix" },
      { name: "Philadelphia", slug: "philadelphia" },
      { name: "San Antonio", slug: "san-antonio" },
      { name: "San Diego", slug: "san-diego" },
      { name: "Dallas", slug: "dallas" },
      { name: "San Jose", slug: "san-jose" },
    ]
  } else if (locale === "fr") {
    return [
      { name: "Paris", slug: "paris" },
      { name: "Lyon", slug: "lyon" },
      { name: "Marseille", slug: "marseille" },
      { name: "Bordeaux", slug: "bordeaux" },
      { name: "Lille", slug: "lille" },
      { name: "Toulouse", slug: "toulouse" },
      { name: "Nice", slug: "nice" },
      { name: "Nantes", slug: "nantes" },
      { name: "Strasbourg", slug: "strasbourg" },
      { name: "Montpellier", slug: "montpellier" },
    ]
  } else if (locale === "de") {
    return [
      { name: "Berlin", slug: "berlin" },
      { name: "Hamburg", slug: "hamburg" },
      { name: "München", slug: "muenchen" },
      { name: "Köln", slug: "koeln" },
      { name: "Frankfurt", slug: "frankfurt" },
      { name: "Stuttgart", slug: "stuttgart" },
      { name: "Düsseldorf", slug: "duesseldorf" },
      { name: "Leipzig", slug: "leipzig" },
      { name: "Dortmund", slug: "dortmund" },
      { name: "Essen", slug: "essen" },
    ]
  } else if (locale === "es") {
    return [
      { name: "Madrid", slug: "madrid" },
      { name: "Barcelona", slug: "barcelona" },
      { name: "Valencia", slug: "valencia" },
      { name: "Sevilla", slug: "sevilla" },
      { name: "Zaragoza", slug: "zaragoza" },
      { name: "Málaga", slug: "malaga" },
      { name: "Murcia", slug: "murcia" },
      { name: "Palma", slug: "palma" },
      { name: "Las Palmas", slug: "las-palmas" },
      { name: "Bilbao", slug: "bilbao" },
    ]
  } else {
    // Default to English cities if locale is not supported
    return [
      { name: "New York", slug: "new-york" },
      { name: "Los Angeles", slug: "los-angeles" },
      { name: "Chicago", slug: "chicago" },
      { name: "Houston", slug: "houston" },
      { name: "Phoenix", slug: "phoenix" },
      { name: "Philadelphia", slug: "philadelphia" },
      { name: "San Antonio", slug: "san-antonio" },
      { name: "San Diego", slug: "san-diego" },
      { name: "Dallas", slug: "dallas" },
      { name: "San Jose", slug: "san-jose" },
    ]
  }
}

