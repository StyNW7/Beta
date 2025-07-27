import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Trophy, BookOpen, Brush, Orbit } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router";

const features = [
  {
    title: "GeoCulture",
    description: "Gameplay inti yang menampilkan permainan menebak lokasi budaya.",
    icon: <Map className="h-10 w-10" />,
    color: "from-blue-500 to-blue-600",
    badge: "Quiz",
    route: "/geoculture"
  },
  {
    title: "Eksplorasi 3D",
    description: "Jelajahi titik-titik menarik dengan deskripsi detail.",
    icon: <Orbit className="h-10 w-10" />,
    color: "from-indigo-500 to-indigo-600",
    badge: "3D",
    route: "/explore"
  },
  {
    title: "Papan Peringkat & Gamifikasi",
    description: "Sistem poin, papan peringkat, pencapaian, dan lencana penghargaan.",
    icon: <Trophy className="h-10 w-10" />,
    color: "from-yellow-500 to-yellow-600",
    badge: "Gamifikasi",
    route: "/leaderboard"
  },
  {
    title: "Konten Edukasi",
    description: "Kuis lanjutan, fakta sejarah, dan deskripsi budaya.",
    icon: <BookOpen className="h-10 w-10" />,
    color: "from-green-500 to-green-600",
    badge: "Belajar",
    route: "/education"
  },
  {
    title: "Wajah Budaya",
    description: "Fitur berbasis AI untuk menghasilkan poster budaya digital yang bisa dibagikan.",
    icon: <Brush className="h-10 w-10" />,
    color: "from-purple-500 to-purple-600",
    badge: "Fitur AI",
    route: "/wajah-budaya"
  },
];

export default function NavigationPage() {
    const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-br from-red-50 via-white to-red-100">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                        Jelajahi Fitur Kami
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Temukan pengalaman yang membuat Beta Indonesia unik.
                    </p>
                </div>
            </div>
        </section>

        <section id="features-grid" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
                  onClick={() => navigate(feature.route)}
                >
                  <div className={`w-full h-2 bg-gradient-to-r ${feature.color}`} />
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <Badge className="mb-4 bg-red-100 text-red-600 px-3 py-1">{feature.badge}</Badge>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
