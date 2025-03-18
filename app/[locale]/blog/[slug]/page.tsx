import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { getDictionary } from "@/lib/dictionaries"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Markdown } from "@/components/markdown"

interface PostPageProps {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ 
  params 
}: PostPageProps): Promise<Metadata> {
  // First, await the params object
  const paramsCopy = await Promise.resolve(params)
  const locale = paramsCopy.locale
  const slug = paramsCopy.slug
  
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["FireGuard Systems"],
    },
  }
}

export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}) {
  // Await the params object
  const paramsCopy = await Promise.resolve(params)
  const locale = paramsCopy.locale
  
  const posts = await getAllPosts(locale)
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ 
  params 
}: PostPageProps) {
  // Await the params object
  const paramsCopy = await Promise.resolve(params)
  const locale = paramsCopy.locale
  const slug = paramsCopy.slug
  
  const dict = await getDictionary(locale)
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-12 max-w-4xl">
      <Link href={`/${locale}/blog`} className="flex items-center text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="mr-2 h-4 w-4" />
        {dict.blog.backToBlog}
      </Link>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center text-muted-foreground mb-6">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        </div>
        {post.coverImage && (
          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <Markdown content={post.content} />
      </div>
    </article>
  )
}