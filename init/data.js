const samplePlantings = [
  {
    title: "Snake Plant",
    description:
      "A popular indoor plant known for its air purifying ability and low maintenance care. Perfect for homes and offices.",
    image:{
        filename:"plantimage", 
      url:"https://images.unsplash.com/photo-1535882832-ac75c142f79f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    },
    price: 1500,
    location: "Lahore",
    country: "Pakistan",
  },

  {
    title: "Peace Lily Plant",
    description:
      "A beautiful flowering indoor plant with elegant white flowers. It improves indoor air quality and adds beauty to your space.",
    image: {
      filename: "plantimage",
      url: "https://images.unsplash.com/photo-1628608876733-8c69b3adb092?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBsYW50cyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 2000,
    location: "Islamabad",
    country: "Pakistan",
  },

  {
    title: "Aloe Vera Plant",
    description:
      "A medicinal succulent plant famous for its healing properties and easy growing conditions.",
    image: {
      filename: "plantimage",
      url: "https://images.unsplash.com/photo-1535882832-ac75c142f79f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    },
    price: 800,
    location: "Karachi",
    country: "Pakistan",
  },

  {
    title: "Money Plant",
    description:
      "A beautiful indoor climbing plant that requires little care and enhances home decoration.",
    image: {
      filename: "plantimage",
      url: "https://media.istockphoto.com/id/2206927993/photo/artificial-intelligence-evolving-through-nature.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_03Wcd-gCXSqBWuNgvr30OBqFffn7rxvO_t7dGR0-M=",
    },
    price: 700,
    location: "Lahore",
    country: "Pakistan",
  },

  {
    title: "Rose Plant",
    description:
      "A flowering garden plant available in different colors. Perfect for outdoor gardens and balconies.",
    image: {
      filename: "plantimage",
      url: "https://images.unsplash.com/photo-1628608876733-8c69b3adb092?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBsYW50cyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 1200,
    location: "Murree",
    country: "Pakistan",
  },

  {
    title: "Spider Plant",
    description:
      "An easy-to-grow indoor plant with beautiful green leaves. Suitable for beginners.",
    image: {
      filename: "plantimage",
      url: "https://media.istockphoto.com/id/2208884487/photo/green-leaves-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=QZ7pWS6bb09fu4bMayyUliykJhDw_cRFiJJLKqEeHcs=",
    },
    price: 900,
    location: "Rawalpindi",
    country: "Pakistan",
  },

  {
    title: "Cactus Plant",
    description:
      "A desert plant requiring minimal watering. Ideal for modern home decoration.",
    image: {
      filename: "plantimage",
      url: "https://images.unsplash.com/photo-1535882832-ac75c142f79f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    },
    price: 600,
    location: "Multan",
    country: "Pakistan",
  },

  {
    title: "Lavender Plant",
    description:
      "A fragrant flowering plant known for its relaxing aroma and beautiful purple flowers.",
    image: {
      filename: "plantimage",
      url: "https://images.unsplash.com/photo-1628608876733-8c69b3adb092?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBsYW50cyUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 1800,
    location: "Swat",
    country: "Pakistan",
  },

  {
    title: "Bamboo Plant",
    description:
      "A decorative indoor plant that creates a peaceful environment and requires minimal care.",
    image: {
      filename: "plantimage",
      url: "https://images.unsplash.com/photo-1535882832-ac75c142f79f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    },
    price: 1100,
    location: "Peshawar",
    country: "Pakistan",
  },

  {
    title: "ZZ Plant",
    description:
      "A stylish indoor plant that survives in low-light conditions and requires very little maintenance.",
    image: {
      filename: "plantimage",
      url: "https://images.unsplash.com/photo-1535882832-ac75c142f79f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    },
    price: 2500,
    location: "Faisalabad",
    country: "Pakistan",
  },

  {
    title: "Fiddle Leaf Fig",
    description:
      "A premium indoor plant with large green leaves that gives a modern look to interiors.",
    image: {
      filename: "plantimage",
      url: "https://media.istockphoto.com/id/2206927993/photo/artificial-intelligence-evolving-through-nature.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_03Wcd-gCXSqBWuNgvr30OBqFffn7rxvO_t7dGR0-M=",
    },
    price: 3500,
    location: "Islamabad",
    country: "Pakistan",
  },

  {
    title: "Areca Palm",
    description:
      "A tropical indoor palm plant that adds freshness and beauty to living spaces.",
    image: {
        filename:"plantimage",
      url:"https://images.unsplash.com/photo-1535882832-ac75c142f79f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwaW1hZ2VzfGVufDB8fDB8fHww"
      },
    price: 3000,
    location: "Karachi",
    country: "Pakistan",
  }
];


module.exports = { data: samplePlantings };