export function TimeAgoInTurkish(isoDate: string): string {
  const now = new Date();
  const pastDate = new Date(isoDate);
  const differenceInSeconds = Math.floor(
    (now.getTime() - pastDate.getTime()) / 1000
  );

  if (differenceInSeconds < 60) {
    // 1 dakika içinde
    return "az önce";
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    // 10 dakika 30 saniye gibi durumlar için sadece dakika göster
    return `${differenceInMinutes} dakika önce`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} saat önce`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 30) {
    return `${differenceInDays} gün önce`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);
  if (differenceInMonths < 12) {
    return `${differenceInMonths} ay önce`;
  }

  const differenceInYears = Math.floor(differenceInMonths / 12);
  return `${differenceInYears} yıl önce`;
}

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  date.setHours(date.getHours() - 3);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Aylar 0'dan başlar, bu yüzden 1 ekliyoruz
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
