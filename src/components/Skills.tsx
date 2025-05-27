"use client";

import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Code2, Database, Layers, Wrench, Globe, Zap } from "lucide-react";
import CodeSphere from "@/components/3d/CodeSphere";

const skills = [
  {
    category: "Languages",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    items: ["JavaScript", "Python", "GoLang", "HTML", "CSS"],
    description: "Core programming languages for modern development"
  },
  {
    category: "Frameworks",
    icon: Layers,
    color: "from-emerald-500 to-green-500",
    items: ["NextJS", "NestJS", "ReactJS", "ExpressJS", "NodeJS", "Gin", "Socket.io", "FastAPI"],
    description: "Full-stack frameworks for scalable applications"
  },
  {
    category: "Libraries",
    icon: Wrench,
    color: "from-purple-500 to-pink-500",
    items: ["Supabase", "ShadCN", "MaterialUI", "TailwindCSS", "Redux", "Redux-Thunk", "React Router", "Zustand", "Lodash"],
    description: "Essential tools for efficient development"
  },
  {
    category: "Databases",
    icon: Database,
    color: "from-orange-500 to-red-500",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    description: "Data storage and management solutions"
  },
  {
    category: "Architecture",
    icon: Globe,
    color: "from-teal-500 to-blue-500",
    items: ["Monolith Architecture", "Micro-services Architecture", "pnpm / yarn workspaces"],
    description: "System design and architectural patterns"
  },
  {
    category: "Other Skills",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    items: ["GraphQL", "Stripe", "Kafka", "Redis pub-sub", "BullJS", "AWS SQS", "AWS SNS", "Sanity CMS"],
    description: "Advanced technologies and integrations"
  }
];

export default function Skills() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block p-3 bg-primary/10 rounded-2xl mb-6"
          >
            <Code2 className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            With over 6 years of experience, I've mastered a comprehensive tech stack spanning frontend, backend, and cloud technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-16">
          {skills.map((skillGroup, index) => {
            const IconComponent = skillGroup.icon;
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon with gradient background */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${skillGroup.color} mb-6 shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {skillGroup.category}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {skillGroup.description}
                  </p>
                  
                  <div className="space-y-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skillGroup.color} shadow-sm`}></div>
                        <span className="text-sm font-medium group-hover/item:text-primary transition-colors">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3D Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Interactive Technology Sphere</h3>
            <p className="text-muted-foreground">Explore the interconnected web of technologies I work with</p>
          </div>
          
          <div className="relative h-[400px] w-full rounded-2xl bg-gradient-to-br from-card to-accent/10 border border-border/50 shadow-2xl overflow-hidden">
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
            
            <Canvas className="relative z-10">
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <directionalLight position={[-5, 5, 5]} intensity={0.4} />
              <CodeSphere />
              <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={1}
                rotateSpeed={0.8}
                enablePan={false}
              />
            </Canvas>
            
            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-primary/5 rounded-full blur-lg"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
