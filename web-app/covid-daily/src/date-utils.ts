const subtractMonths = (numOfMonths: number, date: Date = new Date()) => {
    date.setMonth(date.getMonth() - numOfMonths);
    return date;
}

export const dateFormatted =
    (dt: Date) =>
        `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${(dt.getDate()).toString().padStart(2, '0')}`

export const defaultDateFrom = dateFormatted(subtractMonths(6, new Date(Date.now())));