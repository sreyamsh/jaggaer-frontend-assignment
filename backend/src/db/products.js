export const products = [
  {
    id: "1",
    name: "Smartphone",
    shortDescription: "High-end smartphone with great camera",
    longDescription:
      "Meet the smartphone that redefines connectivity. With its advanced camera, powerful processor, and vibrant display, it seamlessly bridges work and leisure. Stay connected with cutting-edge 5G technology and enjoy a sleek design that fits perfectly in your hand.",
    price: 699.99,
    imageUrl: "http://127.0.0.1:3000/assets/smartphone.jpg",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Laptop",
    shortDescription: "Powerful laptop for work and gaming",
    longDescription:
      "Experience unparalleled performance and portability with this state-of-the-art laptop. Whether you're a professional, student, or creative, this device is engineered to meet your demands. Enjoy ultra-fast processing, stunning graphics, and a lightweight design that lets you work and play wherever life takes you.",
    price: 1299.99,
    imageUrl: "http://127.0.0.1:3000/assets/laptop.jpg",
    rating: 4,
  },
  {
    id: "3",
    name: "Headphones",
    shortDescription: "Noise-cancelling wireless headphones",
    longDescription:
      "Dive into a world of immersive sound with these premium headphones. Whether it’s music, calls, or gaming, they deliver crystal-clear audio and noise cancellation. Designed for comfort and durability, they are your perfect companion for long listening sessions.",
    price: 199.99,
    imageUrl: "http://127.0.0.1:3000/assets/headphones.jpg",
    rating: 3,
  },
  {
    id: "4",
    name: "Watch",
    shortDescription:
      "A stylish and feature-packed timepiece that combines functionality with elegance.",
    longDescription:
      "Elevate your daily routine with this multi-functional smartwatch. Designed to complement your lifestyle, it offers fitness tracking, notifications, and customizable watch faces. Crafted with precision and style, it’s the perfect blend of technology and timeless design.",
    price: 249.99,
    imageUrl: "http://127.0.0.1:3000/assets/watch.jpg",
    rating: 2.5,
  },
  {
    id: "5",
    name: "Tablet",
    shortDescription: "Versatile tablet for creativity and productivity",
    longDescription:
      "Unleash your creativity with this powerful tablet that adapts to your needs. Perfect for digital art, note-taking, and entertainment, it features a stunning display and responsive touch interface. Whether you're sketching, reading, or streaming, this tablet delivers exceptional performance in a sleek, portable design.",
    price: 449.99,
    imageUrl: "http://127.0.0.1:3000/assets/tablet.jpg",
    rating: 4.2,
  },
  {
    id: "6",
    name: "Gaming Console",
    shortDescription: "Next-generation gaming console with 4K support",
    longDescription:
      "Step into the future of gaming with this cutting-edge console. Experience breathtaking 4K graphics, lightning-fast load times, and an extensive library of games. Built for both casual and hardcore gamers, it delivers immersive gameplay and entertainment that brings your living room to life.",
    price: 499.99,
    imageUrl: "http://127.0.0.1:3000/assets/gaming-console.jpg",
    rating: 4.8,
  },
  {
    id: "7",
    name: "Wireless Speaker",
    shortDescription: "Portable Bluetooth speaker with rich sound",
    longDescription:
      "Transform any space into your personal concert hall with this premium wireless speaker. Featuring deep bass, crystal-clear highs, and 360-degree sound, it delivers exceptional audio quality. Waterproof and portable, it's perfect for outdoor adventures, parties, or relaxing at home.",
    price: 89.99,
    imageUrl: "http://127.0.0.1:3000/assets/wireless-speaker.jpg",
    rating: 4.3,
  },
  {
    id: "8",
    name: "Fitness Tracker",
    shortDescription: "Advanced fitness tracker with health monitoring",
    longDescription:
      "Take control of your health and fitness journey with this comprehensive tracker. Monitor your heart rate, sleep patterns, steps, and workouts with precision. Featuring a sleek design and long battery life, it seamlessly integrates into your daily routine while helping you achieve your wellness goals.",
    price: 129.99,
    imageUrl: "http://127.0.0.1:3000/assets/fitness-tracker.jpg",
    rating: 4.1,
  },
];

export const productService = {
  getProducts() {
    return products;
  },

  getProductById(id) {
    return products.find((product) => product.id === id);
  },
};
