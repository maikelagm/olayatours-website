import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    role: "Estudiante de 3er año",
    content:
      "OlayaTours ha hecho que mis salidas nocturnas sean mucho más fáciles. Ya no tengo que preocuparme por cómo regresar a la UCI después de una noche en La Habana.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: 2,
    name: "María González",
    role: "Estudiante de 2do año",
    content:
      "Las excursiones de fin de semana a Varadero son increíbles. El precio es muy accesible y el servicio es excelente. ¡Totalmente recomendado!",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: 3,
    name: "Alejandro Pérez",
    role: "Estudiante de 4to año",
    content:
      "Uso OlayaTours cada semana para ir al Malecón y a la Fábrica de Arte. Los conductores son muy amables y siempre llegan a tiempo.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
  },
]

export function TestimonialSection() {
  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros estudiantes</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubre por qué los estudiantes de la UCI confían en OlayaTours para sus traslados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <p className="text-sm mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

