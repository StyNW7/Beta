"use client"

import { motion } from "framer-motion"

export default function MarqueeSection() {
  const culturalItems = [
    "🏛️ Candi Borobudur",
    "🎭 Wayang Kulit",
    "🥘 Rendang Padang",
    "🏝️ Raja Ampat",
    "🎨 Batik Jogja",
    "🏔️ Gunung Bromo",
    "🎪 Tari Kecak",
    "🍜 Gudeg Yogya",
    "🏛️ Istana Maimun",
    "🎵 Angklung Sunda",
    "🌺 Bunga Melati",
    "🏖️ Pantai Kuta",
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 via-white to-red-50 overflow-hidden">
      <div className="container px-4 md:px-6 mb-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
            Jelajahi Kekayaan Budaya Indonesia
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dari Sabang sampai Merauke, temukan keindahan dan keunikan budaya Nusantara
          </p>
        </div>
      </div>

      <div className="relative">
        {/* First marquee - moving right */}
        <motion.div
          className="flex gap-8 mb-6"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[...culturalItems, ...culturalItems].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-2xl px-6 py-4 shadow-lg border border-red-100 hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-lg font-medium text-gray-800 whitespace-nowrap">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Second marquee - moving left */}
        <motion.div
          className="flex gap-8"
          animate={{
            x: [-1000, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[...culturalItems.slice().reverse(), ...culturalItems.slice().reverse()].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-lg font-medium text-white whitespace-nowrap">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
