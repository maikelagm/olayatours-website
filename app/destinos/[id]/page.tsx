import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Star, Activity } from "lucide-react"
import payload from "@/payload.config"
import type { Destination, Trip } from "@/payload-types"
import { formatDate, formatPrice } from "@/lib/utils"

export default async function DestinationPage({ params }: { params: { id: string } }) {
  const destination = await payload.findOne<Destination>("destinations", params.id)

  if (!destination) {
    notFound()
  }

  const trips = await payload.find<Trip>("trips")
  const relatedTrips = trips.filter((trip) => trip.destinationId === destination.id)

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>{destination.rating.toFixed(1)}</span>
              </div>
            </div>
            <img
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-muted-foreground">{destination.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Actividades</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destination.activities.map((activity, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>{activity}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Viajes relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{trip.name}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{formatDate(trip.departureTime)}</span>
                      <Badge variant={trip.type === "nightlife" ? "secondary" : "outline"}>
                        {trip.type === "daily" && "Diario"}
                        {trip.type === "nightlife" && "Nocturno"}
                        {trip.type === "weekend" && "Fin de semana"}
                        {trip.type === "special" && "Especial"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{formatPrice(trip.price)}</span>
                      <Button asChild size="sm">
                        <Link href={`/viajes/${trip.id}`}>Ver detalles</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información del destino</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium">Categoría</dt>
                  <dd className="text-muted-foreground">{destination.category}</dd>
                </div>
                <div>
                  <dt className="font-medium">Popularidad</dt>
                  <dd className="text-muted-foreground">{destination.popular ? "Popular" : "Regular"}</dd>
                </div>
                <div>
                  <dt className="font-medium">Actividades disponibles</dt>
                  <dd className="text-muted-foreground">{destination.activities.length}</dd>
                </div>
              </dl>
              <Button asChild className="w-full mt-6">
                <Link href={`/viajes?destino=${encodeURIComponent(destination.name)}`}>Ver viajes disponibles</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

