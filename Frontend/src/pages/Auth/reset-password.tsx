"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, ArrowLeft, Gamepad2, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding & Animation */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 via-red-600 to-red-700 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Security Icons */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20 text-3xl"
              initial={{
                x: Math.random() * 500,
                y: Math.random() * 800,
                scale: 0.5,
              }}
              animate={{
                x: Math.random() * 500,
                y: Math.random() * 800,
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {["🔐", "🛡️", "🔑", "⚡", "🎯", "✨"][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-800/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              className="flex items-center justify-center mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mr-4">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold">Beta Indonesia</h1>
                <p className="text-red-100 text-sm">Budaya & Permainan</p>
              </div>
            </motion.div>

            {/* Security Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Keamanan Akun Terjamin</h2>
              <p className="text-xl text-red-100 leading-relaxed max-w-md">
                Kami akan membantu Anda mengatur ulang password dengan aman dan mudah.
              </p>
            </motion.div>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {[
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Enkripsi Tingkat Tinggi",
                  desc: "Data Anda dilindungi dengan enkripsi 256-bit",
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Link Sementara",
                  desc: "Link reset password berlaku selama 15 menit",
                },
                {
                  icon: <CheckCircle className="h-6 w-6" />,
                  title: "Verifikasi Email",
                  desc: "Konfirmasi melalui email terdaftar",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-red-100 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
            >
              <p className="text-lg font-semibold mb-2">🔒 Akun Anda Aman</p>
              <p className="text-red-100 text-sm">Dipercaya oleh 10,000+ pengguna di seluruh Indonesia</p>
            </motion.div>
          </motion.div>

          <Button
            className="w-60 h-12 bg-white text-red-500 rounded-xl font-semibold text-lg hover:bg-white hover:text-red-500 active:scale-100 shadow-lg transition-all duration-300 transform hover:scale-[1.02] mt-7"
          >
            <a href="/">
              <div className="flex items-center gap-2">
                Kembali ke Beranda
                <ArrowRight className="h-5 w-5" />
              </div>
            </a>
          </Button>

        </div>
      </div>

      {/* Right Panel - Reset Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-3">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Beta Indonesia
              </h1>
              <p className="text-red-400 text-xs">Budaya & Permainan</p>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {!isEmailSent ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
                    <p className="text-gray-600">
                      Masukkan email Anda dan kami akan mengirimkan link untuk mengatur ulang password
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-xl"
                          placeholder="nama@email.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Mengirim Email...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Kirim Link Reset
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Email Terkirim!</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Kami telah mengirimkan link reset password ke <strong>{email}</strong>. Silakan cek email Anda dan
                    ikuti instruksi yang diberikan.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">Penting!</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Link reset password akan kedaluwarsa dalam 15 menit. Jika tidak menerima email, periksa folder
                      spam Anda.
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setIsEmailSent(false)
                      setEmail("")
                    }}
                    variant="outline"
                    className="w-full h-12 border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-xl font-semibold mb-4"
                  >
                    Kirim Ulang Email
                  </Button>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <a
                  href="/login"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke halaman login
                </a>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 p-4 bg-gray-50 rounded-xl"
              >
                <h3 className="font-semibold text-gray-800 mb-2">Butuh bantuan?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Jika Anda mengalami kesulitan, jangan ragu untuk menghubungi tim support kami.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-300 hover:bg-gray-100 bg-transparent"
                    onClick={() => {}}
                  >
                    📧 Email Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-300 hover:bg-gray-100 bg-transparent"
                    onClick={() => {}}
                  >
                    💬 Live Chat
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
