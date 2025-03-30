"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import Image from "next/image"

export function Markdown({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="animate-pulse bg-muted h-96 rounded-md" />
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        h1: ({ ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
        h3: ({ ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
        h4: ({ ...props }) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
        p: ({ ...props }) => <p className="mb-4" {...props} />,
        ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ ...props }) => <li className="mb-1" {...props} />,
        a: ({ ...props }) => <a className="text-primary hover:underline" {...props} />,
        blockquote: ({ ...props }) => (
          <blockquote className="border-l-4 border-muted pl-4 italic my-4" {...props} />
        ),
        code: ({ inline, ...props }) =>
          inline ? (
            <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />
          ) : (
            <code className="block bg-muted p-4 rounded-md overflow-x-auto text-sm my-4" {...props} />
          ),
        img: ({ src, alt, ...props }) => (
          <div className="relative w-full h-auto my-4">
            <Image
              src={src || ""}
              alt={alt || ""}
              width={800}
              height={600}
              className="rounded-md max-w-full h-auto"
              {...props}
            />
          </div>
        ),
        table: ({ ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse" {...props} />
          </div>
        ),
        th: ({ ...props }) => <th className="border border-muted px-4 py-2 text-left font-bold" {...props} />,
        td: ({ ...props }) => <td className="border border-muted px-4 py-2" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
