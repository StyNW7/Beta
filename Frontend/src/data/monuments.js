import * as THREE from 'three';

export const monuments = [
  {
    id: 'tugu_main',
    interactive: true,
    name: 'Monas',
    position: new THREE.Vector3(1, 0, 2),
    recipe: {
      name: 'Keris',
      image: '/Images/Item/keris_recipe.png',
    },
    info: {
      image: '/Images/monas.jpg',
      description: "A historic monument representing the spirit of the nation. It is said that ancient recipes can be discovered by those who show respect.",
      yearBuilt: "1961",
      location: "Central Jakarta, Indonesia",
    }
  },
  {
    id: 'deco_1',
    interactive: false,
    position: new THREE.Vector3(20, 0, 5),
  },
  {
    id: 'deco_2',
    interactive: false,
    position: new THREE.Vector3(-10, 0, 20),
  },
  {
    id: 'deco_3',
    interactive: false,
    position: new THREE.Vector3(-20, 0, -20),
  },
  {
    id: 'deco_4',
    interactive: false,
    position: new THREE.Vector3(15, 0, -15),
  }
];

export const landmarkDetails = {
  "tugu-center": {
    title: "Tugu Jogja",
    description: "Tugu Jogja adalah sebuah landmark ikonik di Yogyakarta, Indonesia. Awalnya disebut Tugu Golong Gilig, tugu ini dibangun oleh Sri Sultan Hamengkubuwono I pada tahun 1755 dan melambangkan persatuan antara rakyat dan rajanya.",
    imageUrl: "/Images/landmarks/tugu-jogja.webp",
    year: 1755,
    place: "Yogyakarta"
  },
  "tugu-east": {
    title: "Kompleks Candi Prambanan",
    description: "Prambanan adalah kompleks candi Hindu dari abad ke-9 di Jawa Tengah, Indonesia, yang didedikasikan untuk Trimūrti, perwujudan Tuhan sebagai Pencipta (Brahma), Pemelihara (Wisnu), dan Penghancur (Siwa).",
    imageUrl: "/Images/landmarks/prambanan.jpg",
    year: 850,
    place: "Sleman"
  },
  "tugu-west": {
    title: "Candi Borobudur",
    description: "Candi Buddha terbesar di dunia, Borobudur adalah candi Buddha Mahayana dari abad ke-9 yang terletak di Magelang, Jawa Tengah, Indonesia. Candi ini terdiri dari sembilan tingkat bertumpuk, enam berbentuk persegi dan tiga berbentuk lingkaran, serta sebuah kubah utama di puncaknya.",
    year: 825,
    place: "Magelang"
  },
  "tugu-north": {
    title: "Keraton Yogyakarta",
    description: "Keraton adalah istana resmi Sultan Yogyakarta dan pusat budaya Jawa. Dibangun pada tahun 1755, istana ini masih menjadi kediaman kerajaan aktif serta pusat seni musik, tari, dan kerajinan tradisional.",
    imageUrl: "/Images/landmarks/keraton.webp",
    year: 1755,
    place: "Yogyakarta"
  },
  "tugu-far-east": {
    title: "Taman Mini Indonesia Indah (TMII)",
    description: "Sebuah taman budaya di Jakarta Timur yang menampilkan budaya, arsitektur, dan tradisi dari seluruh provinsi di Indonesia dalam format miniatur. TMII diresmikan pada tahun 1975.",
    imageUrl: "/Images/landmarks/tmii.jpeg",
    year: 1975,
    place: "Jakarta"
  },
  "tugu-south": {
    title: "Desa Wae Rebo",
    description: "Wae Rebo adalah desa tradisional suku Manggarai di Flores, Nusa Tenggara Timur. Dikenal karena rumah adat Mbaru Niang yang unik dan adat istiadat yang terjaga, desa ini menawarkan gambaran warisan budaya Indonesia kuno.",
    imageUrl: "/Images/landmarks/wae-rebo.jpg",
    year: 1800,
    place: "Flores"
  },
  "tugu-south-west": {
    title: "Tana Toraja",
    description: "Tana Toraja di Sulawesi Selatan dikenal dengan upacara pemakaman yang rumit, makam tebing, dan rumah adat Tongkonan yang berbentuk perahu.",
    imageUrl: "/Images/landmarks/tana-toraja.jpg",
    year: 1800,
    place: "Tana Toraja"
  },
  "default": {
    title: "Unknown Landmark",
    description: "No information is available for this landmark.",
    imageUrl: "https://via.placeholder.com/400x250?text=No+Image"
  }
};

