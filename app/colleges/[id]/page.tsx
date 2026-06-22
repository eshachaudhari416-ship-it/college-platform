'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
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

export default function CollegeDetailPage() {
  const { id } = useParams()
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollege = async () => {
      const res = await fetch(`/api/colleges/${id}`)
      const data = await res.json()
      setCollege(data)
      setLoading(false)
    }
    fetchCollege()
  }, [id])

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>
  if (!college) return <p className="text-center mt-20 text-gray-500">College not found.</p>

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/colleges" className="text-blue-600 hover:underline mb-6 block">
          ← Back to Colleges
        </Link>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{college.name}</h1>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
              ⭐ {college.rating}
            </span>
          </div>

          <div className="flex gap-6 text-gray-500 mb-6">
            <p>📍 {college.location}</p>
            <p>💰 ₹{college.fees.toLocaleString()} / year</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Overview</h2>
            <p className="text-gray-600">{college.overview}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Courses Offered</h2>
            <div className="flex flex-wrap gap-2">
              {college.courses.map((course, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {course}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Placements</h2>
            <p className="text-gray-600">{college.placements}</p>
          </div>

          <Link
            href={`/compare?ids=${college.id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Compare This College
          </Link>
        </div>
      </div>
    </main>
  )
}