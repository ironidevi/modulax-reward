import { SidebarLayout } from "@/components/SidebarLayout"
import { getModules } from "@/screens/docs/lessons"
import type React from "react"

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen bg-background" id="main-layout">
      <SidebarLayout modules={getModules()}>{children}</SidebarLayout>
    </div>
  )
}
