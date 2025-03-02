import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary-foreground border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">OlayaTours</h3>
            <p className="text-sm text-muted-foreground">
              Servicios de transporte para estudiantes universitarios en La Habana, Cuba.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/viajes" className="text-sm text-muted-foreground hover:text-primary">
                  Viajes
                </Link>
              </li>
              <li>
                <Link href="/destinos" className="text-sm text-muted-foreground hover:text-primary">
                  Destinos
                </Link>
              </li>
              <li>
                <Link href="/precios" className="text-sm text-muted-foreground hover:text-primary">
                  Precios
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/viajes?tipo=diario" className="text-sm text-muted-foreground hover:text-primary">
                  Transporte Diario
                </Link>
              </li>
              <li>
                <Link href="/viajes?tipo=nocturno" className="text-sm text-muted-foreground hover:text-primary">
                  Salidas Nocturnas
                </Link>
              </li>
              <li>
                <Link href="/viajes?tipo=finde" className="text-sm text-muted-foreground hover:text-primary">
                  Excursiones de Fin de Semana
                </Link>
              </li>
              <li>
                <Link href="/viajes?tipo=especial" className="text-sm text-muted-foreground hover:text-primary">
                  Eventos Especiales
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Carretera a San Antonio de los Baños, Km 2½, La Habana, Cuba
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-sm text-muted-foreground">+53 5555-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span className="text-sm text-muted-foreground">info@olayatours.cu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OlayaTours. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

