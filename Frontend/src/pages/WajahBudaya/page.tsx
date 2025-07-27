import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brush, Sparkles, Download, Share2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for gallery
const galleryImages = [
  { src: "https://placehold.co/600x800/ef4444/ffffff?text=Wayang+Kulit+Poster", alt: "Wayang Kulit Poster" },
  { src: "https://placehold.co/600x800/f97316/ffffff?text=Batik+Parang+Art", alt: "Batik Parang Art" },
  { src: "https://placehold.co/600x800/84cc16/ffffff?text=Candi+Borobudur+Silhouette", alt: "Candi Borobudur Silhouette" },
  { src: "https://placehold.co/600x800/3b82f6/ffffff?text=Tari+Kecak+Vibes", alt: "Tari Kecak Vibes" },
];

const styleOptions = ["Wayang", "Batik", "Ukiran", "Modern", "Abstrak", "Fotografi"];

export default function WajahBudayaPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Wayang");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsLoading(true);
    setGeneratedImage("");

    // Simulate AI generation with a timeout
    setTimeout(() => {
      const placeholderText = `${prompt.split(' ').join('+')}+%0A(${selectedStyle}+Style)`;
      setGeneratedImage(`https://placehold.co/600x800/1e293b/ffffff?text=${placeholderText}`);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-red-50 via-white to-red-100">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Powered Creativity
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Wajah Budaya
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Ciptakan poster budaya digital yang unik dan dapat dibagikan dengan kekuatan AI.
              </p>
            </div>
          </div>
        </section>

        {/* Generator Section */}
        <section id="generator" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Input and Controls */}
              <div className="flex flex-col gap-8">
                <Card className="shadow-lg border-gray-200">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">1. Deskripsikan Poster Anda</h2>
                    <p className="text-gray-600 mb-6">Gunakan imajinasi Anda untuk menggambarkan poster budaya. Semakin detail, semakin baik hasilnya.</p>
                    <Textarea
                      placeholder="Contoh: Seorang penari Bali dengan latar belakang pura di senja hari, gaya impresionis..."
                      className="min-h-[120px] text-base"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-gray-200">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">2. Pilih Gaya Artistik</h2>
                    <p className="text-gray-600 mb-6">Pilih gaya visual yang paling sesuai dengan ide Anda.</p>
                    <div className="flex flex-wrap gap-3">
                      {styleOptions.map(style => (
                        <Button
                          key={style}
                          variant={selectedStyle === style ? "default" : "outline"}
                          onClick={() => setSelectedStyle(style)}
                          className={`rounded-full px-5 py-2 transition-all duration-200 ${selectedStyle === style ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-gray-700 border-gray-300'}`}
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                  ) : (
                    <Brush className="h-6 w-6 mr-3" />
                  )}
                  {isLoading ? 'Sedang Menciptakan...' : 'Buat Poster Sekarang'}
                </Button>
              </div>

              {/* Image Display */}
              <div className="sticky top-24">
                <Card className="shadow-2xl border-gray-200 aspect-[3/4] flex items-center justify-center bg-gray-100 overflow-hidden">
                  {isLoading && (
                    <div className="text-center text-gray-500">
                      <Loader2 className="h-12 w-12 mx-auto animate-spin mb-4" />
                      <p className="font-semibold">AI sedang bekerja...</p>
                      <p className="text-sm">Mohon tunggu sebentar.</p>
                    </div>
                  )}
                  {!isLoading && generatedImage && (
                    <img src={generatedImage} alt="Generated cultural poster" className="w-full h-full object-cover" />
                  )}
                  {!isLoading && !generatedImage && (
                    <div className="text-center text-gray-400 p-8">
                      <Brush className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600">Poster Anda Akan Muncul di Sini</h3>
                      <p className="mt-2">Isi deskripsi dan klik tombol buat untuk memulai.</p>
                    </div>
                  )}
                </Card>
                {generatedImage && !isLoading && (
                  <div className="mt-6 flex gap-4">
                    <Button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white"><Download className="h-5 w-5 mr-2" /> Unduh</Button>
                    <Button variant="outline" className="w-full py-3"><Share2 className="h-5 w-5 mr-2" /> Bagikan</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
                Galeri Inspirasi
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Lihat beberapa karya poster menakjubkan yang dibuat oleh komunitas kami.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-300" />
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
