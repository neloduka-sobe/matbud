import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroDictionary {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export default function Hero({ dictionary }: { dictionary: HeroDictionary }) {
  return (
    <section className="hero-image relative min-h-[600px] flex items-center">
      <div className="container hero-content text-white">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{dictionary.title}</h1>
          <p className="text-xl max-w-[600px]">{dictionary.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark text-white">
              <Link href="#contact">{dictionary.primaryCta}</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link href="#services">{dictionary.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}