export function calculateWorkedHours({
  entry,
  lunchStart,
  lunchEnd,
  exit,
}: {
  entry?: Date | string;
  lunchStart?: Date | string;
  lunchEnd?: Date | string;
  exit?: Date | string;
}): number {
  let workedHours = 0;

  console.log(entry, lunchStart, lunchEnd, exit)

  if (entry && lunchStart) {
    const entryDate = new Date(entry);
    const lunchStartDate = new Date(lunchStart);
    workedHours +=
      (lunchStartDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60);
  }

  if (lunchEnd && exit) {
    const lunchEndDate = new Date(lunchEnd);
    const exitDate = new Date(exit);
    workedHours +=
      (exitDate.getTime() - lunchEndDate.getTime()) / (1000 * 60 * 60);
  }

  return parseFloat(workedHours.toFixed(2));
}
