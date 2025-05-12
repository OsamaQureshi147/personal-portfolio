"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const experienceData = [
  {
    id: 1,
    title: "Senior Software Engineer (Team lead)",
    company: "Sarmaaya Financials Pvt. Ltd.",
    location: "Islamabad, Pakistan",
    startDate: "2023-06-01",
    endDate: "Present",
    description: [
      "As the Lead Software Engineer, I spearhead a team of frontend and backend engineers in the migration of investment management tools from a custom PHP framework to the MERN stack, leveraging the Next.js 14.2 app router for the frontend and Node.js for the backend. My primary responsibilities include architecting and designing the system to enhance functionality and user experience.",
      "Key accomplishments in this role include:",
      "• System Architecture and Design: Played a pivotal role in the architecture and system design, ensuring robust and scalable solutions.",
      "• Real-Time Data Integration: Implemented Socket.io for real-time stock price updates, significantly improving user engagement and satisfaction.",
      "• High-Throughput Messaging: Utilized Kafka for high-throughput messaging to trigger real-time stock price alerts, ensuring users receive timely and accurate information.",
      "• Job Scheduling: Employed BullJS to schedule and manage jobs, keeping user portfolios current and accurate.",
      "• Utilized full capabilities of NextJS, including server actions, ISR, SSG, SSR, and service workers to ensure a smooth user experience."
    ]
  },
  {
    id: 2,
    title: "React / React Native Developer",
    company: "Total Info-Tech Pvt. Ltd.",
    location: "Remote",
    startDate: "2022-04-01",
    endDate: "2023-06-01",
    description: [
      "Primarily worked on migrating a Magento E-Commerce store to ReactJS storefront using \"PWA Studio\" framework. The framework provides \"Headless\" connection of Magento store to ReactJS frontend via GraphQL API. I was responsible to override VeniaUI default theme provided by Adobe to match our production site. Did this project from scratch till delivery.",
      "I was also responsible for maintaining and adding additional features to the React Native app."
    ]
  },
  {
    id: 3,
    title: "FullStack Developer",
    company: "iPlex Pvt. Ltd.",
    location: "Islamabad, Pakistan",
    startDate: "2021-02-01",
    endDate: "2022-12-01",
    description: [
      "• Develop responsive UI's in both React and React Native using styled-components and MaterialUI/AntDesign.",
      "• State management using Context API and Redux thunk.",
      "• Integration with REST API's and/or GraphQL backend.",
      "• Integration of other third party services like Firebase, Algolia, Contentful etc.",
      "• Develop fast and optimised apps using modern frameworks of React like Gatsby.",
      "• Maintained backend in GraphQL, did modifications based on requirements.",
      "• Database optimizations",
      "• Integrated payment gateways and subscription models"
    ]
  },
  {
    id: 4,
    title: "Network Operations Center Engineer",
    company: "Nokia-(Telenor Pakistan Project)",
    location: "Islamabad, Pakistan",
    startDate: "2018-12-01",
    endDate: "2020-10-01",
    description: [
      "• Alarm Monitoring of Telenor RAN and Core Network.",
      "• Troubleshooting of issues and escalations to the respective teams.",
      "• Taking the follow up of activities related to RAN and core network.",
      "• Real time monitoring of Telenor sites, particularly the sites having dependencies.",
      "• Handling and analysing all planned and unplanned network outages.",
      "• Keeping the follow up of different network activities like 3G/4G/DC upgradation and sectorization etc.",
      "• Monitoring of IT servers and services.",
      "• Was responsible to perform all the relevant post checks after the activities and inform the BO teams or vendors if the services are not up to the mark."
    ]
  }
];

export default function Experience() {
  const [activeId, setActiveId] = useState(1);

  const activeExperience = experienceData.find(exp => exp.id === activeId);

  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Over 6 years of professional experience building software solutions across different industries.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3 lg:space-y-4"
        >
          {experienceData.map((exp) => (
            <Button
              key={exp.id}
              variant={activeId === exp.id ? "default" : "ghost"}
              className={`justify-start w-full text-left h-auto py-3 px-4 ${
                activeId === exp.id ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => setActiveId(exp.id)}
            >
              <div>
                <div className="font-medium">{exp.company}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(exp.startDate).getFullYear()} - {exp.endDate === "Present" ? "Present" : new Date(exp.endDate).getFullYear()}
                </div>
              </div>
            </Button>
          ))}
        </motion.div>

        <motion.div
          key={activeId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle>
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">{activeExperience.title}</span>
                  <span className="text-lg font-medium">{activeExperience.company}</span>
                  <span className="text-sm text-muted-foreground">
                    {activeExperience.location} | {formatDate(activeExperience.startDate)} - {activeExperience.endDate === "Present" ? "Present" : formatDate(activeExperience.endDate)}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeExperience.description.map((paragraph, idx) => (
                  <p key={idx} className="text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
