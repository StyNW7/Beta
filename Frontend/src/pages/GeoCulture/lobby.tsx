import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Gamepad2,
  Globe,
  Hash,
  Map,
  Play,
  Users,
} from "lucide-react";
import React, { useState } from "react";

interface LobbyProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  onCreateGame: () => void;
  onJoinGame: (gameId: string) => void;
}

const features = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Jelajahi Indonesia",
    description:
      "Tebak lokasi dari gambar-gambar menakjubkan di seluruh 34 provinsi di Indonesia.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Tantang Temanmu",
    description:
      "Buat sesi permainan pribadi dan undang teman-temanmu untuk bersaing secara real-time.",
  },
  {
    icon: <Gamepad2 className="h-8 w-8" />,
    title: "Belajar Sambil Bermain",
    description:
      "Setiap lokasi yang ditebak akan disertai dengan fakta menarik tentang budaya dan sejarahnya.",
  },
];

const Lobby: React.FC<LobbyProps> = ({
  playerName,
  setPlayerName,
  onCreateGame,
  onJoinGame,
}) => {
  const [gameIdToJoin, setGameIdToJoin] = useState<string>("");

  return (
    <div className="flex-1">
      <Navbar />
      <section className="py-20 md:py-32 bg-gradient-to-br from-red-50 via-white to-red-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11%2018.5c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2zm26.4%20-3.4c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2zm-15.4%2025c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2zM22%2081.5c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2zM89%2018.5c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2zm-26.4-3.4c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2zm15.4%2025c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2zM78%2081.5c-1.1%200-2%20.9-2%202s.9%202%202%202%202-.9%202-2-.9-2-2-2z%22%20fill%3D%22%23ef4444%22%20fill-opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 text-sm font-medium">
              <Map className="h-4 w-4 mr-2" />
              Game Tebak Lokasi Budaya
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                GeoCulture
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Seberapa baik Anda mengenal Indonesia? Uji pengetahuan geografis
              dan budaya Anda dalam game yang seru ini!
            </p>
            <div className="mb-6 max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Masukkan nama kamu..."
                className="w-full h-12 text-lg px-4"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              {!playerName && (
                <p className="text-sm text-red-500 mt-2">
                  Sebelum mulai, isi nama kamu terlebih dahulu 😄
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                onClick={onCreateGame}
                disabled={!playerName}
                className="w-full sm:w-auto px-8 py-4 h-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2" />
                Buat Game Baru
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="join-game" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-gray-200">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Punya Kode Game?
                </h2>
                <p className="text-gray-600 mb-6">
                  Masukkan kode yang diberikan oleh temanmu untuk bergabung ke
                  dalam sesi permainannya.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Contoh: AB12CD"
                      className="w-full h-12 pl-10 pr-4 text-lg"
                      value={gameIdToJoin}
                      onChange={(e) =>
                        setGameIdToJoin(e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <Button
                    className="h-12 text-base font-semibold"
                    onClick={() => onJoinGame(gameIdToJoin)}
                    disabled={!gameIdToJoin || !playerName}
                  >
                    Gabung Game
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50"
      >
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
              Fitur Utama GeoCulture
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pengalaman bermain yang dirancang untuk menghibur sekaligus
              mengedukasi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Lobby;
