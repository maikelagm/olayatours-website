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
  destinations: string[]
  pickupPoints: {
    id: string
    name: string
    time: string
  }[]
  images: string[]
  featured: boolean
  destination?: Destination
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
  activities: string[]
}

