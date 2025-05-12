"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { urlForImage } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PortableText from "@/components/PortableText";

interface PreviewBlogPostProps {
  post: any;
}

export default function PreviewBlogPost({ post: initialPost }: PreviewBlogPostProps) {
  const [post, setPost] = useState(initialPost);

  // Subscribe to changes in Sanity
  useEffect(() => {
    // This would be implemented with a real-time listener from Sanity
    // For preview purposes, we're just setting the initial post
    setPost(initialPost);
  }, [initialPost]);

  return (
    <article className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6 pl-0">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <h1 className="mb-6 text-gradient">{post.title}</h1>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {post.author?.image ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={urlForImage(post.author.image).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary" />
              )}
              <div>
                <p className="font-medium">{post.author?.name || "Anonymous"}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>

            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category.title}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.mainImage && (
            <div className="relative mb-8 h-[300px] md:h-[500px] w-full overflow-hidden rounded-lg">
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
