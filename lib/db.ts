import { z } from "zod"

// Tipos de datos
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  university: z.string().optional(),
  studentId: z.string().optional(),
})

export const destinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  category: z.enum(["entertainment", "beach", "cultural", "nightlife", "nature"]),
  rating: z.number().min(0).max(5),
  popular: z.boolean().default(false),
})

export const tripSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  departureTime: z.string(),
  returnTime: z.string().optional(),
  price: z.number(),
  totalSeats: z.number(),
  availableSeats: z.number(),
  type: z.enum(["daily", "nightlife", "weekend", "special"]),
  destinationId: z.string(),
  pickupPoints: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      time: z.string(),
    }),
  ),
  images: z.array(z.string()),
  featured: z.boolean().default(false),
})

export const reservationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  tripId: z.string(),
  seats: z.number(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
  createdAt: z.string(),
  passengerInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    studentId: z.string().optional(),
  }),
})

// Tipos derivados
export type User = z.infer<typeof userSchema>
export type Destination = z.infer<typeof destinationSchema>
export type Trip = z.infer<typeof tripSchema>
export type Reservation = z.infer<typeof reservationSchema>

// Datos simulados
export const users: User[] = [
  {
    id: "user1",
    name: "Carlos Rodríguez",
    email: "carlos@estudiantes.uci.cu",
    phone: "53-5555-1234",
    university: "Universidad de Ciencias Informáticas",
    studentId: "E12345",
  },
  {
    id: "user2",
    name: "María González",
    email: "maria@estudiantes.uci.cu",
    phone: "53-5555-5678",
    university: "Universidad de Ciencias Informáticas",
    studentId: "E67890",
  },
]

export const destinations: Destination[] = [
  {
    id: "dest1",
    name: "Playas del Este",
    image: "/placeholder.svg?height=400&width=600",
    description: "Hermosas playas de arena blanca a pocos kilómetros de La Habana",
    category: "beach",
    rating: 4.7,
    popular: true,
  },
  {
    id: "dest2",
    name: "La Habana Vieja",
    image: "/placeholder.svg?height=400&width=600",
    description: "Centro histórico de La Habana con arquitectura colonial y plazas emblemáticas",
    category: "cultural",
    rating: 4.9,
    popular: true,
  },
  {
    id: "dest3",
    name: "Fábrica de Arte Cubano",
    image: "/placeholder.svg?height=400&width=600",
    description: "Centro cultural y artístico con exposiciones, música en vivo y ambiente único",
    category: "nightlife",
    rating: 4.8,
    popular: true,
  },
  {
    id: "dest4",
    name: "Malecón Habanero",
    image: "/placeholder.svg?height=400&width=600",
    description: "Emblemático paseo marítimo, lugar de encuentro social y cultural",
    category: "cultural",
    rating: 4.6,
    popular: true,
  },
  {
    id: "dest5",
    name: "Viñales",
    image: "/placeholder.svg?height=400&width=600",
    description: "Valle con impresionantes formaciones montañosas y plantaciones de tabaco",
    category: "nature",
    rating: 4.9,
    popular: false,
  },
  {
    id: "dest6",
    name: "Varadero",
    image: "/placeholder.svg?height=400&width=600",
    description: "Una de las playas más hermosas del Caribe con arena blanca y aguas cristalinas",
    category: "beach",
    rating: 4.8,
    popular: true,
  },
  {
    id: "dest7",
    name: "Casa de la Música",
    image: "/placeholder.svg?height=400&width=600",
    description: "Venue popular para disfrutar de música cubana en vivo y bailar salsa",
    category: "nightlife",
    rating: 4.5,
    popular: true,
  },
  {
    id: "dest8",
    name: "Tropicana",
    image: "/placeholder.svg?height=400&width=600",
    description: "Legendario cabaret cubano con espectáculos de música y baile",
    category: "nightlife",
    rating: 4.7,
    popular: false,
  },
]

