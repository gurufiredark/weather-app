import React from 'react'

import { cn } from '@/utils/cn';



export default function Container(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div 
            {...props} 
            className={cn('w-full bg-white border rounded-xl shadow-md flex py-4', props.className)}
        />
    );
}