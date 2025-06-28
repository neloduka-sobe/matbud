import "server-only"

const dictionaries = {
  pl: () => import("./dictionaries/pl.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  const supportedLocale = Object.keys(dictionaries).includes(locale) ? locale : "pl"
  return dictionaries[supportedLocale as keyof typeof dictionaries]()
}

