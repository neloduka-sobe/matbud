import "server-only"

const dictionaries = {
  en: () => import("./dictionaries/pl.json").then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  // Default to 'en' if the locale is not supported
  const supportedLocale = Object.keys(dictionaries).includes(locale) ? locale : "pl"
  return dictionaries[supportedLocale as keyof typeof dictionaries]()
}

