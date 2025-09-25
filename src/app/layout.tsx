import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import GloblaProvider from "@/components/global-provider"

// Importing local fonts for the application
const helveticaNeue = localFont({
  variable: "--font-helvetica-neue",
  src: [
    {
      path: "../assets/fonts/HelveticaNeueThin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/HelveticaNeueUltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
  ],
})

const monaSans = localFont({
  variable: "--font-mona-sans",
  src: [
    {
      path: "../assets/fonts/MonaSansSemiBoldWide.ttf",
      weight: "600",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "Modulax docs",
  description: "Documentation for Modulax",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-pt-16">
      <body
        className={`${monaSans.variable} ${helveticaNeue.variable} antialiased overflow-x-hidden overflow-y-scroll`}
      >
        <GloblaProvider>{children}</GloblaProvider>
      </body>
    </html>
  )
}
