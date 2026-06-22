import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.college.createMany({
    data: [
      { name: "IIT Bombay", location: "Mumbai", fees: 200000, rating: 4.8, overview: "Premier engineering institute in India.", courses: ["B.Tech", "M.Tech", "PhD"], placements: "Average package 20 LPA, highest 1.2 CR" },
      { name: "IIT Delhi", location: "Delhi", fees: 200000, rating: 4.7, overview: "Top ranked technical university in Delhi.", courses: ["B.Tech", "M.Tech", "MBA"], placements: "Average package 18 LPA, highest 2 CR" },
      { name: "BITS Pilani", location: "Rajasthan", fees: 500000, rating: 4.5, overview: "Leading private engineering college.", courses: ["B.Tech", "M.Tech", "M.Sc"], placements: "Average package 15 LPA, highest 80 LPA" },
      { name: "NIT Trichy", location: "Tamil Nadu", fees: 150000, rating: 4.4, overview: "Top NIT in South India.", courses: ["B.Tech", "M.Tech"], placements: "Average package 12 LPA, highest 50 LPA" },
      { name: "VIT Vellore", location: "Tamil Nadu", fees: 400000, rating: 4.2, overview: "Popular private engineering college.", courses: ["B.Tech", "M.Tech", "MBA"], placements: "Average package 10 LPA, highest 45 LPA" },
      { name: "IIT Madras", location: "Chennai", fees: 200000, rating: 4.8, overview: "Ranked #1 engineering college in India.", courses: ["B.Tech", "M.Tech", "PhD"], placements: "Average package 22 LPA, highest 1.5 CR" },
      { name: "DTU Delhi", location: "Delhi", fees: 170000, rating: 4.1, overview: "Top state engineering university in Delhi.", courses: ["B.Tech", "M.Tech"], placements: "Average package 11 LPA, highest 60 LPA" },
      { name: "IIIT Hyderabad", location: "Hyderabad", fees: 350000, rating: 4.5, overview: "Specialized in IT and computer science.", courses: ["B.Tech", "M.Tech", "PhD"], placements: "Average package 18 LPA, highest 1 CR" },
      { name: "Manipal Institute", location: "Karnataka", fees: 450000, rating: 4.0, overview: "Well known private university.", courses: ["B.Tech", "MBBS", "MBA"], placements: "Average package 8 LPA, highest 35 LPA" },
      { name: "SRM University", location: "Chennai", fees: 380000, rating: 3.9, overview: "Large private university with good placements.", courses: ["B.Tech", "MBA", "M.Tech"], placements: "Average package 7 LPA, highest 30 LPA" },
      { name: "IIT Kharagpur", location: "West Bengal", fees: 200000, rating: 4.7, overview: "Oldest and largest IIT in India.", courses: ["B.Tech", "M.Tech", "MBA", "PhD"], placements: "Average package 19 LPA, highest 1.8 CR" },
      { name: "Jadavpur University", location: "Kolkata", fees: 50000, rating: 4.3, overview: "Top government university in West Bengal.", courses: ["B.Tech", "M.Tech", "BA"], placements: "Average package 10 LPA, highest 40 LPA" },
      { name: "PSG Tech", location: "Coimbatore", fees: 120000, rating: 4.0, overview: "Reputed engineering college in Tamil Nadu.", courses: ["B.Tech", "M.Tech"], placements: "Average package 8 LPA, highest 28 LPA" },
      { name: "COEP Pune", location: "Pune", fees: 100000, rating: 4.1, overview: "Prestigious government engineering college.", courses: ["B.Tech", "M.Tech"], placements: "Average package 9 LPA, highest 35 LPA" },
      { name: "Thapar University", location: "Punjab", fees: 420000, rating: 4.2, overview: "Top private university in North India.", courses: ["B.Tech", "M.Tech", "MBA"], placements: "Average package 12 LPA, highest 50 LPA" },
      { name: "NIT Surathkal", location: "Karnataka", fees: 150000, rating: 4.3, overview: "Top NIT on the west coast.", courses: ["B.Tech", "M.Tech"], placements: "Average package 13 LPA, highest 55 LPA" },
      { name: "Anna University", location: "Chennai", fees: 80000, rating: 4.0, overview: "Largest technical university in Tamil Nadu.", courses: ["B.Tech", "M.Tech", "MBA"], placements: "Average package 7 LPA, highest 25 LPA" },
      { name: "Amity University", location: "Noida", fees: 500000, rating: 3.8, overview: "Large private university with multiple campuses.", courses: ["B.Tech", "MBA", "BCA", "BBA"], placements: "Average package 6 LPA, highest 22 LPA" },
      { name: "IIT Roorkee", location: "Uttarakhand", fees: 200000, rating: 4.6, overview: "One of the oldest technical institutes in Asia.", courses: ["B.Tech", "M.Tech", "MBA", "PhD"], placements: "Average package 17 LPA, highest 1.2 CR" },
      { name: "NSIT Delhi", location: "Delhi", fees: 160000, rating: 4.0, overview: "Good engineering college under Delhi University.", courses: ["B.Tech", "M.Tech"], placements: "Average package 10 LPA, highest 45 LPA" },
    ]
  })
  console.log('✅ 20 colleges seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())