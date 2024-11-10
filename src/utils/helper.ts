export function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes} min`;
}

export const formatDate = (date: Date) => date.toISOString().split("T")[0];
