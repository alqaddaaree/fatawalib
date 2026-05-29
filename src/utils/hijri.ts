/**
 * Format a Hijri date string (e.g., "1445-03-15") to a readable format.
 * If input is not a valid string, returns the original value or empty string.
 */
export function formatHijriDate(dateInput: unknown): string {
  if (!dateInput) return '';
  
  // If it's already a string, use it
  if (typeof dateInput === 'string') {
    const trimmed = dateInput.trim();
    if (trimmed === '') return '';
    // Try to parse YYYY-MM-DD or similar
    const parts = trimmed.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`; // dd/mm/yyyy format
    }
    return trimmed;
  }
  
  // If it's a Date object, convert to ISO string and take first 10 chars
  if (dateInput instanceof Date) {
    const iso = dateInput.toISOString().split('T')[0]; // YYYY-MM-DD
    const [year, month, day] = iso.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Fallback: try to convert to string
  const str = String(dateInput);
  return str !== '' ? str : '';
}

/**
 * Format a Gregorian date (Date object, string, or number) to a readable format.
 * Accepts Date, ISO string, or any valid date input.
 */
export function formatGregorian(dateInput: unknown): string {
  if (!dateInput) return '';
  
  let date: Date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === 'string' || typeof dateInput === 'number') {
    date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
  } else {
    return '';
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}