"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Apa itu Beta Indonesia?",
      answer:
        "Beta Indonesia adalah platform gamifikasi yang menggabungkan permainan edukatif dengan pembelajaran budaya Indonesia. Kami menyediakan berbagai mini-games, kuis interaktif, dan konten edukatif untuk membantu melestarikan budaya Nusantara.",
    },
    {
      question: "Apakah Beta Indonesia gratis untuk digunakan?",
      answer:
        "Ya! Beta Indonesia dapat diakses secara gratis. Kami menyediakan berbagai konten dan permainan tanpa biaya. Namun, kami juga memiliki fitur premium dengan konten eksklusif dan benefit tambahan untuk mendukung pengembangan platform.",
    },
    {
      question: "Siapa saja yang bisa bergabung dengan Beta Indonesia?",
      answer:
        "Beta Indonesia terbuka untuk semua kalangan - mulai dari anak-anak, remaja, dewasa, hingga lansia. Platform kami dirancang dengan berbagai tingkat kesulitan yang dapat disesuaikan dengan usia dan kemampuan pengguna.",
    },
    {
      question: "Bagaimana cara bergabung dengan komunitas Beta Indonesia?",
      answer:
        "Sangat mudah! Cukup daftar akun gratis di platform kami, lengkapi profil, dan Anda sudah bisa mulai bermain serta berinteraksi dengan komunitas. Anda juga bisa bergabung dengan grup diskusi dan event komunitas yang rutin diadakan.",
    },
    {
      question: "Apa saja jenis permainan yang tersedia?",
      answer:
        "Kami menyediakan berbagai jenis permainan seperti kuis budaya, teka-teki sejarah, permainan bahasa daerah, eksplorasi kuliner Nusantara, dan masih banyak lagi. Setiap permainan dirancang untuk memberikan pengalaman belajar yang menyenangkan.",
    },
    {
      question: "Apakah ada sistem reward atau pencapaian?",
      answer:
        "Tentu saja! Beta Indonesia memiliki sistem poin, badge, dan leaderboard. Anda bisa mengumpulkan poin dari setiap permainan, mendapatkan badge khusus untuk pencapaian tertentu, dan bersaing dengan pemain lain di papan peringkat.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-white via-red-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang Beta Indonesia
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-red-50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5 text-red-500 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
