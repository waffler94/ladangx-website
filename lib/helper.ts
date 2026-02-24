export const formatSlugToTitle = (slug: string) => {
    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

import { VoucherItem } from './declaration';

export const formatTitleToSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export const formatCurrency = (amount: number, currency: string, digits = 0) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: digits,
    }).format(amount);
};

export const truncateWithEllipsis = (text, max = 12) => {
    if (!text) return ""
    const str = String(text)
    return str.length > max ? `${str.slice(0, max)}...` : str
}

export const formatToLocalDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
};

/**
 * Calculate the total price for a ticket with promo pricing
 * @param quantity - The quantity of tickets
 * @param basePrice - The base price per ticket
 * @param promos - Array of promo objects with quantity and price
 * @returns The total price after applying promos
 */
export const calculatePromoPrice = (
    quantity: number,
    basePrice: number,
    promos: Array<{ quantity: number; price: number }> = []
): number => {
    if (quantity <= 0) return 0;
    if (!promos || promos.length === 0) {
        // No promos, use base price
        return quantity * basePrice;
    }

    // Sort promos by quantity in descending order
    const sortedPromos = [...promos].sort((a, b) => b.quantity - a.quantity);
    const maxPromoQuantity = sortedPromos[0].quantity;

    let totalPrice = 0;
    let remainingQuantity = quantity;

    // Apply max promo packages first
    while (remainingQuantity > maxPromoQuantity) {
        totalPrice += sortedPromos[0].price;
        remainingQuantity -= maxPromoQuantity;
    }

    // Apply promo for remaining quantity
    if (remainingQuantity > 0) {
        // Find the matching promo for the remaining quantity
        const matchingPromo = promos.find(promo => promo.quantity === remainingQuantity);

        if (matchingPromo) {
            totalPrice += matchingPromo.price;
        } else {
            // No exact promo match, use base price
            totalPrice += remainingQuantity * basePrice;
        }
    }

    return totalPrice;
};

export const getLeftTitle = (voucher: VoucherItem): string => {
    const adj = voucher.decoded_adjustment;
    if (!adj) return voucher.title;
    switch (adj.discount_type) {
        case 'Fixed Amount':
            return `RM${adj.discount_quantity} OFF`;
        case 'Buy X get Y':
            return `Buy ${adj.buy_quantity} Get ${adj.get_quantity}`;
        case 'Percentage':
            return `${adj.discount_quantity}% OFF`;
        default:
            return adj.discount_type;
    }
};