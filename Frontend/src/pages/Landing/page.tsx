import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Users, Trophy, BookOpen, Heart, Star, Play, Award, Globe, Zap, Target, Sparkles } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroBackground from "@/components/landing/hero-background"
import MarqueeSection from "@/components/landing/marquee-section"
import FAQSection from "@/components/landing/faq-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-100"
      >
        <HeroBackground />
        <div className="container px-4 md:px-6 py-20 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 text-sm font-medium">
              🎮 Platform Gamifikasi Budaya Indonesia
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                Beta Indonesia
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium">
              Bermain, Belajar, Melestarikan Budaya Bersama
            </p>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
              Jelajahi kekayaan budaya Nusantara melalui permainan edukatif yang seru dan interaktif. Bergabunglah
              dengan komunitas untuk melestarikan warisan budaya Indonesia.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button className="px-8 py-4 h-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Play className="h-5 w-5 mr-2" />
                Mulai Petualangan
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 h-auto border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-full text-lg font-semibold bg-transparent"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">10K+</h3>
                <p className="text-gray-600">Anggota Komunitas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">50+</h3>
                <p className="text-gray-600">Mini Games</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">34</h3>
                <p className="text-gray-600">Provinsi Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-red-100 text-red-600 px-4 py-2">Tentang Beta Indonesia</Badge>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
                Melestarikan Budaya Melalui Teknologi
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Beta Indonesia hadir sebagai solusi inovatif untuk melestarikan kekayaan budaya Nusantara. Kami percaya
                bahwa pembelajaran budaya akan lebih efektif dan menyenangkan ketika dikemas dalam bentuk permainan
                interaktif.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Misi Pelestarian</h3>
                    <p className="text-gray-600">Melestarikan warisan budaya Indonesia untuk generasi mendatang</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Pembelajaran Interaktif</h3>
                    <p className="text-gray-600">Metode belajar yang menyenangkan melalui gamifikasi</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Komunitas Solid</h3>
                    <p className="text-gray-600">Membangun komunitas pecinta budaya Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Trophy className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="font-bold text-gray-800 mb-2">Pencapaian</h3>
                      <p className="text-sm text-gray-600">Sistem reward yang memotivasi</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <BookOpen className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="font-bold text-gray-800 mb-2">Edukasi</h3>
                      <p className="text-sm text-gray-600">Konten pembelajaran berkualitas</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Gamepad2 className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="font-bold text-gray-800 mb-2">Permainan</h3>
                      <p className="text-sm text-gray-600">Mini games yang seru</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Globe className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="font-bold text-gray-800 mb-2">Budaya</h3>
                      <p className="text-sm text-gray-600">Kekayaan Nusantara</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Beta Indonesia Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-red-100 text-red-600 px-4 py-2">Mengapa Beta Indonesia?</Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
              Keunggulan Platform Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Temukan alasan mengapa Beta Indonesia menjadi pilihan terbaik untuk mempelajari budaya Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Gamifikasi Menarik",
                description:
                  "Sistem poin, badge, dan leaderboard yang membuat pembelajaran jadi lebih seru dan kompetitif",
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Konten Berkualitas",
                description: "Materi pembelajaran yang telah dikurasi oleh ahli budaya dan sejarah Indonesia",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Komunitas Aktif",
                description: "Bergabung dengan ribuan anggota komunitas yang memiliki passion yang sama",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Pembelajaran Terarah",
                description: "Kurikulum yang terstruktur dari tingkat dasar hingga mahir",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Sertifikat Digital",
                description: "Dapatkan sertifikat digital untuk setiap pencapaian yang berhasil diraih",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Akses Gratis",
                description: "Platform dapat diakses secara gratis dengan konten premium yang terjangkau",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-red-100 text-red-600 px-4 py-2">Cara Kerja</Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
              Mudah Dimulai dalam 3 Langkah
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bergabung dengan Beta Indonesia sangat mudah dan dapat dilakukan dalam hitungan menit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Daftar Akun",
                description:
                  "Buat akun gratis dengan email atau media sosial. Proses pendaftaran hanya membutuhkan waktu kurang dari 2 menit.",
                icon: <Users className="h-12 w-12" />,
              },
              {
                step: "02",
                title: "Pilih Permainan",
                description:
                  "Jelajahi berbagai kategori permainan budaya yang tersedia. Mulai dari yang mudah hingga tingkat expert.",
                icon: <Gamepad2 className="h-12 w-12" />,
              },
              {
                step: "03",
                title: "Mulai Belajar",
                description:
                  "Mainkan games, kumpulkan poin, raih achievement, dan bergabung dengan komunitas untuk berbagi pengalaman.",
                icon: <Trophy className="h-12 w-12" />,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl text-white">
                      {item.icon}
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-red-100">
                      <span className="text-red-600 font-bold text-lg">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-red-300 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-red-100 text-red-600 px-4 py-2">Fitur Unggulan</Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
              Fitur-Fitur Menarik
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jelajahi berbagai fitur canggih yang membuat pengalaman belajar budaya Indonesia jadi lebih seru
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Kuis Budaya",
                description: "Uji pengetahuan budaya Indonesia dengan ribuan soal menarik",
                icon: "🧠",
                color: "from-red-500 to-red-600",
              },
              {
                title: "Petualangan Sejarah",
                description: "Jelajahi timeline sejarah Indonesia melalui game interaktif",
                icon: "🏛️",
                color: "from-red-400 to-red-500",
              },
              {
                title: "Bahasa Daerah",
                description: "Pelajari berbagai bahasa daerah dari seluruh Nusantara",
                icon: "🗣️",
                color: "from-red-600 to-red-700",
              },
              {
                title: "Kuliner Nusantara",
                description: "Kenali makanan khas dari berbagai daerah di Indonesia",
                icon: "🍜",
                color: "from-red-500 to-red-600",
              },
              {
                title: "Tarian Tradisional",
                description: "Belajar gerakan dan makna tarian tradisional Indonesia",
                icon: "💃",
                color: "from-red-400 to-red-500",
              },
              {
                title: "Musik Nusantara",
                description: "Dengarkan dan pelajari alat musik tradisional Indonesia",
                icon: "🎵",
                color: "from-red-600 to-red-700",
              },
              {
                title: "Cerita Rakyat",
                description: "Nikmati cerita rakyat dari berbagai daerah dengan animasi",
                icon: "📚",
                color: "from-red-500 to-red-600",
              },
              {
                title: "Virtual Tour",
                description: "Kunjungi tempat bersejarah dan wisata budaya secara virtual",
                icon: "🗺️",
                color: "from-red-400 to-red-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <MarqueeSection />

      {/* Testimony Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-red-100 text-red-600 px-4 py-2">Testimoni</Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
              Apa Kata Mereka?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan pengalaman pengguna Beta Indonesia dari berbagai kalangan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sari Dewi",
                role: "Guru SD",
                location: "Jakarta",
                avatar: "👩‍🏫",
                rating: 5,
                testimony:
                  "Beta Indonesia sangat membantu saya dalam mengajarkan budaya Indonesia kepada murid-murid. Kontennya menarik dan mudah dipahami anak-anak.",
              },
              {
                name: "Ahmad Rizki",
                role: "Mahasiswa",
                location: "Yogyakarta",
                avatar: "👨‍🎓",
                rating: 5,
                testimony:
                  "Platform yang luar biasa! Saya jadi lebih mengenal budaya daerah lain di Indonesia. Sistemnya gamifikasi bikin belajar jadi tidak membosankan.",
              },
              {
                name: "Ibu Ratna",
                role: "Ibu Rumah Tangga",
                location: "Surabaya",
                avatar: "👩‍💼",
                rating: 5,
                testimony:
                  "Anak saya sangat suka bermain di Beta Indonesia. Dia jadi lebih tahu tentang budaya Indonesia sambil bermain. Terima kasih Beta Indonesia!",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white to-red-50 border-red-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-2xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-red-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.testimony}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Community and CTA Section */}
      <section
        id="community"
        className="py-20 bg-gradient-to-br from-red-500 via-red-600 to-red-500 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-white/20 text-white px-4 py-2 backdrop-blur-sm">Bergabung dengan Komunitas</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Siap Memulai Petualangan Budaya?</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-12">
              Bergabunglah dengan ribuan anggota komunitas Beta Indonesia dan mulai jelajahi kekayaan budaya Nusantara
              hari ini juga!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Komunitas Aktif</h3>
              <p className="text-red-100">
                Bergabung dengan 10,000+ anggota komunitas yang passionate tentang budaya Indonesia
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Kompetisi Seru</h3>
              <p className="text-red-100">Ikuti berbagai kompetisi dan event menarik dengan hadiah yang menggiurkan</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Konten Eksklusif</h3>
              <p className="text-red-100">
                Akses konten premium dan materi pembelajaran yang tidak tersedia di tempat lain
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="px-8 py-4 h-auto bg-white text-red-600 hover:bg-red-50 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Play className="h-5 w-5 mr-2" />
                Daftar Sekarang Gratis
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 h-auto border-2 border-white text-white hover:bg-white hover:text-red-600 rounded-full text-lg font-semibold bg-transparent"
              >
                <Users className="h-5 w-5 mr-2" />
                Gabung Komunitas
              </Button>
            </div>
            <p className="text-red-100 mt-6 text-sm">
              Gratis selamanya • Tanpa iklan mengganggu • Komunitas yang supportif
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
