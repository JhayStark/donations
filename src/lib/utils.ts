import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyToGHS(amount: number): string {
  // Check if amount is a valid number
  if (isNaN(amount)) {
    return 'GHS 0';
  }

  // Format the amount with 2 decimal places
  const formattedAmount = amount.toFixed(2);

  // Add currency symbol and commas for thousands separator
  const parts = formattedAmount.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `GHS${parts.join('.')}`;
}
