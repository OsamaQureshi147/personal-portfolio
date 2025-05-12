"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import { useTheme } from "next-themes";

const techSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "NextJS",
  "NodeJS",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "TailwindCSS",
  "GraphQL",
  "Redux",
  "HTML",
  "CSS",
  "Gin",
  "Socket.io",
  "FastAPI",
  "Go",
  "Python",
  "Kafka",
  "Redis",
];

export default function CodeSphere() {
  const { resolvedTheme } = useTheme();
  const sphereRef = useRef();
  const textRefs = useRef([]);

  const isDarkTheme = resolvedTheme === "dark";
  
  // Place texts on the sphere surface
  const getPosition = (idx, total, radius) => {
    const phi = Math.acos(-1 + (2 * idx) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    
    return [
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    ];
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Rotate the sphere
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.1;
      sphereRef.current.rotation.z = time * 0.05;
    }
    
    // Make texts always face the camera
    textRefs.current.forEach((text, i) => {
      if (text) {
        text.lookAt(0, 0, 0);
        
        // Add some subtle motion to texts
        const sinOffset = Math.sin(time * 0.5 + i) * 0.02;
        text.position.x += sinOffset;
        text.position.y += sinOffset;
        text.position.z += sinOffset;
      }
    });
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[2, 24, 24]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color={isDarkTheme ? "#1e293b" : "#f8fafc"} 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Sphere>
      
      {techSkills.map((skill, i) => {
        textRefs.current[i] = textRefs.current[i] || useRef();
        
        const position = getPosition(i, techSkills.length, 2.2);
        
        return (
          <Text
            key={skill}
            ref={el => textRefs.current[i] = el}
            position={position}
            fontSize={0.15}
            color={
              i % 3 === 0 ? (isDarkTheme ? "#3b82f6" : "#1d4ed8") :
              i % 3 === 1 ? (isDarkTheme ? "#f472b6" : "#be185d") :
                            (isDarkTheme ? "#4ade80" : "#16a34a")
            }
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        );
      })}
    </group>
  );
}
