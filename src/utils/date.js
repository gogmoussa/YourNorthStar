export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
}

export function getToday() {
    return new Date();
}

export function getDefaultFocusEnd() {
    return formatDateForInput(addDays(getToday(), 84)); // 12 weeks
}

export function getWeekId(date = new Date()) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const year = d.getUTCFullYear();
    const weekNo = Math.ceil((((d - new Date(Date.UTC(year, 0, 1))) / 86400000) + 1) / 7);
    return `${year}-W${weekNo}`;
}
