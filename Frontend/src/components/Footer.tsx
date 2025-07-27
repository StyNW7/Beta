import { Gamepad2, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-red-600 via-red-500 to-red-600 text-white">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Beta Indonesia</span>
                <span className="text-xs text-red-100">Budaya & Permainan</span>
              </div>
            </div>
            <p className="text-red-100 text-sm leading-relaxed">
              Platform gamifikasi untuk menjelajahi kekayaan budaya Indonesia melalui permainan edukatif dan komunitas
              yang solid.
            </p>
            <p className="text-red-200 text-sm font-medium">"Bermain, Belajar, Melestarikan Budaya Bersama"</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Navigasi</h3>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#hero" className="text-red-100 hover:text-white transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-red-100 hover:text-white transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-red-100 hover:text-white transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#community" className="text-red-100 hover:text-white transition-colors">
                    Komunitas
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Permainan</h3>
            <nav aria-label="Games Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/games/budaya" className="text-red-100 hover:text-white transition-colors">
                    Kuis Budaya
                  </a>
                </li>
                <li>
                  <a href="/games/sejarah" className="text-red-100 hover:text-white transition-colors">
                    Petualangan Sejarah
                  </a>
                </li>
                <li>
                  <a href="/games/bahasa" className="text-red-100 hover:text-white transition-colors">
                    Bahasa Daerah
                  </a>
                </li>
                <li>
                  <a href="/games/kuliner" className="text-red-100 hover:text-white transition-colors">
                    Kuliner Nusantara
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Kontak</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-200" />
                <span className="text-red-100">info@betaindonesia.id</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-200" />
                <span className="text-red-100">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-200" />
                <span className="text-red-100">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-red-400/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-red-100">© {currentYear} Beta Indonesia. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-red-100 hover:text-white transition-colors">
              Kebijakan Privasi
            </a>
            <a href="/terms" className="text-red-100 hover:text-white transition-colors">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
