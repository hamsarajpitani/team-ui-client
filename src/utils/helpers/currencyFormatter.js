export function formatToIndianCurrencyWithLabel({ number, shortLabel, showLabel = true }) {
    number = parseFloat(number).toFixed(2);
    let num = parseFloat(number);

    let crore = 0, lakh = 0, thousand = 0;

    switch (true) {
        case (num >= 10000000):
            crore = Math.floor(num / 10000000);
            num %= 10000000;
            break;
        case (num >= 100000):
            lakh = Math.floor(num / 100000);
            num %= 100000;
            break;
        case (num >= 1000):
            thousand = Math.floor(num / 1000);
            num %= 1000;
            break;
        default:
            break;
    }

    let formattedString = '₹';
    switch (true) {
        case (crore > 0):
            formattedString += `${crore * 100} ${shortLabel ? 'Cr' : 'Crores'}`;
            break;
        case (lakh > 0):
            formattedString += `${lakh} Lakh`;
            break;
        case (thousand > 0):
            formattedString += `${thousand} thousand`;
            break;
        default:
            formattedString += `${num} Rs`;
            break;
    }
    return showLabel ? formattedString : formattedString?.split(' ')?.[0];
}

export function formatToIndianCurrency({ number, showSymbol = true }) {
    return number.toLocaleString('en-IN', { style: showSymbol ? 'currency' : 'decimal', currency: 'INR', minimumFractionDigits: 0 });
}