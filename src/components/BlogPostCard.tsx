"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlForImage } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BlogPostCardProps {
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  mainImage?: any;
  author?: {
    name: string;
    image?: any;
  };
  categories?: { title: string }[];
  index: number;
}

export default function BlogPostCard({
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  author,
  categories,
  index,
}: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <Link href={`/blog/${slug.current}`} className="block">
          <div className="relative h-52 w-full overflow-hidden">
            {mainImage ? (
              <Image
                src={urlForImage(mainImage).url()}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-600" />
            )}
          </div>
        </Link>

        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {author?.image ? (
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={urlForImage(author.image).url()}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary" />
              )}
              <span className="text-sm font-medium">{author?.name || "Anonymous"}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(publishedAt)}
            </span>
          </div>

          <CardTitle className="line-clamp-2">
            <Link href={`/blog/${slug.current}`}>{title}</Link>
          </CardTitle>

          {categories && categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.slice(0, 3).map((category) => (
                <span
                  key={category.title}
                  className="rounded-full bg-secondary px-2 py-1 text-xs font-medium"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <CardDescription className="line-clamp-3">
            {excerpt}
          </CardDescription>
        </CardContent>

        <CardFooter>
          <Button asChild variant="ghost" className="group p-0">
            <Link href={`/blog/${slug.current}`} className="flex items-center">
              Read more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
