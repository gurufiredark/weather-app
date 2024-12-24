'use client'
import React from 'react'
import { useState } from "react";
import SearchBox from "./SearchBox";
import { MdSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";
import axios from 'axios';

type Props = {}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({}: Props) {
    const [city, setCity] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    async function handleInputChange(value: string) {
            setCity(value);
            if (value.length >= 2) {
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`);
                    
                    const suggestions = response.data.list.map((item:any) => item.name);
                    setSuggestions(suggestions);
                    setError("");
                    setShowSuggestions(true);
                } catch (error) {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
        } else{
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setShowSuggestions(false);
    }

    return (
        <nav className='shadow-sm stick top-0 left-0 z-50 bg-white'>
            <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'> 
                <p className='flex items-center gap-2 justify-center'>
                    <h2 className='text-3xl text-gray-500'>
                        Weather
                    </h2>
                    <MdSunny className='text-3xl mt-1 text-yellow-300' />
                </p>

                <section className='flex items-center gap-2'>
                    <MdMyLocation className='text-2xl text-gray-400 hover:opacity-50 cursor-pointer' />
                    <MdOutlineLocationOn className='text-3xl'/>
                    <p className='text-slate-900/80 text-sm'> Brazil</p>
                    <div>
                        <SearchBox 
                            value={city}
                            onChange={(e) => handleInputChange(e.target.value)}
                            // onSubmit={setShowSuggestions}
                        />
                        <Suggestions 
                            showSuggestions={showSuggestions}
                            suggestions={suggestions}
                            handleSuggestionClick={setCity}
                            error={error}
                            />
                    </div>
                </section>    
            </div>
        </nav>
    )
}

function Suggestions(
    {
        showSuggestions,
        suggestions,
        handleSuggestionClick,
        error,  
    }: {
        showSuggestions: boolean;
        suggestions: string[];
        handleSuggestionClick: (item: string) => void;
        error: string;
    }) {
    return (
        <> 
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className='mb-4 bg-white absolute top-[44] left-0 border border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
                    {error && suggestions.length < 1 && (
                        <li className='text-red-500 p-1'>{error}</li>
                    )}
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className='hover:bg-gray-200 cursor-pointer rounded p-1'
                            onClick={() => handleSuggestionClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                    
                </ul>
            )}
        </>
    );
}
