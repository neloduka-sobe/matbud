"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

interface Dictionary {
  title: string;
  subtitle: string;
  contactInfo: {
    title: string;
    addressTitle: string;
    phoneTitle: string;
    emailTitle: string;
    hoursTitle: string;
    weekdays: string;
    saturday: string;
    sunday: string;
    closed: string;
  };
  form: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
  };
}

export default function Contact({ dictionary }: { dictionary: Dictionary }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  async function onSubmit() {
    setIsSubmitting(true)

    // Simulate API call TODO
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: dictionary.form.successTitle,
      description: dictionary.form.successMessage,
    })

    form.reset()
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{dictionary.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">{dictionary.contactInfo.title}</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">{dictionary.contactInfo.addressTitle}</h4>
                    <address className="not-italic text-muted-foreground">
                      Słocin 36F
                      <br />
                      62-065 Grodzisk Wielkopolski
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">{dictionary.contactInfo.phoneTitle}</h4>
                    <p className="text-muted-foreground">
                      <a href="tel:+11234567890" className="hover:text-primary transition-colors">
                        +48 61 448 10 28
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">{dictionary.contactInfo.emailTitle}</h4>
                    <p className="text-muted-foreground">
                      <a href="mailto:matbud@m-so.pl" className="hover:text-primary transition-colors">
                        matbud@m-so.pl
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">{dictionary.contactInfo.hoursTitle}</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>{dictionary.contactInfo.weekdays}</span>
                    <span>8:00 - 16:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{dictionary.contactInfo.saturday} - {dictionary.contactInfo.sunday}</span>
                    <span>{dictionary.contactInfo.closed}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-2xl font-bold mb-6">{dictionary.form.title}</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dictionary.form.nameLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder={dictionary.form.namePlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{dictionary.form.emailLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={dictionary.form.emailPlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{dictionary.form.phoneLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={dictionary.form.phonePlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dictionary.form.messageLabel}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={dictionary.form.messagePlaceholder} rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        {dictionary.form.submitting}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {dictionary.form.submit}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}