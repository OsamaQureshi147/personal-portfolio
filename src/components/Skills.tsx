"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CodeSphere from "@/components/3d/CodeSphere";

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "Python", "GoLang", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    items: ["NextJS", "NestJS", "ReactJS", "ExpressJS", "NodeJS", "Gin", "Socket.io", "FastAPI"],
  },
  {
    category: "Libraries",
    items: ["Supabase", "ShadCN", "MaterialUI", "TailwindCSS", "Redux", "Redux-Thunk", "React Router", "Zustand", "Lodash"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "Architecture",
    items: ["Monolith Architecture", "Micro-services Architecture", "pnpm / yarn workspaces"],
  },
  {
    category: "Other skills",
    items: ["GraphQL", "Stripe", "Kafka", "Redis pub-sub", "BullJS", "AWS SQS", "AWS SNS", "Sanity CMS"],
  }
];

export default function Skills() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          With over 6 years of experience, I've developed a diverse skill set across multiple technologies and frameworks.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="h-full"
            >
              <div className="h-full p-6 rounded-lg bg-card shadow-md border hover:shadow-lg transition-all transform-gpu">
                <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[500px] w-full flex items-center justify-center"
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <CodeSphere />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={0.5} 
              rotateSpeed={0.5}
            />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
