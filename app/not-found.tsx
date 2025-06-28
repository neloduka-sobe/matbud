import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"

export default async function LocaleNotFound({
  params,
}: {
  params?: { locale: string }
}) {
  const locale = params ? await Promise.resolve(params.locale) : "en"
  const dict = await getDictionary(locale)

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-4">{dict.notFound?.title || "Page Not Found"}</h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        {dict.notFound?.description || "Sorry, we couldn't find the page you're looking for."}
      </p>
      <Link
        href={`/${locale}`}
        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition-colors"
      >
        {dict.notFound?.backHome || "Back to home"}
      </Link>
    </div>
  )
}