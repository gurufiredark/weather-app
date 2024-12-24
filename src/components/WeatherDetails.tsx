import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

export interface WeatherDetailsProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {

    return (
        <>
            <SingleWeatherDetails
                information="Visibility"
                icon={<LuEye/>}
                value={props.visibility}
            />
            <SingleWeatherDetails
                information="Humidity"
                icon={<FiDroplet/>}
                value={props.humidity}
            />
            <SingleWeatherDetails
                information="Wind Speed"
                icon={<MdAir/>}
                value={props.windSpeed}
            />
            <SingleWeatherDetails
                information="Air Pressure"
                icon={<ImMeter/>}
                value= {props.airPressure}
            />
            <SingleWeatherDetails
                information="Sunrise"
                icon={<LuSunrise/>}
                value={props.sunrise}
            />
            <SingleWeatherDetails
                information="Sunset"
                icon={<LuSunset/>}
                value={props.sunset}
            />    
        </>
    );
}

export interface SingleWeatherDetailsProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div className="flex flex-col gap-2 justify-between items-center text-xs font-semibold text-black-80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p >{props.value}</p>
        </div>
    );
}