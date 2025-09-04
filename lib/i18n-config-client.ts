export const i18n = {
  defaultLocale: "pl",
  locales: ["pl"/*, "en"*/],
}

export type Locale = (typeof i18n)["locales"][number]

