import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import payload from "@/payload.config"
import { formatDate, formatPrice } from "@/lib/utils"
import { TripFilters } from "./trip-filters"
import type { Trip, Destination } from "@/payload-types"

export default async function TripsPage({
  searchParams,
}: {
  searchParams: { tipo?: string; destino?: string }
}) {
  let trips: Trip[] = await payload.find<Trip>("trips")

  // Filtrar por tipo si se proporciona
  if (searchParams.tipo) {
    const typeMap: Record<string, Trip["type"]> = {
      diario: "daily",
      nocturno: "nightlife",
      finde: "weekend",
      especial: "special",
    }

    const type = typeMap[searchParams.tipo]
    if (type) {
      trips = trips.filter((trip) => trip.type === type)
    }
  }

  // Filtrar por destino si se proporciona
  if (searchParams.destino) {
    const destinations: Destination[] = await payload.find<Destination>("destinations")
    const destination = destinations.find((d) => d.name.toLowerCase() === searchParams.destino?.toLowerCase())

    if (destination) {
      trips = trips.filter((trip) => trip.destinationId === destination.id)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Viajes disponibles</h1>
          <p className="text-muted-foreground">Explora nuestros próximos viajes y reserva tu asiento</p>
        </div>

        <TripFilters />

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No hay viajes disponibles</h2>
            <p className="text-muted-foreground mb-6">No se encontraron viajes con los filtros seleccionados</p>
            <Button asChild>
              <Link href="/viajes">Ver todos los viajes</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map(async (trip) => {
              const destination = await payload.findOne<Destination>("destinations", trip.destinationId)

              return (
                <Card key={trip.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <img
                      src={trip.images[0] || "/placeholder.svg"}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{trip.name}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{destination?.name}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(trip.departureTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(trip.departureTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{trip.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={trip.type === "nightlife" ? "secondary" : "outline"}>
                            {trip.type === "daily" && "Diario"}
                            {trip.type === "nightlife" && "Nocturno"}
                            {trip.type === "weekend" && "Fin de semana"}
                            {trip.type === "special" && "Especial"}
                          </Badge>
                        </div>
                        <p className="font-bold">{formatPrice(trip.price)}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/viajes/${trip.id}`}>Ver detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

