import mongoose from "mongoose";
import Landmark from "../models/landmark.model.js";
import dotenv from "dotenv";
import { Question } from "../models/question.model.js";

dotenv.config();

const landmarks = [
  {
    name: "Tugu Jogja",
    description:
      "Tugu Jogja adalah sebuah landmark ikonik di Yogyakarta, Indonesia. Awalnya disebut Tugu Golong Gilig, tugu ini dibangun oleh Sri Sultan Hamengkubuwono I pada tahun 1755 dan melambangkan persatuan antara rakyat dan rajanya.",
    image: "/Images/landmarks/tugu-jogja.webp",
    yearBuilt: 1755,
    city: "Yogyakarta",
    position: { x: 1, y: 0, z: 2 },
  },
  {
    name: "Kompleks Candi Prambanan",
    description:
      "Prambanan adalah kompleks candi Hindu dari abad ke-9 di Jawa Tengah, Indonesia, yang didedikasikan untuk Trimūrti, perwujudan Tuhan sebagai Pencipta (Brahma), Pemelihara (Wisnu), dan Penghancur (Siwa).",
    image: "/Images/landmarks/prambanan.jpg",
    yearBuilt: 850,
    city: "Sleman",
    position: { x: 5, y: 0, z: 5 },
  },
  {
    name: "Candi Borobudur",
    description:
      "Candi Buddha terbesar di dunia, Borobudur adalah candi Buddha Mahayana dari abad ke-9 yang terletak di Magelang, Jawa Tengah, Indonesia. Candi ini terdiri dari sembilan tingkat bertumpuk, enam berbentuk persegi dan tiga berbentuk lingkaran, serta sebuah kubah utama di puncaknya.",
    image: "/Images/landmarks/candi-borobudur.jpg",
    yearBuilt: 825,
    city: "Magelang",
    position: { x: -5, y: 0, z: 4 },
  },
  {
    name: "Keraton Yogyakarta",
    description:
      "Keraton adalah istana resmi Sultan Yogyakarta dan pusat budaya Jawa. Dibangun pada tahun 1755, istana ini masih menjadi kediaman kerajaan aktif serta pusat seni musik, tari, dan kerajinan tradisional.",
    image: "/Images/landmarks/keraton.webp",
    yearBuilt: 1755,
    city: "Yogyakarta",
    position: { x: 6, y: 0, z: 1 },
  },
  {
    name: "Taman Mini Indonesia Indah (TMII)",
    description:
      "Sebuah taman budaya di Jakarta Timur yang menampilkan budaya, arsitektur, dan tradisi dari seluruh provinsi di Indonesia dalam format miniatur. TMII diresmikan pada tahun 1975.",
    image: "/Images/landmarks/tmii.jpeg",
    yearBuilt: 1975,
    city: "Jakarta",
    position: { x: 12, y: 0, z: 5 },
  },
  {
    name: "Desa Wae Rebo",
    description:
      "Wae Rebo adalah desa tradisional suku Manggarai di Flores, Nusa Tenggara Timur. Dikenal karena rumah adat Mbaru Niang yang unik dan adat istiadat yang terjaga, desa ini menawarkan gambaran warisan budaya Indonesia kuno.",
    image: "/Images/landmarks/wae-rebo.jpg",
    yearBuilt: 1800,
    city: "Flores",
    position: { x: 5, y: 0, z: 12 },
  },
  {
    name: "Tana Toraja",
    description:
      "Tana Toraja di Sulawesi Selatan dikenal dengan upacara pemakaman yang rumit, makam tebing, dan rumah adat Tongkonan yang berbentuk perahu.",
    image: "/Images/landmarks/tana-toraja.jpg",
    yearBuilt: 1800,
    city: "Tana Toraja",
    position: { x: -5, y: 0, z: 12 },
  },
];

const questions = [
  {
    imageSrc: "/Images/quizz/jam-gadang.png",
    hint: "Menara jam ikonik ini terletak di jantung kota besar Sumatera",
    correctAnswer: "Padang/Bukittinggi",
    description:
      "Ini adalah Jam Gadang yang terkenal di Bukittinggi, dekat Padang, Sumatera Barat.",
    coordinates: { lat: -0.3049, lng: 100.3694 },
  },
  {
    imageSrc: "/Images/quizz/tanah-lot.png",
    hint: "Pura Hindu yang indah ini berada di atas formasi batu di tepi laut",
    correctAnswer: "Bali",
    description:
      "Ini adalah Pura Tanah Lot, salah satu landmark paling ikonik di Bali.",
    coordinates: { lat: -8.6211, lng: 115.0868 },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding");

    // Optional: Clear existing data
    // await Landmark.deleteMany({});

    // Insert seed data
    // await Landmark.insertMany(landmarks);
    await Question.insertMany(questions);

    console.log("Data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
  }
}

seed();
