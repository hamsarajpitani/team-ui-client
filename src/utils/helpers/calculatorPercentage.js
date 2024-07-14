export function calculatePercentage(part, whole) {
    if (whole === 0) {
        return 0;
    }
    let percentage = (part / whole) * 100;
    return percentage.toFixed(2);
}