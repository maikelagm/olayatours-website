import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import payload from "@/payload.config"
import type { Destination } from "@/payload-types"

export default async function DestinationsPage() {
  const destinations = await payload.find<Destination>("destinations")

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Destinos</h1>
          <p className="text-muted-foreground">Explora los mejores lugares para visitar en Cuba</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden flex flex-col group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{destination.location}</span>
                  </div>
                </div>
              </div>
              <CardContent className="flex-1 p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{destination.description}</p>
                  <Badge
                    variant="outline"
                    className="w-fit"
                    style={{
                      backgroundColor:
                        destination.category === "beach"
                          ? "var(--primary)"
                          : destination.category === "nightlife"
                            ? "var(--secondary)"
                            : destination.category === "food"
                              ? "var(--accent)"
                              : "transparent",
                      color: ["beach", "nightlife", "food"].includes(destination.category) ? "white" : undefined,
                    }}
                  >
                    {destination.category}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/destinos/${destination.id}`}>Ver detalles</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

