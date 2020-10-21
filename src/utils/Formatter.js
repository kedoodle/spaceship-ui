export const formatAud = (value, digits=2) => {
    const formatter = new Intl.NumberFormat('en-AU', {
        style: "currency",
        currency: "AUD",
        maximumFractionDigits: digits
    });

    return formatter.format(value);
}
