import React from "react";
import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/sanity.queries";
import ProjectCard from "@/components/ProjectCard";
import { Motion } from "@/components/motion";

export const metadata = {
  title: "Projects | Osama Ehsan Qureshi",
  description: "Explore the portfolio of projects built by Osama Ehsan Qureshi, showcasing a range of web and mobile applications.",
};

async function getProjects() {
  return await client.fetch(projectsQuery);
}

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-16 text-center">
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-gradient">Projects</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            A showcase of my work, featuring web applications, mobile apps, and other software solutions.
          </p>
        </Motion>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
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
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground mb-4">
            No projects found. Check back soon for updates!
          </p>
        </div>
      )}

      {/* Example Featured Project - Zar by Sarmaaya */}
      <div className="mt-24 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Project</h2>
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-lg border bg-card shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-[400px]">
              <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-600 p-6 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Zar by Sarmaaya</h3>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Zar by Sarmaaya</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">NextJS</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">ExpressJS</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">PostgreSQL</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">Redis</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">BullJS</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">Typescript</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">Socket.io</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">Apache Kafka</span>
              </div>
              <div className="space-y-4 text-base">
                <p>
                  Portfolio Tracking Tool for the Pakistani Stock Market, Mutual Funds, Forex, and Commodities.
                </p>
                <p>
                  Designed and developed a comprehensive portfolio tracking tool from scratch, enabling
                  users to manage and track multiple investment portfolios across asset types, including stocks, mutual funds, forex, and
                  commodities.
                </p>
                <p>
                  Added features to provide users with an overview of accumulative profits and cash balance, consolidating all investments in
                  one place for seamless monitoring. Integrated real-time data streams to deliver up-to-date market information, including company announcements for invested
                  companies.
                </p>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  );
}
