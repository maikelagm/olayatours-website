import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate, formatPrice } from "@/lib/utils"
import { Clock, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TripCarousel } from "./trip-carousel"
import payload from "@/payload.config"
import type { Trip, Destination } from "@/payload-types"

export default async function TripDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const trip = await payload.findOne<Trip>("trips", params.id)

  if (!trip) {
    notFound()
  }

  const destinations = await Promise.all(
    trip.destinations.map((id) => payload.findOne<Destination>("destinations", id)),
  )

  return (
    <div className="relative">
      <TripCarousel trip={trip} />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold">{trip.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={trip.type === "nightlife" ? "secondary" : "outline"}>
                  {trip.type === "daily" && "Diario"}
                  {trip.type === "nightlife" && "Nocturno"}
                  {trip.type === "weekend" && "Fin de semana"}
                  {trip.type === "special" && "Especial"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-4">{trip.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Detalles del viaje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fecha de salida</p>
                      <p className="text-sm text-muted-foreground">{formatDate(trip.departureTime)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Hora de salida</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(trip.departureTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {trip.returnTime && (
                  <>
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Fecha de regreso</p>
                          <p className="text-sm text-muted-foreground">{formatDate(trip.returnTime)}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Hora de regreso</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(trip.returnTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Asientos disponibles</p>
                      <p className="text-sm text-muted-foreground">
                        {trip.availableSeats} de {trip.totalSeats}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Puntos de recogida</h2>
              <div className="space-y-4">
                {trip.pickupPoints.map((point, index) => (
                  <div key={point.id} className="relative">
                    {index !== 0 && <div className="absolute top-0 bottom-0 left-6 -translate-x-1/2 w-0.5 bg-border" />}
                    <div className="flex gap-4">
                      <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div>
                                <h3 className="font-medium">{point.name}</h3>
                              </div>
                              <div className="flex flex-col text-sm">
                                <span>
                                  Hora de recogida:{" "}
                                  {new Date(point.time).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Destinos del viaje</h2>
              <div className="space-y-4">
                {destinations.map(
                  (destination, index) =>
                    destination && (
                      <div key={destination.id} className="relative">
                        {index !== 0 && (
                          <div className="absolute top-0 bottom-0 left-6 -translate-x-1/2 w-0.5 bg-border" />
                        )}
                        <div className="flex gap-4">
                          <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <h3 className="font-medium">{destination.name}</h3>
                                    <p className="text-sm text-muted-foreground">{destination.location}</p>
                                  </div>
                                  <Badge variant="outline">{destination.category}</Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{formatPrice(trip.price)}</h3>
                      <p className="text-sm text-muted-foreground">Precio por persona</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Asientos disponibles</span>
                        <Badge variant="outline">
                          {trip.availableSeats} de {trip.totalSeats}
                        </Badge>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fecha de salida</span>
                        <span>{formatDate(trip.departureTime)}</span>
                      </div>

                      {trip.returnTime && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha de regreso</span>
                          <span>{formatDate(trip.returnTime)}</span>
                        </div>
                      )}
                    </div>

                    <Button asChild className="w-full" disabled={trip.availableSeats === 0}>
                      <Link href={`/reservar?tripId=${trip.id}`}>Reservar ahora</Link>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Precios especiales para estudiantes de la UCI
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden bg-background border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">{formatPrice(trip.price)}</p>
            <p className="text-xs text-muted-foreground">Por persona</p>
          </div>
          <Button asChild disabled={trip.availableSeats === 0}>
            <Link href={`/reservar?tripId=${trip.id}`}>Reservar ahora</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

