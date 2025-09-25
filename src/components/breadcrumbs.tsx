import { clsx } from "clsx"
import Link, { type LinkProps } from "next/link"
import type React from "react"

export function Breadcrumbs(props: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-x-2 text-sm/6"
      {...props}
    />
  )
}

export function BreadcrumbHome() {
  return (
    <Link href="/" className="min-w-0 shrink-0 text-brand">
      Home
    </Link>
  )
}

export function Breadcrumb({
  href,
  children,
  className,
}: {
  href?: LinkProps["href"]
  children: React.ReactNode
  className?: string
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(className, "min-w-0 truncate text-brand")}
      >
        {children}
      </Link>
    )
  }

  return (
    <span className={clsx(className, "min-w-0 truncate text-brand-blue")}>
      {children}
    </span>
  )
}

export function BreadcrumbSeparator({ className }: { className?: string }) {
  return <span className={clsx(className, "")}>/</span>
}
