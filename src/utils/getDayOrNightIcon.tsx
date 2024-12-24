export function getDayOrNightIcon (
    icon: string,
    dateTimeString: string
): string  {
    const hours = new Date(dateTimeString).getHours();

    const isDayTime = hours >= 6 && hours < 18;

    return isDayTime ? icon.replace(/.$/, 'd') : icon.replace(/.$/, 'n');
}