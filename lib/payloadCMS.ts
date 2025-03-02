// Simulated types for PayloadCMS data
export interface Trip {
  id: string
  name: string
  description: string
  departureTime: string
  returnTime?: string
  price: number
  totalSeats: number
  availableSeats: number
  type: "daily" | "nightlife" | "weekend" | "special"
  destinationId: string
  pickupPoints: {
    id: string
    name: string
    time: string
  }[]
  images: string[]
  featured: boolean
}

export interface Destination {
  id: string
  name: string
  image: string
  description: string
  category: "entertainment" | "beach" | "cultural" | "nightlife" | "nature"
  rating: number
  popular: boolean
}

export interface Reservation {
  id: string
  userId: string
  tripId: string
  seats: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  passengerInfo: {
    name: string
    email: string
    phone: string
    studentId?: string
  }
}

// Simulated PayloadCMS data
const trips: Trip[] = [
  // ... (copy the trips data from the previous db.ts file)
]

const destinations: Destination[] = [
  // ... (copy the destinations data from the previous db.ts file)
]

const reservations: Reservation[] = [
  // ... (copy the reservations data from the previous db.ts file)
]

// Simulated PayloadCMS API functions
export const payloadCMS = {
  getTrips: async (): Promise<Trip[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return trips
  },

  getTripById: async (id: string): Promise<Trip | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return trips.find((trip) => trip.id === id) || null
  },

  getDestinations: async (): Promise<Destination[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return destinations
  },

  getDestinationById: async (id: string): Promise<Destination | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return destinations.find((dest) => dest.id === id) || null
  },

  getReservations: async (userId: string): Promise<Reservation[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return reservations.filter((res) => res.userId === userId)
  },

  createReservation: async (data: Omit<Reservation, "id" | "createdAt">): Promise<Reservation> => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    const newReservation: Reservation = {
      ...data,
      id: `res${reservations.length + 1}`,
      createdAt: new Date().toISOString(),
    }
    reservations.push(newReservation)
    return newReservation
  },
}

