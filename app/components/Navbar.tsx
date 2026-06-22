'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <Link href="/" className="text-xl font-bold">🎓 CollegeFinder</Link>
        <Link href="/colleges" className="hover:underline">Colleges</Link>
        <Link href="/compare" className="hover:underline">Compare</Link>
      </div>
      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">Hi, {session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-100 text-sm font-semibold"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-100 text-sm font-semibold"
          >
            Sign In with Google
          </button>
        )}
      </div>
    </nav>
  )
}