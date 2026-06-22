import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const maxFees = searchParams.get('maxFees')

    const colleges = await prisma.college.findMany({
      where: {
        AND: [
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
          location ? { location: { contains: location, mode: 'insensitive' } } : {},
          maxFees ? { fees: { lte: parseInt(maxFees) } } : {},
        ]
      },
      orderBy: { rating: 'desc' }
    })

    return NextResponse.json(colleges ?? [])
  } catch (error) {
    console.error(error)
    return NextResponse.json([], { status: 500 })
  }
}