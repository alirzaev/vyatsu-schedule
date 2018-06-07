function parseDate(date) {
    let day = Number.parseInt(date.slice(0, 2));
    let month = Number.parseInt(date.slice(2, 4));
    let year = Number.parseInt(date.slice(4));

    return [day, month, year]
}

export function getCurrentDay(firstDate, secondDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const OFFSET_MSK = 10800000;
    const MODULO = 1209600000;
    const DAY_IN_MILLISEC = 24 * 3600 * 1000;

    const [fDay, fMonth, fYear] = parseDate(firstDate);
    const [sDay, sMonth, sYear] = parseDate(secondDate);

    firstDate = Date.parse(`${fDay} ${monthNames[fMonth - 1]} ${fYear} 00:00:00 +0300`);
    secondDate = Date.parse(`${sDay} ${monthNames[sMonth - 1]} ${sYear} 00:00:00 +0300`);

    const currentDate = Date.now() + OFFSET_MSK;

    const difference = ((currentDate - firstDate + MODULO) % MODULO) / DAY_IN_MILLISEC >> 0;
    const cWeek = (difference / 7) >> 0;
    const cDay = difference % 7;

    if (cWeek < 0 || cWeek > 1 || cDay > 5 || cDay < 0) {
        return [-1, -1]
    } else {
        return [cWeek, cDay]
    }
}