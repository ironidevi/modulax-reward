"use client"

import { Module } from "@/screens/docs/lessons"
import { clsx } from "clsx"
import { SidebarIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { Navbar } from "@/screens/docs/components/navbar"

export const SidebarContext = createContext<{
  isSidebarOpen: boolean
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}>({
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
})

function CourseNavigation({
  modules,
  onNavigate,
  className,
}: {
  modules: Module[]
  onNavigate?(): void
  className?: string
}) {
  const pathname = usePathname()

  return (
    <div className={clsx(className, "space-y-8")}>
      {modules.map((module) => (
        <div key={module.id}>
          <h2 className="text-base/7 font-semibold text-pretty sm:text-sm/6 text-brand">
            {module.title}
          </h2>
          <ul className="mt-4 flex flex-col gap-4 border-l text-base/7 sm:mt-3 sm:gap-3 sm:text-sm/6 border-white/10 text-brand-blue">
            {module.lessons.map((lesson) => (
              <li
                key={lesson.id}
                className={clsx(
                  "-ml-px flex border-l border-transparent pl-4",
                  "hover:not-has-aria-[current=page]:border-gray-400 hover:text-white",
                  "has-aria-[current=page]:border-white"
                )}
              >
                <Link
                  href={`/docs/${lesson.id}`}
                  aria-current={
                    `/docs/${lesson.id}` === pathname ? "page" : undefined
                  }
                  onNavigate={onNavigate}
                  className="aria-[current=page]:font-medium aria-[current=page]:text-white"
                >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function SidebarLayout({
  modules,
  children,
}: {
  modules: Module[]
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsSidebarOpen(false)
    }, 1500)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      <div
        data-sidebar-collapsed={isSidebarOpen ? undefined : ""}
        className="group"
      >
        <aside className="fixed inset-y-0 left-0 w-2xs overflow-y-auto border-r group-data-sidebar-collapsed:hidden border-white/10">
          <nav aria-label="Course" className="px-6 py-4">
            <div className="sticky top-4 flex h-6">
              <div
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="cursor-pointer"
              >
                <SidebarIcon size={16} />
              </div>
            </div>
            <div className="mt-3">
              <CourseNavigation modules={modules} />
            </div>
          </nav>
        </aside>
        <div className="not-group-data-sidebar-collapsed:ml-(--container-2xs)">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

export function SidebarLayoutContent({
  breadcrumbs,
  children,
}: {
  breadcrumbs: React.ReactNode
  children: React.ReactNode
}) {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)

  return (
    <>
      <Navbar>
        <div className="flex min-w-0 shrink items-center gap-x-4">
          {!isSidebarOpen && (
            <div
              className="cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <SidebarIcon size={16} />
            </div>
          )}
          <div className="min-w-0">{breadcrumbs}</div>
        </div>
      </Navbar>

      <main className="px-4 sm:px-6">{children}</main>
    </>
  )
}
