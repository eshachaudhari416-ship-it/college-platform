import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          Find Your Dream College
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Search, compare and discover the best colleges in India
        </p>
        <Link
          href="/colleges"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
        >
          Browse Colleges
        </Link>
      </div>
    </main>
  )
}