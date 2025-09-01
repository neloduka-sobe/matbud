import { Shield, Bell, Droplets, FileCheck, Wrench, Building } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

interface DictionaryType {
  title: string;
  subtitle: string;
  services: ServiceItem[];
  closingMessage: string;
}

export default function Services({ dictionary }: { dictionary: DictionaryType }) {
  const serviceIcons = [
    { icon: <Shield className="h-10 w-10 text-primary" />, name: "Fire Alarm Systems" },
    { icon: <Droplets className="h-10 w-10 text-primary" />, name: "Sprinkler Systems" },
    { icon: <Bell className="h-10 w-10 text-primary" />, name: "Emergency Lighting" },
    { icon: <FileCheck className="h-10 w-10 text-primary" />, name: "Fire Safety Inspections" },
    { icon: <Wrench className="h-10 w-10 text-primary" />, name: "Maintenance Services" },
    { icon: <Building className="h-10 w-10 text-primary" />, name: "Building Compliance" },
  ]

  return (
    <section id="services" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{dictionary.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dictionary.services.map((service, index) => (
            <Card key={index} className="border-2 border-muted hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4">{serviceIcons[index].icon}</div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground italic max-w-3xl mx-auto">
            {dictionary.closingMessage}
          </p>
        </div>
      </div>
    </section>
  )
}
