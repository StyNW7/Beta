import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, BookOpen, Users, Brush, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const leaderboardData = [
  { rank: 1, name: "Sari Dewi", points: 15000, avatar: "👩‍🏫" },
  { rank: 2, name: "Ahmad Rizki", points: 13500, avatar: "👨‍🎓" },
  { rank: 3, name: "Budi Santoso", points: 12800, avatar: "👨‍💻" },
  { rank: 4, name: "Citra Lestari", points: 11000, avatar: "👩‍🎨" },
  { rank: 5, name: "Eko Prasetyo", points: 10500, avatar: "👨‍🚀" },
  { rank: 6, name: "Fitriani", points: 9800, avatar: "👩‍🔬" },
  { rank: 7, name: "Gilang Maulana", points: 9200, avatar: "👨‍🔧" },
  { rank: 8, name: "Hana Pertiwi", points: 8500, avatar: "👩‍⚖️" },
  { rank: 9, name: "Indra Wijaya", points: 8100, avatar: "👨‍💼" },
  { rank: 10, name: "Jasmine Putri", points: 7800, avatar: "🧕" },
];

const achievements = [
    { title: "Penjelajah Budaya", description: "Kunjungi 10 situs budaya yang berbeda.", icon: <Star className="h-8 w-8 text-yellow-500" />, color: "from-yellow-400 to-yellow-500" },
    { title: "Penggemar Sejarah", description: "Selesaikan semua kuis sejarah.", icon: <BookOpen className="h-8 w-8 text-green-500" />, color: "from-green-400 to-green-500" },
    { title: "Ahli GeoBudaya", description: "Raih skor sempurna dalam GeoBudaya.", icon: <Map className="h-8 w-8 text-blue-500" />, color: "from-blue-400 to-blue-500" },
    { title: "Pilar Komunitas", description: "Berikan kontribusi 5 fakta budaya.", icon: <Users className="h-8 w-8 text-purple-500" />, color: "from-purple-400 to-purple-500" },
    { title: "Peringkat Teratas", description: "Capai 10 besar di papan peringkat.", icon: <Trophy className="h-8 w-8 text-red-500" />, color: "from-red-400 to-red-500" },
    { title: "Seniman Wajah Budaya", description: "Buat 5 poster AI.", icon: <Brush className="h-8 w-8 text-indigo-500" />, color: "from-indigo-400 to-indigo-500" },
];



export default function LeaderboardPage() {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-400 text-yellow-900";
    if (rank === 2) return "bg-gray-300 text-gray-800";
    if (rank === 3) return "bg-yellow-600 text-yellow-100";
    return "bg-gray-100 text-gray-800";
  };
  
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-500" />;
    if (rank === 3) return <Trophy className="h-5 w-5 text-yellow-700" />;
    return rank;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-red-50 via-white to-red-100">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                        Hall of Fame
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Lihat siapa yang memimpin upaya melestarikan budaya Indonesia.
                    </p>
                </div>
            </div>
        </section>

        {/* Leaderboard Section */}
        <section id="leaderboard" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-2xl border-gray-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-4 font-semibold text-gray-600">Rank</th>
                          <th className="p-4 font-semibold text-gray-600">Player</th>
                          <th className="p-4 font-semibold text-gray-600 text-right">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.map((player, index) => (
                          <tr key={index} className={`border-t border-gray-200 ${player.rank <= 3 ? 'font-bold' : ''} ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="p-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankColor(player.rank)}`}>
                                {getRankIcon(player.rank)}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                                  {player.avatar}
                                </div>
                                <span>{player.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-right text-red-600 font-semibold">{player.points.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Achievements Section */}
        <section id="achievements" className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
                        Achievements
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Kumpulkan badge dan tunjukkan dedikasi kamu terhadap budaya Indonesia.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {achievements.map((achievement, index) => (
                        <Card key={index} className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                            <CardContent className="p-6 flex items-center gap-6">
                                <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {achievement.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">{achievement.title}</h3>
                                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                                </div>
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
