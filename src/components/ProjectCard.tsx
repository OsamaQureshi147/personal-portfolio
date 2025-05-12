"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlForImage } from "@/lib/sanity";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: { current: string };
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  mainImage?: any;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  slug,
  technologies,
  liveUrl,
  githubUrl,
  mainImage,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <Link href={`/projects/${slug.current}`} className="block">
          <div className="relative h-56 w-full overflow-hidden">
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
          <CardTitle className="text-xl font-bold">
            <Link href={`/projects/${slug.current}`}>{title}</Link>
          </CardTitle>
          <div className="mt-2 flex flex-wrap gap-2">
            {technologies?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-2 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {technologies?.length > 4 && (
              <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                +{technologies.length - 4} more
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="line-clamp-3 text-base">
            {description}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-between gap-4">
          <Button asChild size="sm" variant="outline">
            <Link href={`/projects/${slug.current}`}>View Details</Link>
          </Button>
          <div className="flex gap-2">
            {githubUrl && (
              <Button asChild size="icon" variant="ghost">
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {liveUrl && (
              <Button asChild size="icon" variant="ghost">
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Project"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
