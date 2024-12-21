import React from 'react'

import SearchBox from "./SearchBox";
import { MdSunny, MdMyLocation, MdOutlineLocationOn } from "react-icons/md";

type Props = {}

export default function Navbar({}: Props) {
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
                        <SearchBox />
                    </div>
                </section>    
            </div>
        </nav>
    )
}