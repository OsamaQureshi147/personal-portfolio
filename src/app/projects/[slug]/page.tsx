import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { urlForImage, getClient } from "@/lib/sanity";
import { projectQuery } from "@/lib/sanity.queries";
import { Button } from "@/components/ui/button";
import PortableText from "@/components/PortableText";

export const revalidate = 60; // Revalidate this page every 60 seconds

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const project = await getClient().fetch(projectQuery, {
    slug: params.slug,
  });

  if (!project) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: `${project.title} | Osama Ehsan Qureshi's Projects`,
    description: project.description || `View details about ${project.title} by Osama Ehsan Qureshi`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getClient().fetch(projectQuery, {
    slug: params.slug,
  });

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6 pl-0">
            <Link href="/projects" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <h1 className="mb-6 text-gradient">{project.title}</h1>

          <div className="mb-8 flex flex-wrap items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex space-x-3">
              {project.liveUrl && (
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {project.mainImage && (
            <div className="relative mb-8 h-[300px] md:h-[500px] w-full overflow-hidden rounded-lg">
              <Image
                src={urlForImage(project.mainImage).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mb-10 text-lg text-muted-foreground">
            <p>{project.description}</p>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {project.body ? (
            <PortableText value={project.body} />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>Detailed project information coming soon.</p>
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/projects" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
