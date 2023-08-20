import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const mathParent = await prisma.subject.create({
    data: {
      name: 'Matemática',
    },
  })
  const ptParent = await prisma.subject.create({
    data: {
      name: 'Português',
    },
  })
  await prisma.subject.create({
    data: {
      name: 'Algebra',
      parent_id: mathParent.id,
    },
  })
  await prisma.subject.create({
    data: {
      name: 'Geometria',
      parent_id: mathParent.id,
    },
  })
  await prisma.subject.create({
    data: {
      name: 'Literatura',
      parent_id: ptParent.id,
    },
  })
  await prisma.subject.create({
    data: {
      name: 'Gramatica',
      parent_id: ptParent.id,
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
