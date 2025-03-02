import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Bus, Calendar, Music, Utensils, Umbrella } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { TestimonialSection } from "@/components/testimonial-section"

export default function Home() {
  return (
    <div>
      <HeroSection />

      <div className="container mx-auto py-16 px-4">
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos transporte confiable y económico para estudiantes de la UCI a los mejores lugares de La Habana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-primary" /> Transporte Universitario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Servicio de transporte diario desde la UCI hacia diferentes puntos de La Habana con horarios
                  flexibles.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" /> Salidas Nocturnas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Transporte a los mejores clubes, bares y eventos nocturnos con recogida garantizada al finalizar.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Umbrella className="h-5 w-5 text-primary" /> Excursiones de Fin de Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Viajes a playas, sitios turísticos y lugares de interés cultural durante los fines de semana.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Destinos Populares</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre los lugares más visitados por nuestros estudiantes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Playas del Este",
                image: "/placeholder.svg?height=200&width=400",
                description: "Disfruta de las hermosas playas a pocos kilómetros de la ciudad",
              },
              {
                name: "La Habana Vieja",
                image: "/placeholder.svg?height=200&width=400",
                description: "Recorre las calles históricas y plazas coloniales",
              },
              {
                name: "Fábrica de Arte Cubano",
                image: "/placeholder.svg?height=200&width=400",
                description: "El centro cultural más innovador de La Habana",
              },
              {
                name: "Malecón Habanero",
                image: "/placeholder.svg?height=200&width=400",
                description: "El paseo marítimo más emblemático de Cuba",
              },
              {
                name: "Viñales",
                image: "/placeholder.svg?height=200&width=400",
                description: "Excursiones de fin de semana al valle más hermoso de Cuba",
              },
              {
                name: "Varadero",
                image: "/placeholder.svg?height=200&width=400",
                description: "La playa más famosa de Cuba, perfecta para un fin de semana",
              },
            ].map((destination, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{destination.name}</CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/viajes?destino=${encodeURIComponent(destination.name)}`}>Ver viajes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-primary/5 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Por qué elegir OlayaTours?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <Bus className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Transporte Seguro</h3>
                      <p className="text-muted-foreground">
                        Vehículos modernos y conductores profesionales para tu seguridad.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Horarios Flexibles</h3>
                      <p className="text-muted-foreground">
                        Adaptados a las necesidades de los estudiantes universitarios.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-1">
                      <Utensils className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Precios Especiales</h3>
                      <p className="text-muted-foreground">Tarifas reducidas para estudiantes de la UCI.</p>
                    </div>
                  </li>
                </ul>
                <Button asChild className="mt-6">
                  <Link href="/viajes">
                    Ver todos los viajes <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Estudiantes disfrutando del servicio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <TestimonialSection />

        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">¿Listo para viajar?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Reserva tu próximo viaje con OlayaTours y disfruta de La Habana como nunca antes
            </p>
            <Button asChild size="lg">
              <Link href="/reservar">Reservar ahora</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

