export function getWeekDay(str: number) {
  const date = new Date(Number(str) * 1000);
  const dayOfWeek = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo',
    ],
    US_date = new Date(date);

  return dayOfWeek[US_date.getDay() - 1 >= 0 ? US_date.getDay() - 1 : 6];
}

export function getHour(str: number, timezone: number) {
  const ResiltHours = new Date((str + timezone) * 1000).getHours();

  return ResiltHours;
}
