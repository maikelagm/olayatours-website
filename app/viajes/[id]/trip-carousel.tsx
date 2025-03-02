"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import payload from "@/payload.config"
import type { Trip, Destination } from "@/payload-types"

interface TripCarouselProps {
  trip: Trip
}

export function TripCarousel({ trip }: TripCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    const fetchDestinations = async () => {
      const destinationPromises = trip.destinations.map((id) => payload.findOne<Destination>("destinations", id))
      const fetchedDestinations = await Promise.all(destinationPromises)
      setDestinations(fetchedDestinations.filter((d): d is Destination => d !== null))
    }
    fetchDestinations()
  }, [trip.destinations])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length)
  }

  if (!destinations.length) return null

  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={destinations[currentSlide]?.image || "/placeholder.svg?height=500&width=1000"}
          alt={destinations[currentSlide]?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{destinations[currentSlide]?.name}</h2>
          <div className="flex items-center gap-1 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{destinations[currentSlide]?.location}</span>
          </div>
        </div>
      </div>

      {destinations.length > 1 && (
        <>
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/30 border-0 text-white hover:bg-black/50"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Anterior</span>
            </Button>
          </div>

          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/30 border-0 text-white hover:bg-black/50"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {destinations.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentSlide === index ? "bg-white w-4" : "bg-white/50",
                )}
                onClick={() => setCurrentSlide(index)}
              >
                <span className="sr-only">Destino {index + 1}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

