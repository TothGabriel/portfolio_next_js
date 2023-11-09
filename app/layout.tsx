import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@styles/globals.css'

import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Mon site portfolio réalisé avec Next.js ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="" lang="en">
     <body className="">
        <Navbar />
        <main className="relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
