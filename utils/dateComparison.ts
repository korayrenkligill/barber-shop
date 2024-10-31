const AppointmentDateComparison = (date1: Date, date2: Date) => {
  const d1 = new Date(date1).toISOString().slice(0, 10); // Yıl-ay-gün formatı
  const d2 = new Date(date2).toISOString().slice(0, 10);

  return d1 >= d2;
};

export default AppointmentDateComparison;
