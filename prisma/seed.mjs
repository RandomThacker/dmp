import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

function formatDate(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

async function main() {
  const employees = [];

  for (let i = 0; i < 20; i++) {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const checkIn = faker.date.between('2024-05-19T08:00:00Z', '2024-05-19T10:00:00Z');
    const checkOut = new Date(checkIn.getTime() + 8 * 60 * 60 * 1000); // 8 hours after check-in

    employees.push({
      name,
      email,
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
    });
  }

  await prisma.employee.createMany({
    data: employees,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
