import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";

export interface ForecastWeatherDetailProps extends WeatherDetailsProps{
    weatheIcon: string;
    date: string;
    day: string;
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    description: string;
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
    const {
        weatheIcon = "01d",
        date = "2024-12-23",
        day = "Monday",
        temp,
        feelsLike,
        tempMin,
        tempMax,
        description,
        visibility,
        humidity,
        windSpeed,
        airPressure,
        sunrise,
        sunset,
    } = props;

    console.log(temp);
    return (
        <Container className="gap-4">
            <section className="flex gap-4 items-center px-4">
                <div className="flex flex-col items-center gap-1 ">
                    <WeatherIcon icon={weatheIcon} />
                    <p>{date}</p>
                    <p className="text-xs">{day}</p>
                </div>

                <div className="flex flex-col px-4">
                    <span className="text-sm">{Math.floor(temp ?? 0)}°C</span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                        <span>Feels like</span>
                        <span> {Math.floor(feelsLike ?? 0)}°C</span>
                    </p>
                    <p className="capitalize">{description}</p>
                </div>
            </section>
            <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
                <WeatherDetails {...props} />
            </section>
        </Container>
        
    );
}