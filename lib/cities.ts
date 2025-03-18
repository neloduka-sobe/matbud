export type City = {
  name: string
  slug: string
}

export async function getCities(locale: string): Promise<City[]> {
  return [
    { name: "Warszawa", slug: "systemy-ppoz-warszawa" },
    { name: "Kraków", slug: "systemy-ppoz-krakow" },
    { name: "Łódź", slug: "systemy-ppoz-lodz" },
  ]
}

