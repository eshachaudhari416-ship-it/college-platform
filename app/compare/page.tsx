'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [colleges, setColleges] = useState<College[]>([])
  const [allColleges, setAllColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch('/api/colleges')
      const data = await res.json()
      setAllColleges(data)
      setLoading(false)
    }
    fetchAll()
  }, [])

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || []
    if (ids.length > 0 && allColleges.length > 0) {
      const selected = allColleges.filter(c => ids.includes(c.id))
      setColleges(selected)
    }
  }, [searchParams, allColleges])

  const addCollege = (id: string) => {
    if (colleges.length >= 3) return alert('Maximum 3 colleges can be compared!')
    const college = allColleges.find(c => c.id === id)
    if (college && !colleges.find(c => c.id === id)) {
      setColleges([...colleges, college])
    }
  }

  const removeCollege = (id: string) => {
    setColleges(colleges.filter(c => c.id !== id))
  }

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Compare Colleges</h1>
          <Link href="/colleges" className="text-blue-600 hover:underline">
            ← Back to Colleges
          </Link>
        </div>

        {/* Add College Dropdown */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <select
            onChange={e => addCollege(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
            defaultValue=""
          >
            <option value="" disabled>Add a college to compare...</option>
            {allColleges.map(college => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        {colleges.length === 0 ? (
          <p className="text-center text-gray-500">No colleges selected. Add colleges above to compare!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left">Feature</th>
                  {colleges.map(college => (
                    <th key={college.id} className="p-4 text-left">
                      <div className="flex justify-between items-center">
                        <span>{college.name}</span>
                        <button
                          onClick={() => removeCollege(college.id)}
                          className="text-white hover:text-red-300 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold text-gray-600">Location</td>
                  {colleges.map(c => <td key={c.id} className="p-4 text-gray-700">📍 {c.location}</td>)}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold text-gray-600">Fees/Year</td>
                  {colleges.map(c => <td key={c.id} className="p-4 text-gray-700">₹{c.fees.toLocaleString()}</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold text-gray-600">Rating</td>
                  {colleges.map(c => <td key={c.id} className="p-4 text-gray-700">⭐ {c.rating}</td>)}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold text-gray-600">Courses</td>
                  {colleges.map(c => (
                    <td key={c.id} className="p-4 text-gray-700">
                      {c.courses.join(', ')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold text-gray-600">Placements</td>
                  {colleges.map(c => <td key={c.id} className="p-4 text-gray-700">{c.placements}</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-600">Overview</td>
                  {colleges.map(c => <td key={c.id} className="p-4 text-gray-700 text-sm">{c.overview}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}