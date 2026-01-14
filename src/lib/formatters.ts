export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatShortDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    day: 'numeric',
  }).format(d);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getTransactionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    tuition: 'Tuition Fees',
    siwes: 'SIWES Fees',
    swep: 'SWEP Fees',
    hostel: 'Hostel Fees',
    other: 'Other Fees',
  };
  return labels[type] || 'Unknown';
}

export function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    bank_transfer: 'Bank Transfer',
    card: 'Card Payment',
    ussd: 'USSD',
  };
  return labels[method] || 'Unknown';
}
