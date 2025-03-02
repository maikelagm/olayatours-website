"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { payloadCMS, type Trip } from "@/lib/payloadCMS"
import { formatDate, formatPrice } from "@/lib/utils"

const formSchema = z.object({
  tripId: z.string({
    required_error: "Por favor selecciona un viaje",
  }),
  seats: z.coerce.number().min(1, {
    message: "Debes reservar al menos 1 asiento",
  }),
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  email: z
    .string()
    .email({
      message: "Por favor ingresa un correo electrónico válido",
    })
    .refine((email) => email.endsWith("@estudiantes.uci.cu") || email.endsWith("@uci.cu"), {
      message: "Debes usar tu correo de la UCI (@estudiantes.uci.cu o @uci.cu)",
    }),
  phone: z.string().min(10, {
    message: "Por favor ingresa un número de teléfono válido",
  }),
  studentId: z.string().min(5, {
    message: "Por favor ingresa tu número de carné estudiantil",
  }),
  saveInfo: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

interface ReservationFormProps {
  selectedTrip: Trip | null
}

export function ReservationForm({ selectedTrip }: ReservationFormProps) {
  const router = useRouter()
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedTripDetails, setSelectedTripDetails] = useState<Trip | null>(selectedTrip)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const fetchedTrips = await payloadCMS.getTrips()
        setTrips(fetchedTrips)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching trips:", error)
        setIsLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripId: selectedTrip?.id || "",
      seats: 1,
      name: "",
      email: "",
      phone: "",
      studentId: "",
      saveInfo: false,
    },
  })

  // Cargar información guardada del localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem("passengerInfo")
    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo)
        form.setValue("name", parsedInfo.name || "")
        form.setValue("email", parsedInfo.email || "")
        form.setValue("phone", parsedInfo.phone || "")
        form.setValue("studentId", parsedInfo.studentId || "")
      } catch (error) {
        console.error("Error parsing saved info:", error)
      }
    }
  }, [form])

  // Actualizar detalles del viaje seleccionado
  useEffect(() => {
    if (selectedTrip) {
      setSelectedTripDetails(selectedTrip)
    }
  }, [selectedTrip])

  const watchTripId = form.watch("tripId")

  // Actualizar los detalles del viaje cuando cambia la selección
  useEffect(() => {
    if (watchTripId && trips.length > 0) {
      const trip = trips.find((t) => t.id === watchTripId)
      if (trip) {
        setSelectedTripDetails(trip)
      }
    }
  }, [watchTripId, trips])

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    if (values.saveInfo) {
      localStorage.setItem(
        "passengerInfo",
        JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          studentId: values.studentId,
        }),
      )
    }

    try {
      await payloadCMS.createReservation({
        userId: "user1", // En una app real, esto vendría de la autenticación
        tripId: values.tripId,
        seats: values.seats,
        status: "pending",
        passengerInfo: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          studentId: values.studentId,
        },
      })
      alert("Reservación creada exitosamente")
      router.push("/reservaciones")
    } catch (error) {
      alert("Hubo un error al crear tu reservación")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Cargando viajes disponibles...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Detalles del viaje</h2>
              <FormField
                control={form.control}
                name="tripId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecciona un viaje</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!selectedTrip}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un viaje" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trips.map((trip) => (
                          <SelectItem key={trip.id} value={trip.id}>
                            {trip.name} - {formatDate(trip.departureTime)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de asientos</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={selectedTripDetails?.availableSeats || 10} {...field} />
                    </FormControl>
                    <FormDescription>
                      Máximo {selectedTripDetails?.availableSeats || "?"} asientos disponibles
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Información del estudiante</h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Carlos Rodríguez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico UCI</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="carlos@estudiantes.uci.cu" {...field} />
                    </FormControl>
                    <FormDescription>Usa tu correo institucional (@estudiantes.uci.cu o @uci.cu)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="53-5555-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carné estudiantil</FormLabel>
                    <FormControl>
                      <Input placeholder="E12345" {...field} />
                    </FormControl>
                    <FormDescription>Necesario para aplicar el descuento de estudiante</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="saveInfo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Guardar información</FormLabel>
                      <FormDescription>Guarda tu información para futuras reservaciones</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : "Completar reservación"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="md:col-span-1">
        {selectedTripDetails && (
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de reservación</CardTitle>
                <CardDescription>Detalles de tu viaje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedTripDetails.name}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedTripDetails.departureTime)}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Precio por asiento</span>
                    <span>{formatPrice(selectedTripDetails.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Asientos</span>
                    <span>x{form.watch("seats") || 1}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Descuento estudiante</span>
                    <span className="text-green-600">-10%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(selectedTripDetails.price * (form.watch("seats") || 1) * 0.9)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                <p>El pago se realizará en efectivo al momento de abordar el transporte.</p>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

