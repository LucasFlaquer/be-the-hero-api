import { PrismaClient } from '@prisma/client'
import express from 'express'
import { z } from 'zod'
import { Authorization } from './middlewares'
export const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.post('/ongs', async (request, response) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    city: z.string(),
    uf: z.string(),
  })
  const input = bodySchema.parse(request.body)
  const ong = await prisma.ong.create({
    data: {
      name: input.name,
      email: input.email,
      whatsapp: input.whatsapp,
      city: input.city,
      uf: input.uf,
    },
  })
  return response.status(201).json({
    id: ong.id,
  })
})
app.post('/incidents', Authorization, async (request, response) => {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string(),
    value: z.number().min(10),
  })
  const input = bodySchema.parse(request.body)
  const ong = await prisma.ong.update({
    where: {
      id: request.headers.authorization,
    },
    data: {
      incidents: {
        create: input,
      },
    },
    include: {
      incidents: true,
    },
  })

  const incident = await prisma.incident.create({
    data: { ...input, ongId: `${request.headers.authorization}` },
  })
  console.log(
    await prisma.incident.findMany({
      where: {
        ongId: `${request.headers.authorization}`,
      },
    }),
  )
  return response.status(201).json({
    message: 'success',
  })
})
app.post('/authenticate', async (request, response) => {
  const bodySchema = z.object({
    ongId: z.string(),
  })
  try {
    const { ongId } = bodySchema.parse(request.body)
    const ong = await prisma.ong.findFirstOrThrow({ where: { id: ongId } })
    return response.status(200).json({ ong })
  } catch (error: any) {
    return response.status(401).json({
      message: error.message,
    })
  }
})
app.get('/profile', Authorization, async (request, response) => {
  const ongId = request.headers!.authorization
  const ongData = await prisma.ong.findFirst({
    where: { id: ongId },
    include: {
      incidents: true,
    },
  })

  return response.json({
    data: ongData,
  })
})
app.delete('/incidents/:id', Authorization, async (request, response) => {
  const { id } = request.params

  try {
    await prisma.incident.delete({ where: { id } })
    console.log('DELETED')
    return response.status(200).json({})
  } catch (error: any) {
    return response.status(401).json({
      message: error.message,
    })
  }
})

app.listen(3333)
console.log('🚀 HTTP Server is running')
