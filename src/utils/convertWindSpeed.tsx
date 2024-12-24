export default function convertWindSpeed(windSpeedInSeconds: number): string {
    const windSpeedInKmh = windSpeedInSeconds * 3.6;

    return `${windSpeedInKmh.toFixed(0)} km/h`;
}