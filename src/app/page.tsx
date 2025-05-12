import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";
import { projectId } from "@/lib/sanity";

// Define proper types for our data
interface Project {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  mainImage?: any;
}

interface Post {
  _id: string;
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
}

// Only attempt to fetch data if Sanity credentials are available
const hasSanityCredentials = projectId !== '';

// Empty arrays with proper typing
const placeholderProjects: Project[] = [];
const placeholderPosts: Post[] = [];

async function getProjects(): Promise<Project[]> {
  if (!hasSanityCredentials) {
    return placeholderProjects;
  }
  
  try {
    const { client } = await import("@/lib/sanity");
    const { projectsQuery } = await import("@/lib/sanity.queries");
    return await client.fetch(projectsQuery);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getPosts(): Promise<Post[]> {
  if (!hasSanityCredentials) {
    return placeholderPosts;
  }
  
  try {
    const { client } = await import("@/lib/sanity");
    const { postsQuery } = await import("@/lib/sanity.queries");
    return await client.fetch(postsQuery);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export const revalidate = 60; // Revalidate content at most every minute

export default async function HomePage() {
  // Fetch data with error handling
  let projects: Project[] = [];
  let posts: Post[] = [];
  
  try {
    [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  } catch (error) {
    console.error("Error loading content:", error);
  }

  return (
    <div>
      <Hero />

      <Skills />

      <Experience />

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Explore some of my recent work across various domains and technologies.
            </p>
          </div>
          <a href="/projects" className="btn btn-outline flex items-center">
            View All Projects
            <span className="ml-2" style={{ display: 'inline-block', width: '16px', height: '16px' }}>
              <ArrowRight />
            </span>
          </a>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index: number) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                slug={project.slug}
                technologies={project.technologies || []}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                mainImage={project.mainImage}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              {!hasSanityCredentials 
                ? "Sanity CMS is not configured. Please provide Sanity credentials to display projects." 
                : "No projects available. Add projects in Sanity Studio."}
            </p>
            <a href="/projects" className="btn btn-outline">Explore Projects</a>
          </div>
        )}
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4 py-12 md:py-24 bg-muted/30">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Thoughts, insights, and guides on web development and technology.
            </p>
          </div>
          <a href="/blog" className="btn btn-outline flex items-center">
            View All Articles
            <span className="ml-2" style={{ display: 'inline-block', width: '16px', height: '16px' }}>
              <ArrowRight />
            </span>
          </a>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, index: number) => (
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
          <div className="col-span-3 text-center py-12">
            <p className="text-muted-foreground mb-4">
              {!hasSanityCredentials 
                ? "Sanity CMS is not configured. Please provide Sanity credentials to display blog posts." 
                : "No articles published yet."}
            </p>
            <a href="/blog" className="btn btn-outline">Check Back Soon</a>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's collaborate to build something amazing together. I'm currently available for freelance work and interesting project opportunities.
          </p>
          <a 
            href="/contact" 
            className="btn btn-primary btn-lg"
            style={{ 
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              color: 'white'
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
