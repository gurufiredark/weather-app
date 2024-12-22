'use client'
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import NavBar from "@/components/Navbar";
import axios from "axios";
import { format } from "date-fns";
import { parseISO } from "date-fns/fp";
import Container from "@/components/Container";

// https://api.openweathermap.org/data/2.5/forecast?lat=-23.4&lon=-51.9&appid=eb5fafd64b492ce26a138b23d4cddb4a&units=metric

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<WeatherForecast>;
  city: CityDetails;
}

interface WeatherForecast {
  dt: number;
  main: MainWeatherDetails;
  weather: Array<WeatherDescription>;
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Precipitation;
  sys: Sys;
  dt_txt: string;
}

interface MainWeatherDetails {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf?: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Precipitation {
  "3h"?: number;
}

interface Sys {
  pod: string;
}

interface CityDetails {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export default function Home() {
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async (): Promise<WeatherData> => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=-23.4&lon=-51.9&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
      );
      
      return response.data;
    },
  });

  const fristData = data?.list[0];

  console.log("data", data?.city.country);

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
      </div>
  );

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
      <NavBar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(fristData?.dt_txt ?? ''), "EEEE")}</p>
              <p className="text-lg">({format(parseISO(fristData?.dt_txt ?? ''), "dd.MM.yyyy")})</p>
            </h2>
          </div>
          
          <div>
            <Container className="flex gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {Math.floor(Number(fristData?.main.temp ?? 0))}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                </p>
                <p className="text-xs space-x-2">
                  <span>
                  {Math.floor(Number(fristData?.main.temp_min ?? 0))}°C
                  °↓{" "}
                  </span>
                  <span>
                  {" "}  
                  {Math.floor(Number(fristData?.main.temp_max ?? 0))}°C
                  °↑
                  </span>
                </p>
                
              </div>

              <div className="flex flex-col px-4">
                
              </div>  
            </Container>
          </div>
        </section>

        <section>

        </section>
      </main>
    </div>
  );
}
