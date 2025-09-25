import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"

export function NextPageLink({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <div className="flow-root">
      <Link href={href} className="-mx-3 -my-2 block rounded-xl px-3 py-2">
        <p className="flex items-center gap-3 text-sm/7 text-brand">
          Up next
          <ChevronRightIcon className="stroke-current" />
        </p>
        <p className="mt-3 text-base/7 font-medium">{title}</p>
        <p className="text-sm/7 text-brand">{description}</p>
      </Link>
    </div>
  )
}
