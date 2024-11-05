export const generateTimeSlots = (
  start: string,
  end: string,
  interval: number
): string[] => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const timeSlots: string[] = [];
  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    const formattedStart = `${currentHour
      .toString()
      .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

    currentMinute += interval;
    if (currentMinute >= 60) {
      currentMinute -= 60;
      currentHour += 1;
    }

    if (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute)
    ) {
      const formattedEnd = `${currentHour
        .toString()
        .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      timeSlots.push(`${formattedStart} - ${formattedEnd}`);
    }
  }

  return timeSlots;
};
