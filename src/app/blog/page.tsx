import React from "react";
import { client } from "@/lib/sanity";
import { postsQuery } from "@/lib/sanity.queries";
import BlogPostCard from "@/components/BlogPostCard";
import { Motion } from "@/components/motion";

export const metadata = {
  title: "Blog | Osama Ehsan Qureshi",
  description: "Read articles and insights on web development, programming, and technology by Osama Ehsan Qureshi.",
};

async function getPosts() {
  return await client.fetch(postsQuery);
}

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-16 text-center">
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-gradient">Blog</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Articles, tutorials, and insights on web development, programming, and technology.
          </p>
        </Motion>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogPostCard
              key={post._id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              publishedAt={post.publishedAt}
              mainImage={post.mainImage}
              author={post.author}
              categories={post.categories}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground mb-4">
            No articles found. Check back soon for the latest content!
          </p>
        </div>
      )}
    </div>
  );
}
