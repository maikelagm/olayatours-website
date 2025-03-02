"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Sun, Umbrella, Star } from "lucide-react"

export function TripFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get("tipo") || "todos"

  const handleTypeChange = (value: string) => {
    if (value === "todos") {
      router.push("/viajes")
    } else {
      router.push(`/viajes?tipo=${value}`)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Tipo de viaje</h3>
            <Tabs defaultValue={currentType} onValueChange={handleTypeChange}>
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
                <TabsTrigger value="todos" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden md:inline">Todos</span>
                </TabsTrigger>
                <TabsTrigger value="diario" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span className="hidden md:inline">Diario</span>
                </TabsTrigger>
                <TabsTrigger value="nocturno" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span className="hidden md:inline">Nocturno</span>
                </TabsTrigger>
                <TabsTrigger value="finde" className="flex items-center gap-2">
                  <Umbrella className="h-4 w-4" />
                  <span className="hidden md:inline">Fin de semana</span>
                </TabsTrigger>
                <TabsTrigger value="especial" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden md:inline">Especial</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

