import { prisma } from './databaseConnection';

interface createOngDTO {
  name: string
  email: string
  whatsapp: string
  city: string
  uf:string
}

export class DBOng { 
  public async createOng(data: createOngDTO) {
    const ong = await prisma.ong.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        city: data.city,
        uf: data.uf
      }
    })
    return ong.id
  }
}