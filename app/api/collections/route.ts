import { auth } from '@clerk/nextjs/server'
import Collection from '@/lib/models/Collection'
import { connectToDB } from '@/lib/mongoDB'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }
    await connectToDB()

    const { title, description, image } = await req.json()
    const existingCollection = await Collection.findOne({ title })
    if (existingCollection) {
      return new NextResponse('Collection already exist', { status: 400 })
    }
    if (!title || !image) {
      return new NextResponse('Title and Image are required', { status: 400 })
    }
    const newCollection = await Collection.create({
      title,
      description,
      image,
    })

    await newCollection.save()
    return NextResponse.json(newCollection, { status: 200 })
  } catch (err) {
    console.log('[collections_POST]', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}