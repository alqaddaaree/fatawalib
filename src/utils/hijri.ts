export function formatHijriDate(hijri: string | undefined): string {
  if (!hijri) return '';
  // Expecting format YYYY-MM-DD (Hijri)
  const parts = hijri.split('-');
  if (parts.length < 3) return hijri;
  const [y, m, d] = parts;
  return `${d} ${m} ${y}`; // naive representation; replace with proper calendar lib if needed
}

export function formatGregorian(dateString: string | Date | undefined): string {
  if (!dateString) return '';
  const d = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (Number.isNaN(d.getTime())) return String(dateString);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
