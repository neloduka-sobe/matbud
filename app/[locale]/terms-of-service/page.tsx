import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const dict = await getDictionary(locale)
  
  return {
    title: `${dict.termsOfService.title} | ${dict.common.companyName}`,
    description: dict.termsOfService.introduction,
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  
  const dict = await getDictionary(locale)

  return (
    <section className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{dict.termsOfService.title}</h1>
          <p className="text-muted-foreground">
            {dict.termsOfService.lastUpdated}: {dict.termsOfService.lastUpdatedDate}
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">{dict.termsOfService.introduction}</p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Definitions */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.definitions.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.definitions.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.definitions.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Scope of Services */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.scope.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.scope.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.scope.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Company Obligations */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.obligations.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.obligations.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.obligations.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Client Obligations */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.clientObligations.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.clientObligations.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.clientObligations.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Pricing and Payments */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.pricing.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.pricing.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.pricing.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Warranty and Liability */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.warranty.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.warranty.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.warranty.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Safety and Compliance */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.safety.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.safety.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.safety.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Confidentiality */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.confidentiality.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.confidentiality.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.confidentiality.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Termination */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.termination.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.termination.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.termination.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Dispute Resolution */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.disputes.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.disputes.content}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.disputes.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.contact.title}</h2>
            <p className="text-muted-foreground mb-4">{dict.termsOfService.sections.contact.content}</p>
            <ul className="space-y-2 text-muted-foreground">
              {dict.termsOfService.sections.contact.items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Changes */}
          <div className="bg-card border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.termsOfService.sections.changes.title}</h2>
            <p className="text-muted-foreground">{dict.termsOfService.sections.changes.content}</p>
          </div>
        </div>
      </div>
    </section>
  )
} 