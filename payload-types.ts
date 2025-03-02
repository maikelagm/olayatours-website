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
  destinations: string[] // IDs de los destinos
  pickupPoints: PickupPoint[]
  images: string[]
  featured: boolean
}

export interface Destination {
  id: string
  name: string
  image: string
  description: string
  category: "entertainment" | "beach" | "cultural" | "nightlife" | "nature" | "food"
  rating: number
  popular: boolean
  location: string
}

export interface Reservation {
  id: string
  userId: string
  tripId: string
  seats: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  passengerInfo: PassengerInfo
}

export interface PickupPoint {
  id: string
  name: string
  time: string
}

export interface PassengerInfo {
  name: string
  email: string
  phone: string
  studentId?: string
}

