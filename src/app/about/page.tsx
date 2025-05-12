import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/motion";

export const metadata = {
  title: "About | Osama Ehsan Qureshi",
  description: "Learn about Osama Ehsan Qureshi's journey, skills, and expertise as a Full Stack Developer.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-gradient">About Me</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            A little bit about my background, experience, and what drives me as a developer.
          </p>
        </Motion>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-5 lg:gap-16">
        <Motion
          className="md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sticky top-24 overflow-hidden rounded-lg shadow-md">
            <Image
              src="https://pixabay.com/get/ga18357f106699a91c0859c2ccb11625df9dc6545c162cfc382f2cc2608dbc4350674d7abd2070e81000462641270c4263c141c04b08337e7e95b95686be5566a_1280.jpg"
              alt="Osama Ehsan Qureshi"
              width={600}
              height={800}
              className="w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </Motion>

        <Motion
          className="md:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-3xl font-bold">My Journey</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Hello! I'm Osama Ehsan Qureshi, a passionate Full Stack Developer with over 6 years of experience in crafting robust and scalable web applications. Born and raised in Islamabad, Pakistan, I've always been fascinated by technology and how it can solve real-world problems.
                </p>
                <p>
                  My journey in tech began with a Bachelor's degree in Electrical Engineering from COMSATS University, Islamabad. After graduation, I started my career as a Network Operations Center Engineer at Nokia for the Telenor Pakistan Project, where I gained valuable experience in monitoring and troubleshooting network issues.
                </p>
                <p>
                  Transitioning into software development, I've worked with various companies, including iPlex, Total Info-Tech, and currently as a Senior Software Engineer and Team Lead at Sarmaaya Financials. Throughout my career, I've developed expertise in the MERN stack, NextJS, NestJS, SQL databases, and Golang.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold">My Approach</h2>
              <div className="space-y-4 text-lg">
                <p>
                  I believe in building software that is not only functional but also user-friendly and maintainable. My approach is centered around understanding client needs, planning thoroughly, and implementing solutions that are scalable and future-proof.
                </p>
                <p>
                  I'm passionate about staying up-to-date with the latest technologies and best practices in web development. I enjoy exploring new frameworks and tools that can enhance the user experience and improve development efficiency.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold">Education & Certifications</h2>
              <div className="space-y-4">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <h3 className="text-xl font-semibold">COMSATS University, Islamabad</h3>
                  <p className="text-muted-foreground">Bachelors of Science in Electrical Engineering</p>
                  <p className="text-sm">Sep 2014 – June 2018</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold">Certifications</h4>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Certified React Developer by the HackerRank</li>
                    <li>Certified by Coursera on Convolutional Neural Networks</li>
                    <li>Certified by Coursera on AI for Everyone</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold">Outside of Work</h2>
              <div className="space-y-4 text-lg">
                <p>
                  When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing my knowledge through mentoring junior developers. I'm also passionate about continuous learning and expanding my skill set.
                </p>
                <p>
                  I believe in the power of community and collaboration, which is why I'm always open to connecting with fellow developers and tech enthusiasts.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" variant="gradient">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  );
}
