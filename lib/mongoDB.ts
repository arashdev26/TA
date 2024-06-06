import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('mongoDB has already been connected ')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || '', {
      dbName: 'TRUST_ADMIN',
    })
    isConnected = true
    console.log('MONGODB IS CONNECTED')
  } catch (err) {
    console.log(err)
  }
}
