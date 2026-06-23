# 🎓 College Finder — College Discovery Platform

A production-grade full stack college discovery platform built with Next.js, PostgreSQL, Prisma and NextAuth. This project was built as part of the AI Software Engineer Internship assignment.

---

## 🌐 Live Demo

[https://college-platform-mhzn.vercel.app](https://college-platform-mhzn.vercel.app)

---

## 📌 Features

### 1. College Listing + Search
- Browse 20 Indian colleges with real time search
- Filter by college name, location and maximum fees
- Each card shows name, location, fees, rating and overview
- All data comes from PostgreSQL database via REST API

### 2. College Detail Page
- Full college profile with overview, courses, placements and fees
- Dynamic routing using Next.js App Router
- Graceful 404 handling for invalid college IDs

### 3. Compare Colleges
- Side by side comparison of up to 3 colleges
- Compare fees, ratings, location, courses and placements
- Add and remove colleges dynamically

### 4. Authentication
- Google OAuth login using NextAuth v5
- Secure session management with JWT
- User name displayed in navbar after login

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React, TypeScript, TailwindCSS |
| Backend | Next.js API Routes, TypeScript |
| Database | PostgreSQL (Neon), Prisma ORM |
| Authentication | NextAuth v5, Google OAuth |
| Deployment | Vercel (frontend + backend), Neon (database) |

---

## 🗄️ Database Schema

```prisma
model College {
  id          String         @id @default(cuid())
  name        String
  location    String
  fees        Int
  rating      Float
  overview    String
  courses     String[]
  placements  String
  savedBy     SavedCollege[]
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  image         String?
  savedColleges SavedCollege[]
  accounts      Account[]
  sessions      Session[]
}

model SavedCollege {
  id        String  @id @default(cuid())
  userId    String
  collegeId String
  user      User    @relation(fields: [userId], references: [id])
  college   College @relation(fields: [collegeId], references: [id])
}
```

---

## 📁 Project Structure

```
college-platform/
├── app/
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout with Navbar
│   ├── colleges/
│   │   ├── page.tsx              # College listing with search & filters
│   │   └── [id]/
│   │       └── page.tsx          # College detail page
│   ├── compare/
│   │   ├── page.tsx              # Compare page wrapper
│   │   └── CompareContent.tsx    # Compare logic
│   ├── components/
│   │   └── Navbar.tsx            # Navigation bar
│   └── api/
│       ├── colleges/
│       │   ├── route.ts          # GET /api/colleges (list + search)
│       │   └── [id]/
│       │       └── route.ts      # GET /api/colleges/:id
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts      # NextAuth handlers
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed 20 colleges
├── auth.ts                       # NextAuth configuration
├── .env                          # Environment variables
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database (or Neon free tier)
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eshachaudhari416-ship-it/college-platform.git
cd college-platform
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables — create a `.env` file:
```env
DATABASE_URL="your-postgresql-connection-string"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"
AUTH_SECRET="your-random-secret"
```

4. Push database schema:
```bash
npx prisma db push
```

5. Seed the database:
```bash
npx ts-node prisma/seed.ts
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Routes

### GET /api/colleges
Returns all colleges with optional filters.

Query parameters:
- `search` — filter by college name
- `location` — filter by location
- `maxFees` — filter by maximum fees

Example:
```
GET /api/colleges?search=IIT&location=Delhi&maxFees=200000
```

### GET /api/colleges/:id
Returns a single college by ID.

Returns 404 if college not found:
```json
{ "error": "College not found" }
```

---

## ⚠️ Edge Cases Handled

- Invalid college IDs return a proper 404 error response
- Empty search results show a friendly message instead of crashing
- Compare page wrapped in Suspense boundary for proper SSR handling
- All API routes have try-catch blocks for unexpected errors
- Fees filter handles missing or malformed values gracefully

---

## ⚖️ Tradeoffs

- **JWT vs Database Sessions** — Used JWT sessions for simplicity and speed. Tradeoff is inability to invalidate sessions server side.
- **Mock Data vs Real Data** — Used seeded mock data for MVP. Production would need a real data pipeline.
- **4 Features vs 6 Features** — Chose 4 features and executed them well rather than building all 6 poorly.
- **NextAuth v5 Beta** — Required for Next.js 16 compatibility. Came with PKCE challenges solved using trustHost configuration.

---

## 🌍 Deployment

The app is deployed on Vercel with the following setup:

- Frontend and backend deployed together on Vercel
- PostgreSQL database hosted on Neon (serverless)
- Environment variables configured in Vercel dashboard
- Prisma client generated during build using `prisma generate && next build`
- Google OAuth callback URL configured for production domain

---

## 👩‍💻 Author

Esha Chaudhari — [GitHub](https://github.com/eshachaudhari416-ship-it)
