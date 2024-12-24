import Image from "next/image";
import React from "react";
import { cn } from "@/utils/cn";

export default function WeatherIcon(props: React.HTMLProps<HTMLDivElement> & {icon: string}) {
    return (
        <div {...props} className={cn('relative h-20 w-20')}>
            <Image
                className="absolute w-full h-full"
                src={`https://openweathermap.org/img/wn/${props.icon}@4x.png`}
                alt="weather icon"
                width={100}
                height={100}
            />
        </div>
        
    );
}