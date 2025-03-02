import type { Trip, Destination, Reservation } from "./payload-types"

// Datos de prueba más realistas
const trips: Trip[] = [
  {
    id: "trip1",
    name: "Noche de Cultura y Sabor",
    description: "Explora la vibrante vida nocturna y la deliciosa gastronomía de La Habana.",
    departureTime: "2025-06-15T19:00:00Z",
    returnTime: "2025-06-16T02:00:00Z",
    price: 350,
    totalSeats: 20,
    availableSeats: 15,
    type: "nightlife",
    destinations: ["dest1", "dest2", "dest4"],
    pickupPoints: [
      { id: "pickup1", name: "UCI Campus Principal", time: "2025-06-15T18:30:00Z" },
      { id: "pickup2", name: "Hotel Nacional", time: "2025-06-15T19:00:00Z" },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
  {
    id: "trip2",
    name: "Sol, Playa y Ritmo",
    description: "Disfruta de un día completo de playa y termina con una noche de música cubana.",
    departureTime: "2025-07-01T09:00:00Z",
    returnTime: "2025-07-01T23:00:00Z",
    price: 450,
    totalSeats: 30,
    availableSeats: 25,
    type: "daily",
    destinations: ["dest3", "dest8"],
    pickupPoints: [
      { id: "pickup3", name: "UCI Campus Principal", time: "2025-07-01T08:30:00Z" },
      { id: "pickup4", name: "Parque Central", time: "2025-07-01T09:00:00Z" },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
  {
    id: "trip3",
    name: "Habana Cultural",
    description: "Sumérgete en la rica cultura e historia de La Habana.",
    departureTime: "2025-07-15T10:00:00Z",
    returnTime: "2025-07-15T18:00:00Z",
    price: 300,
    totalSeats: 25,
    availableSeats: 20,
    type: "daily",
    destinations: ["dest6", "dest7", "dest2"],
    pickupPoints: [
      { id: "pickup5", name: "UCI Campus Principal", time: "2025-07-15T09:30:00Z" },
      { id: "pickup6", name: "Plaza de la Revolución", time: "2025-07-15T10:00:00Z" },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: false,
  },
  {
    id: "trip4",
    name: "Noche de Espectáculo",
    description: "Vive una noche mágica en el legendario cabaret Tropicana.",
    departureTime: "2025-08-01T20:00:00Z",
    returnTime: "2025-08-02T01:00:00Z",
    price: 500,
    totalSeats: 15,
    availableSeats: 10,
    type: "nightlife",
    destinations: ["dest5"],
    pickupPoints: [
      { id: "pickup7", name: "UCI Campus Principal", time: "2025-08-01T19:30:00Z" },
      { id: "pickup8", name: "Hotel Habana Libre", time: "2025-08-01T20:00:00Z" },
    ],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    featured: true,
  },
  // Add more trips as needed
]

const destinations: Destination[] = [
  {
    id: "dest1",
    name: "Fábrica de Arte Cubano",
    image: "/placeholder.svg?height=400&width=600",
    description: "Centro cultural y artístico con exposiciones, música en vivo y ambiente único.",
    category: "nightlife",
    rating: 4.8,
    popular: true,
    location: "Calle 26, La Habana",
  },
  {
    id: "dest2",
    name: "La Bodeguita del Medio",
    image: "/placeholder.svg?height=400&width=600",
    description: "Famoso bar-restaurante, cuna del mojito y frecuentado por Ernest Hemingway.",
    category: "food",
    rating: 4.5,
    popular: true,
    location: "Empedrado, La Habana Vieja",
  },
  {
    id: "dest3",
    name: "Playas del Este",
    image: "/placeholder.svg?height=400&width=600",
    description: "Hermosas playas de arena blanca a pocos kilómetros de La Habana.",
    category: "beach",
    rating: 4.6,
    popular: true,
    location: "Este de La Habana",
  },
  {
    id: "dest4",
    name: "Coppelia",
    image: "/placeholder.svg?height=400&width=600",
    description: "Icónica heladería conocida como la 'Catedral del Helado' en Cuba.",
    category: "food",
    rating: 4.3,
    popular: true,
    location: "Vedado, La Habana",
  },
  {
    id: "dest5",
    name: "Tropicana",
    image: "/placeholder.svg?height=400&width=600",
    description: "Legendario cabaret al aire libre con espectáculos de música y baile.",
    category: "nightlife",
    rating: 4.7,
    popular: true,
    location: "Marianao, La Habana",
  },
  {
    id: "dest6",
    name: "Museo Nacional de Bellas Artes",
    image: "/placeholder.svg?height=400&width=600",
    description: "Importante museo con una extensa colección de arte cubano e internacional.",
    category: "cultural",
    rating: 4.6,
    popular: true,
    location: "Centro Habana",
  },
  {
    id: "dest7",
    name: "El Malecón",
    image: "/placeholder.svg?height=400&width=600",
    description: "Emblemático paseo marítimo, lugar de encuentro social y cultural.",
    category: "cultural",
    rating: 4.8,
    popular: true,
    location: "La Habana",
  },
  {
    id: "dest8",
    name: "Casa de la Música",
    image: "/placeholder.svg?height=400&width=600",
    description: "Popular venue para disfrutar de música cubana en vivo y bailar salsa.",
    category: "nightlife",
    rating: 4.5,
    popular: true,
    location: "Miramar, La Habana",
  },
  // Add more destinations as needed
]

const reservations: Reservation[] = [
  {
    id: "res1",
    userId: "user1",
    tripId: "trip1",
    seats: 2,
    status: "confirmed",
    createdAt: "2025-05-01T10:00:00Z",
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
    seats: 4,
    status: "pending",
    createdAt: "2025-06-15T14:30:00Z",
    passengerInfo: {
      name: "María González",
      email: "maria@estudiantes.uci.cu",
      phone: "53-5555-5678",
      studentId: "E67890",
    },
  },
  // Add more reservations as needed
]

// Payload object with data handling functions
const payload = {
  async find<T>(collection: string, query?: any): Promise<T[]> {
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
    switch (collection) {
      case "trips":
        return trips as T[]
      case "destinations":
        return destinations as T[]
      case "reservations":
        return reservations as T[]
      default:
        throw new Error(`Collection ${collection} not found`)
    }
  },

  async findOne<T>(collection: string, id: string): Promise<T | null> {
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
    switch (collection) {
      case "trips":
        return (trips.find((trip) => trip.id === id) as T) || null
      case "destinations":
        return (destinations.find((dest) => dest.id === id) as T) || null
      case "reservations":
        return (reservations.find((res) => res.id === id) as T) || null
      default:
        throw new Error(`Collection ${collection} not found`)
    }
  },

  async create<T>(collection: string, data: Partial<T>): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, 700)) // Simulate API delay
    switch (collection) {
      case "reservations":
        const newReservation: Reservation = {
          ...(data as Partial<Reservation>),
          id: `res${reservations.length + 1}`,
          createdAt: new Date().toISOString(),
        } as Reservation
        reservations.push(newReservation)
        return newReservation as T
      default:
        throw new Error(`Creating in collection ${collection} is not supported`)
    }
  },
}

export default payload

