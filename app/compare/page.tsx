import { Suspense } from 'react'
import CompareContent from './CompareContent'

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="text-center mt-20 text-gray-500">Loading...</p>}>
      <CompareContent />
    </Suspense>
  )
}