export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fr"],
}

export type Locale = (typeof i18n)["locales"][number]

