import { ReservationForm } from "./reservation-form"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function ReservePage({
  searchParams,
}: {
  searchParams: { tripId?: string }
}) {
  const tripId = searchParams.tripId

  let trip = null
  if (tripId) {
    trip = db.getTripWithDestination(tripId)
    if (!trip) {
      notFound()
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservar viaje</h1>
            <p className="text-muted-foreground mt-2">Completa el formulario para reservar tu asiento</p>
          </div>

          <ReservationForm selectedTrip={trip} />
        </div>
      </div>
    </div>
  )
}

