import { PrismaClient } from '@prisma/client'
import express from 'express'
export const app = express()
import {z} from 'zod'
app.use(express.json())

const prisma = new PrismaClient()

app.post('/register', async (request, response) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(), 
    whatsapp: z.string(),
    city: z.string(),
    uf: z.string()
  })
  const input = bodySchema.parse(request.body)
  const ong = await prisma.ong.create({
    data: {
      name: input.name,
      email: input.email,
      whatsapp: input.whatsapp,
      city: input.city,
      uf: input.uf
    }
  })
  console.log(ong)

  return response.status(201).json({
    id: ong.id
  })
})

app.listen(3333)
console.log('🚀 HTTP Server is running')
  