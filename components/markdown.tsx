"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"

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
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => <a className="text-primary hover:underline" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-muted pl-4 italic my-4" {...props} />
        ),
        code: ({ node, inline, ...props }) =>
          inline ? (
            <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />
          ) : (
            <code className="block bg-muted p-4 rounded-md overflow-x-auto text-sm my-4" {...props} />
          ),
        img: ({ node, ...props }) => (
          <img className="max-w-full h-auto rounded-md my-4" {...props} alt={props.alt || ""} />
        ),
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => <th className="border border-muted px-4 py-2 text-left font-bold" {...props} />,
        td: ({ node, ...props }) => <td className="border border-muted px-4 py-2" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

