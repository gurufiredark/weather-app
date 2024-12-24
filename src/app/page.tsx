'use client'

import { useQuery } from "@tanstack/react-query";
import NavBar from "@/components/Navbar";
import WeatherIcon from "@/components/WeatherIcon";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import { parseISO } from "date-fns/fp";
import Container from "@/components/Container";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import WeatherDetails from "@/components/WeatherDetails";
import metersToKm from "@/utils/metersToKm";
import convertWindSpeed from "@/utils/convertWindSpeed";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { useEffect } from "react";


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

export default function WheaterApp() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: async (): Promise<WeatherData> => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
      );
      
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];

  const uniqueDates = [...new Set(data?.list.map((item) => new Date(item.dt * 1000).toISOString().split("T")[0]))];

  const firstDataForEachDate =  uniqueDates.map((date) => {
    return data?.list.find((item) => {
      const entryDate = new Date(item.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(item.dt * 1000).getHours();
      return entryDate === date && entryTime >= 12;
    });
  });
    
  console.log(firstData?.main.temp_max ?? 0);
  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
      </div>
  );

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
      <NavBar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        
        { loadingCity ?
          <WeatherSkeleton />
          : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <span>{format(parseISO(firstData?.dt_txt ?? ''), "EEEE")}</span>
                  <span className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), "dd.MM.yyyy")})</span>
                </h2>
                <Container className="flex gap-10 px-6 items-center">
                  <div className="flex flex-col px-4">
                    <span className="text-5xl">
                      {Math.floor(Number(firstData?.main.temp ?? 0))}°C
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels like</span>
                      <span> {Math.floor(Number(firstData?.main.feels_like ?? 0))}°C</span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>
                      {Math.floor(Number(firstData?.main.temp_min ?? 0))}
                      °C ↓{" "}
                      </span>
                      <span>
                      {" "}  
                      {Math.floor(Number(firstData?.main.temp_max ?? 0))}
                      °C ↑
                      </span>
                    </p>    
                  </div>

                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list.map((item, index) => (
                      <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                        <p className="whitespace-nowrap">
                          {format(parseISO(item.dt_txt ?? ''), "HH:mm a")}
                        </p>
                        <WeatherIcon icon={getDayOrNightIcon(item.weather[0].icon, item.dt_txt)} />
                        <p>{Math.floor((item?.main.temp ?? 0))}°C</p>
                      </div>
                    ))}
                  </div>  
                </Container>
              </div>
              <div className="flex gap-4">
                    <Container className="w-fit justify-center flex-col px-4 items-center">
                      <p className="capitalize text-center">{firstData?.weather[0].description}</p>
                      <WeatherIcon icon={getDayOrNightIcon(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')} />
                      
                    </Container>
                    <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                      <WeatherDetails
                        visibility={metersToKm(firstData?.visibility ?? 10000)}    
                        airPressure={`${firstData?.main.pressure} hPa`}
                        humidity={`${firstData?.main.humidity}%`}
                        sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "HH:mm a")}
                        sunset={format(fromUnixTime(data?.city.sunset ?? 0), "HH:mm a")}
                        windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
                      />
                    </Container>
              </div>
            </section>

            <section className="flex flex-col w-full gap-4 px-6 py-4">
                    <p className="text-2xl">Forcast (7 days)</p>
                    {firstDataForEachDate.map((item, index) => (
                      <ForecastWeatherDetail key={index}
                        description={item?.weather[0].description ?? ''}
                        weatheIcon={item?.weather[0].icon ?? ''}
                        date={format(parseISO(item?.dt_txt ?? ''), "dd.MM")}
                        day={format(parseISO(item?.dt_txt ?? ''), "EEEE")}
                        feelsLike={item?.main.feels_like ?? 0}
                        temp={item?.main.temp ?? 0}
                        tempMax={item?.main.temp_max ?? 0}
                        tempMin={item?.main.temp_min ?? 0}
                        airPressure={`${item?.main.pressure} hPa`}
                        humidity={`${item?.main.humidity}%`}
                        sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "HH:mm")}
                        sunset={format(fromUnixTime(data?.city.sunset ?? 0), "HH:mm")}
                        windSpeed={convertWindSpeed(item?.wind.speed ?? 0)}
                        visibility={metersToKm(item?.visibility ?? 10000)}
                      />
                    ))}
            </section>
          </>
          )
        }
        

      </main>
    </div>
  );
}


function WeatherSkeleton() {
  return (
    <section className="space-y-8 ">
      
      <div className="space-y-2 animate-pulse">
      
        <div className="flex gap-1 text-2xl items-end ">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex flex-col gap-4 animate-pulse">
        <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}