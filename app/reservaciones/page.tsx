import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { db } from "@/lib/db"
import { formatDate, formatPrice } from "@/lib/utils"
import Link from "next/link"

export default async function ReservationsPage() {
  // En una app real, obtendríamos el userId del usuario autenticado
  const userId = "user1"
  const userReservations = db.getReservationsByUserId(userId)

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Mis reservaciones</h1>
          <p className="text-muted-foreground">Gestiona tus reservaciones de viajes</p>
        </div>

        {userReservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-xl font-semibold mb-2">No tienes reservaciones</h2>
            <p className="text-muted-foreground mb-6">Parece que aún no has realizado ninguna reservación</p>
            <Button asChild>
              <Link href="/viajes">Ver viajes disponibles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userReservations.map((reservation) => {
              const trip = db.getTripWithDestination(reservation.tripId)
              if (!trip) return null

              return (
                <Card key={reservation.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <img
                      src={trip.images[0] || "/placeholder.svg"}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={
                          reservation.status === "confirmed"
                            ? "bg-green-500"
                            : reservation.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }
                      >
                        {reservation.status === "confirmed"
                          ? "Confirmada"
                          : reservation.status === "pending"
                            ? "Pendiente"
                            : "Cancelada"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{trip.name}</CardTitle>
                    <CardDescription>{formatDate(trip.departureTime)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Asientos</span>
                          <span>{reservation.seats}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Precio por asiento</span>
                          <span>{formatPrice(trip.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Descuento estudiante</span>
                          <span className="text-green-600">-10%</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>{formatPrice(trip.price * reservation.seats * 0.9)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/viajes/${trip.id}`}>Ver detalles</Link>
                    </Button>
                    {reservation.status === "pending" && <Button variant="destructive">Cancelar</Button>}
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

