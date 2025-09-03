import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, MapPin, Clock, Briefcase, CheckCircle } from "lucide-react"
import { getDictionary } from "@/lib/dictionaries"
import { getJobById, getJobs } from "@/content/jobs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ApplyButton } from "@/components/apply-button"
import { i18n } from "@/lib/i18n-config"

interface JobPageProps {
  params: {
    locale: string
    jobId: string
  }
}

export async function generateStaticParams() {
  const jobs = await getJobs()
  const activeJobs = jobs.filter(job => job.isActive)
  
  const params = []
  
  for (const locale of i18n.locales) {
    for (const job of activeJobs) {
      params.push({
        locale,
        jobId: job.id,
      })
    }
  }
  
  return params
}

export async function generateMetadata({ 
  params 
}: JobPageProps): Promise<Metadata> {
  const paramsCopy = await Promise.resolve(params)
  const locale = paramsCopy.locale
  const jobId = paramsCopy.jobId
  
  const job = await getJobById(jobId)
  const dict = await getDictionary(locale)

  if (!job) {
    return {
      title: dict.careers.noJobsAvailable,
    }
  }

  return {
    title: `${job.title} - ${dict.careers.title}`,
    description: job.description,
  }
}

export default async function JobPage({ 
  params 
}: JobPageProps) {
  const paramsCopy = await Promise.resolve(params)
  const locale = paramsCopy.locale
  const jobId = paramsCopy.jobId
  
  const dict = await getDictionary(locale)
  const job = await getJobById(jobId)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link 
          href={`/${locale}/careers`} 
          className="flex items-center text-foreground/70 hover:text-primary mb-8 transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {dict.careers.jobDetails.backToJobs}
        </Link>

        {/* Job Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2 text-foreground">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{dict.careers.jobTypes[job.type]}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {dict.careers.jobTypes[job.type]}
            </Badge>
          </div>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">
                {dict.careers.jobDetails.requirements}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">
                {dict.careers.jobDetails.responsibilities}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-foreground">
              {dict.careers.jobDetails.benefits}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {job.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Apply Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Zainteresowany tą ofertą?
          </h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Wyślij nam swoje CV i list motywacyjny. Skontaktujemy się z Tobą w ciągu kilku dni.
          </p>
          <div className="flex justify-center">
            <ApplyButton 
              jobTitle={job.title}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              {dict.careers.jobDetails.applyNow}
            </ApplyButton>
          </div>
        </div>
      </div>
    </div>
  )
} 