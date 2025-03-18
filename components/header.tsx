"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle" // Add theme toggle

export function Header({ locale, dictionary }: { locale: string; dictionary: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/logo.svg" alt="FireGuard Systems" width={40} height={40} className="h-10 w-auto" />
          <span className="font-bold text-xl hidden sm:inline-block">Matbud Systemy Ppoż sp. z o.o.</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href={`/${locale}#services`} className="text-sm font-medium transition-colors hover:text-primary">
            {dictionary.services}
          </Link>
          <Link href={`/${locale}#about`} className="text-sm font-medium transition-colors hover:text-primary">
            {dictionary.about}
          </Link>
          <Link href={`/${locale}#certificates`} className="text-sm font-medium transition-colors hover:text-primary">
            {dictionary.certificates}
          </Link>
          <Link href={`/${locale}#clients`} className="text-sm font-medium transition-colors hover:text-primary">
            {dictionary.clients}
          </Link>
          <Link href={`/${locale}/blog`} className="text-sm font-medium transition-colors hover:text-primary">
            {dictionary.blog}
          </Link>
          <Link href={`/${locale}#contact`} className="text-sm font-medium transition-colors hover:text-primary">
            {dictionary.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle /> {/* Add theme toggle */}
          <LanguageSwitcher locale={locale} />
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <Link href={`/${locale}#services`} className="text-lg font-medium transition-colors hover:text-primary">
                  {dictionary.services}
                </Link>
                <Link href={`/${locale}#about`} className="text-lg font-medium transition-colors hover:text-primary">
                  {dictionary.about}
                </Link>
                <Link
                  href={`/${locale}#certificates`}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {dictionary.certificates}
                </Link>
                <Link href={`/${locale}#clients`} className="text-lg font-medium transition-colors hover:text-primary">
                  {dictionary.clients}
                </Link>
                <Link href={`/${locale}/blog`} className="text-lg font-medium transition-colors hover:text-primary">
                  {dictionary.blog}
                </Link>
                <Link href={`/${locale}#contact`} className="text-lg font-medium transition-colors hover:text-primary">
                  {dictionary.contact}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