export const trips: Trip[] = [
  {
    id: "trip1",
    name: "UCI a La Habana Vieja",
    description: "Viaje directo desde la UCI al centro histórico de La Habana con tiempo libre para explorar.",
    departureTime: "2025-03-15T09:00:00Z",
    returnTime: "2025-03-15T17:00:00Z",
    price: 150,
    totalSeats: 40,
    availableSeats: 25,
    type: "daily",
    destinationId: "dest2",
    pickupPoints: [
      {
        id: "pickup1",
        name: "Entrada Principal UCI",
        time: "2025-03-15T09:00:00Z",
      },
      {
        id: "pickup2",
        name: "Residencia Estudiantil",
        time: "2025-03-15T09:15:00Z",
      },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
  {
    id: "trip2",
    name: "Noche en Fábrica de Arte",
    description: "Disfruta de una noche en la Fábrica de Arte Cubano con transporte de ida y vuelta.",
    departureTime: "2025-03-20T20:00:00Z",
    returnTime: "2025-03-21T02:00:00Z",
    price: 200,
    totalSeats: 35,
    availableSeats: 15,
    type: "nightlife",
    destinationId: "dest3",
    pickupPoints: [
      {
        id: "pickup1",
        name: "Entrada Principal UCI",
        time: "2025-03-20T20:00:00Z",
      },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
  {
    id: "trip3",
    name: "Fin de Semana en Varadero",
    description: "Escápate a las hermosas playas de Varadero durante todo el fin de semana.",
    departureTime: "2025-03-25T07:00:00Z",
    returnTime: "2025-03-27T18:00:00Z",
    price: 950,
    totalSeats: 45,
    availableSeats: 30,
    type: "weekend",
    destinationId: "dest6",
    pickupPoints: [
      {
        id: "pickup1",
        name: "Entrada Principal UCI",
        time: "2025-03-25T07:00:00Z",
      },
      {
        id: "pickup2",
        name: "Residencia Estudiantil",
        time: "2025-03-25T07:15:00Z",
      },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
  {
    id: "trip4",
    name: "Tarde en Playas del Este",
    description: "Disfruta de una tarde relajante en las hermosas Playas del Este.",
    departureTime: "2025-04-05T12:00:00Z",
    returnTime: "2025-04-05T19:00:00Z",
    price: 180,
    totalSeats: 30,
    availableSeats: 20,
    type: "daily",
    destinationId: "dest1",
    pickupPoints: [
      {
        id: "pickup1",
        name: "Entrada Principal UCI",
        time: "2025-04-05T12:00:00Z",
      },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: false,
  },
  {
    id: "trip5",
    name: "Noche de Salsa en Casa de la Música",
    description: "Baila toda la noche con los mejores grupos de salsa en vivo.",
    departureTime: "2025-04-10T21:00:00Z",
    returnTime: "2025-04-11T03:00:00Z",
    price: 220,
    totalSeats: 25,
    availableSeats: 18,
    type: "nightlife",
    destinationId: "dest7",
    pickupPoints: [
      {
        id: "pickup1",
        name: "Entrada Principal UCI",
        time: "2025-04-10T21:00:00Z",
      },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: false,
  },
]

export const reservations: Reservation[] = [
  {
    id: "res1",
    userId: "user1",
    tripId: "trip1",
    seats: 2,
    status: "confirmed",
    createdAt: "2025-02-15T14:30:00Z",
    passengerInfo: {
      name: "Carlos Rodríguez",
      email: "carlos@estudiantes.uci.cu",
      phone: "53-5555-1234",
      studentId: "E12345",
    },
  },
  {
    id: "res2",
    userId: "user2",
    tripId: "trip2",
    seats: 1,
    status: "confirmed",
    createdAt: "2025-02-20T10:15:00Z",
    passengerInfo: {
      name: "María González",
      email: "maria@estudiantes.uci.cu",
      phone: "53-5555-5678",
      studentId: "E67890",
    },
  },
  {
    id: "res3",
    userId: "user1",
    tripId: "trip3",
    seats: 3,
    status: "pending",
    createdAt: "2025-02-25T16:45:00Z",
    passengerInfo: {
      name: "Carlos Rodríguez",
      email: "carlos@estudiantes.uci.cu",
      phone: "53-5555-1234",
      studentId: "E12345",
    },
  },
]

// Funciones de acceso a datos simulados
export const db = {
  // Usuarios
  getUsers: () => [...users],
  getUserById: (id: string) => users.find((user) => user.id === id),

  // Destinos
  getDestinations: () => [...destinations],
  getDestinationById: (id: string) => destinations.find((dest) => dest.id === id),
  getDestinationsByCategory: (category: string) => destinations.filter((dest) => dest.category === category),
  getPopularDestinations: () => destinations.filter((dest) => dest.popular),

  // Viajes
  getTrips: () => [...trips],
  getTripById: (id: string) => trips.find((trip) => trip.id === id),
  getTripsByType: (type: string) => trips.filter((trip) => trip.type === type),
  getTripsByDestination: (destinationId: string) => trips.filter((trip) => trip.destinationId === destinationId),
  getFeaturedTrips: () => trips.filter((trip) => trip.featured),
  getTripWithDestination: (id: string) => {
    const trip = trips.find((trip) => trip.id === id)
    if (!trip) return null

    const destination = destinations.find((dest) => dest.id === trip.destinationId)

    return {
      ...trip,
      destination,
    }
  },

  // Reservaciones
  getReservations: () => [...reservations],
  getReservationById: (id: string) => reservations.find((res) => res.id === id),
  getReservationsByUserId: (userId: string) => reservations.filter((res) => res.userId === userId),
  createReservation: (data: Omit<Reservation, "id" | "createdAt">) => {
    const newReservation: Reservation = {
      ...data,
      id: `res${reservations.length + 1}`,
      createdAt: new Date().toISOString(),
    }
    reservations.push(newReservation)

    // Actualizar asientos disponibles
    const trip = trips.find((t) => t.id === data.tripId)
    if (trip) {
      trip.availableSeats -= data.seats
    }

    return newReservation
  },
  updateReservationStatus: (id: string, status: Reservation["status"]) => {
    const reservation = reservations.find((res) => res.id === id)
    if (reservation) {
      reservation.status = status
      return reservation
    }
    return null
  },
}

