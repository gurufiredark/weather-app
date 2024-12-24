'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <head>  
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <QueryClientProvider client={queryClient}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
      </QueryClientProvider>
    </html>
  );
}
