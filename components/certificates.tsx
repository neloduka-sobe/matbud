"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"

interface DictionaryType {
  title: string;
  subtitle: string;
  certificateNames: string[];
}

export default function Certificates({ dictionary }: { dictionary: DictionaryType }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const certificates = [
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
    "/placeholder.svg?height=300&width=200",
  ]

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? certificates.length - 1 : selectedImage - 1)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === certificates.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <section id="certificates" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{dictionary.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{dictionary.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="relative aspect-[2/3] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={certificate || "/placeholder.svg"}
                alt={`Certificate ${index + 1}`}
                fill
                className="object-cover rounded-md border-2 border-muted hover:border-primary/50 transition-colors"
              />
            </div>
          ))}
        </div>

        <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none">
            <div className="relative bg-background p-2 rounded-lg">
              <DialogClose className="absolute right-2 top-2 z-10">
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Zamknij</span>
                </Button>
              </DialogClose>

              {selectedImage !== null && (
                <div className="relative h-[80vh] max-h-[600px]">
                  <Image
                    src={certificates[selectedImage] || "/placeholder.svg"}
                    alt={`Certificate ${selectedImage + 1}`}
                    fill
                    className="object-contain"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrevious()
                    }}
                  >
                    <ChevronLeft className="h-8 w-8" />
                    <span className="sr-only">Poprzedni</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNext()
                    }}
                  >
                    <ChevronRight className="h-8 w-8" />
                    <span className="sr-only">Następny</span>
                  </Button>
                </div>
              )}

              <div className="p-4 text-center">
                <p className="font-medium">{selectedImage !== null && dictionary.certificateNames[selectedImage]}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

