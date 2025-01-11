import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

function getRandomTime(baseDate: Date, hours: number, minutesRange = 59): Date {
  const randomMinutes = Math.floor(Math.random() * minutesRange);
  const randomDate = new Date(baseDate);
  randomDate.setHours(hours, randomMinutes, 0, 0);
  return randomDate;
}

async function main() {
  const userId = 1;
  const records = [];
  const startDate = new Date('2024-12-01');
  const endDate = new Date('2025-01-10');

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (isWeekday(date)) {
      const entry = getRandomTime(date, 8);
      const lunchStart = getRandomTime(date, 12);
      const lunchEnd = getRandomTime(date, 13);
      const exit = getRandomTime(date, 17);

      const workedHours =
        (lunchStart.getTime() -
          entry.getTime() +
          (exit.getTime() - lunchEnd.getTime())) /
        (1000 * 60 * 60);
      const balanceHours = workedHours - 8;

      records.push({
        employeesId: userId,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        entry,
        lunchStart,
        lunchEnd,
        exit,
        workedHours: parseFloat(workedHours.toFixed(2)),
        expectedHours: 8,
        balanceHours: parseFloat(balanceHours.toFixed(2)),
      });
    }
  }

  await prisma.records.createMany({ data: records });

  console.log(
    `Seed executado com sucesso! Inseridos ${records.length} registros.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
