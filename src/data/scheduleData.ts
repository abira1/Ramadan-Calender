export interface ScheduleDay {
  day: number;
  date: string;
  hijriDate: string;
  sehriEnd: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  isToday?: boolean;
}

export const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'];

// Mock data for Ramadan 2025 (Starting approx March 1st)
export const scheduleData: ScheduleDay[] = Array.from(
  { length: 30 },
  (_, i) => {
    const day = i + 1;
    const date = new Date(2025, 2, day); // March 2025
    const dateString = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      weekday: 'short'
    });

    // Simulate shifting times
    const baseSehri = 4 * 60 + 50; // 4:50 AM
    const baseIftar = 18 * 60 + 5; // 6:05 PM

    const sehriMinutes = baseSehri - i; // Sehri gets earlier
    const iftarMinutes = baseIftar + i; // Iftar gets later

    const formatTime = (totalMinutes: number) => {
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const displayH = h > 12 ? h - 12 : h;
      return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    return {
      day,
      date: dateString,
      hijriDate: `${day} Ramadan 1446`,
      sehriEnd: formatTime(sehriMinutes),
      fajr: formatTime(sehriMinutes + 5),
      sunrise: formatTime(sehriMinutes + 65),
      dhuhr: '12:15 PM',
      asr: '4:30 PM',
      maghrib: formatTime(iftarMinutes),
      isha: '7:45 PM',
      isToday: day === 15 // Mocking day 15 as today
    };
  }
);