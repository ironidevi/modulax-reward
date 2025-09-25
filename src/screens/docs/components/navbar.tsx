"use client"

import { clsx } from "clsx"
import type React from "react"

export function Navbar({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "sticky top-0 z-10 backdrop-blur-sm dark:bg-gray-950/90",
        "flex items-center justify-between gap-x-8 px-4 py-4 sm:px-6"
      )}
      {...props}
    >
      {children}
    </div>
  )
}
