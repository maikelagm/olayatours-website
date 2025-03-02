import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { db } from "@/lib/db"

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  // Rutas para viajes
  getTrips: publicProcedure
    .input(
      z
        .object({
          type: z.string().optional(),
          destinationId: z.string().optional(),
          featured: z.boolean().optional(),
        })
        .optional(),
    )
    .query(({ input }) => {
      if (!input) return db.getTrips()

      if (input.featured) {
        return db.getFeaturedTrips()
      }

      if (input.type) {
        return db.getTripsByType(input.type)
      }

      if (input.destinationId) {
        return db.getTripsByDestination(input.destinationId)
      }

      return db.getTrips()
    }),

  getTripById: publicProcedure.input(z.string()).query(({ input }) => {
    return db.getTripWithDestination(input)
  }),

  // Rutas para destinos
  getDestinations: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          popular: z.boolean().optional(),
        })
        .optional(),
    )
    .query(({ input }) => {
      if (!input) return db.getDestinations()

      if (input.popular) {
        return db.getPopularDestinations()
      }

      if (input.category) {
        return db.getDestinationsByCategory(input.category)
      }

      return db.getDestinations()
    }),

  getDestinationById: publicProcedure.input(z.string()).query(({ input }) => {
    return db.getDestinationById(input)
  }),

  // Rutas para reservaciones
  getReservations: publicProcedure.input(z.string().optional()).query(({ input }) => {
    if (input) {
      return db.getReservationsByUserId(input)
    }
    return db.getReservations()
  }),

  getReservationById: publicProcedure.input(z.string()).query(({ input }) => {
    return db.getReservationById(input)
  }),

  createReservation: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        tripId: z.string(),
        seats: z.number().min(1),
        passengerInfo: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
          studentId: z.string().optional(),
        }),
      }),
    )
    .mutation(({ input }) => {
      return db.createReservation({
        ...input,
        status: "pending",
      })
    }),

  updateReservationStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      }),
    )
    .mutation(({ input }) => {
      return db.updateReservationStatus(input.id, input.status)
    }),
})

export type AppRouter = typeof appRouter

