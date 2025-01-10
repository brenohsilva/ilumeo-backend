import { calculateWorkedHours } from './calculate-worked-hours';

export function getNextAvailableField(register: any, record: Date | string) {
  if (!register.entry) return { entry: record };
  if (!register.lunchStart) return { lunchStart: record };
  if (!register.lunchEnd) return { lunchEnd: record };

  if (!register.exit) {
    if (!register.entry || !register.lunchStart || !register.lunchEnd) {
      throw new Error('Faltam campos obrigatórios para calcular workedHours.');
    }

    const workedHours = calculateWorkedHours({
      entry: register.entry,
      lunchStart: register.lunchStart,
      lunchEnd: register.lunchEnd,
      exit: record,
    });

    return {
      exit: record,
      workedHours,
      balanceHours: workedHours - (register.expectedHours || 8),
    };
  }

  throw new Error('Todos os registros foram computados para esse dia!');
}
