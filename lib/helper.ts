export const formatSlugToTitle = (slug: string) => {
    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

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