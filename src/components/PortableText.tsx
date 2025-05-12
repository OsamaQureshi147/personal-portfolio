"use client";

import { PortableText as SanityPortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity";
import { useTheme } from "@/hooks/useTheme";

interface PortableTextProps {
  value: any;
}

export default function PortableText({ value }: PortableTextProps) {
  const { resolvedTheme } = useTheme();
  
  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="my-8 relative w-full h-96 overflow-hidden rounded-lg">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || "Blog post image"}
              fill
              className="object-cover"
            />
          </div>
        );
      },
      code: ({ value }) => {
        return (
          <pre className="my-6 overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
            <code className="language-javascript">{value.code}</code>
            {value.filename && (
              <div className="mt-2 text-xs text-muted-foreground">
                {value.filename}
              </div>
            )}
          </pre>
        );
      },
    },
    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <Link
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="text-primary underline transition-colors hover:text-primary/80"
          >
            {children}
          </Link>
        );
      },
      code: ({ children }) => {
        return (
          <code className="rounded bg-secondary px-1 py-0.5 font-mono text-sm">
            {children}
          </code>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="mt-12 mb-4 text-4xl font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mt-10 mb-4 text-3xl font-bold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 mb-4 text-2xl font-bold">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-6 mb-4 text-xl font-bold">{children}</h4>
      ),
      normal: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="mt-6 mb-6 border-l-4 border-primary pl-4 italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-6 ml-6 list-disc space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mb-6 ml-6 list-decimal space-y-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
  };

  return <SanityPortableText value={value} components={components} />;
}
