export type Module = {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export type Lesson = {
  id: string
  title: string
  description: string
  video: {
    thumbnail: string
    duration: number
    url: string
  } | null
}

export function getModules(): Module[] {
  return lessons
}

export async function getLesson(
  slug: string
): Promise<(Lesson & { module: Module; next: Lesson | null }) | null> {
  const mod = lessons.find(({ lessons }) =>
    lessons.some(({ id }) => id === slug)
  )

  if (!mod) {
    return null
  }

  const index = mod.lessons.findIndex(({ id }) => id === slug)

  return {
    ...mod.lessons[index],
    module: mod,
    next: index < mod.lessons.length - 1 ? mod.lessons[index + 1] : null,
  }
}

export async function getLessonContent(slug: string) {
  return (await import(`../../screens/docs/lessons/${slug}.mdx`)).default
}

const lessons = [
  {
    id: "orientation",
    title: "Modulax",
    description: "",
    lessons: [
      {
        id: "privacy-policy",
        title: "Privacy Policy",
        description:
          "Learn about our commitment to your privacy and data protection.",
        video: null,
      },
      {
        id: "terms-of-service",
        title: "Terms of Service",
        description:
          "Understand the rules and guidelines for using our services.",
        video: null,
      },
    ],
  },
]
