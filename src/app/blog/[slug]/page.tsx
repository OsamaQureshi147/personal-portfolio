import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { urlForImage, getClient } from "@/lib/sanity";
import { postBySlugQuery } from "@/lib/sanity.queries";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PortableText from "@/components/PortableText";
import PreviewBlogPost from "@/components/PreviewBlogPost";

export const revalidate = 60; // Revalidate this page every 60 seconds

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    preview?: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getClient().fetch(postBySlugQuery, {
    slug: params.slug,
  });

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} | Osama Ehsan Qureshi's Blog`,
    description: post.excerpt || `Read ${post.title} by Osama Ehsan Qureshi`,
  };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const preview = searchParams.preview === "true";
  const post = await getClient(preview).fetch(postBySlugQuery, {
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      {preview && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-primary p-2 text-primary-foreground">
          <div className="text-sm">
            You are in preview mode.{" "}
            <Link href="/api/exit-preview" className="underline hover:text-primary-foreground/80">
              Exit preview
            </Link>
          </div>
        </div>
      )}

      {preview ? (
        <PreviewBlogPost post={post} />
      ) : (
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
      )}
    </>
  );
}
