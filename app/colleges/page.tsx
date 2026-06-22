'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface College {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  overview: string
  courses: string[]
  placements: string
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [maxFees, setMaxFees] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (location) params.append('location', location)
      if (maxFees) params.append('maxFees', maxFees)
      const res = await fetch(`/api/colleges?${params.toString()}`)
      const data = await res.json()
      setColleges(data)
      setLoading(false)
    }
    fetchColleges()
  }, [search, location, maxFees])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Browse Colleges</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search college name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 flex-1 min-w-[200px]"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="border rounded-lg px-4 py-2 flex-1 min-w-[200px]"
          />
          <select
            value={maxFees}
            onChange={e => setMaxFees(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Fees</option>
            <option value="100000">Under 1 Lakh</option>
            <option value="200000">Under 2 Lakhs</option>
            <option value="400000">Under 4 Lakhs</option>
            <option value="500000">Under 5 Lakhs</option>
          </select>
        </div>

        {/* College Cards */}
        {loading ? (
          <p className="text-center text-gray-500">Loading colleges...</p>
        ) : colleges.length === 0 ? (
          <p className="text-center text-gray-500">No colleges found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map(college => (
              <div key={college.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{college.name}</h2>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">
                    ⭐ {college.rating}
                  </span>
                </div>
                <p className="text-gray-500 mb-1">📍 {college.location}</p>
                <p className="text-gray-500 mb-3">💰 ₹{college.fees.toLocaleString()} / year</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{college.overview}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/colleges/${college.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/compare?ids=${college.id}`}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-50"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}