export const generateTimeSlots = (start: string, end: string): string[] => {
  const startHour = parseInt(start.split(":")[0]);
  const endHour = parseInt(end.split(":")[0]);

  const timeSlots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const formattedStart = `${hour.toString().padStart(2, "0")}:00`;
    const formattedEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;
    timeSlots.push(`${formattedStart} - ${formattedEnd}`);
  }

  return timeSlots;
};
