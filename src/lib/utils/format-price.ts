/**
 * Formats a price value to a localized currency string
 * @param price - The price to format
 * @param currency - The currency code (default: 'RUB')
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats a price range as a string
 * @param min - Minimum price
 * @param max - Maximum price
 * @returns Formatted price range string
 */
export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
} 