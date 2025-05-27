"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Plane } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Technology icons with their colors
const technologies = [
  { name: "JS", color: "#F7DF1E", bgColor: "#000000" },
  { name: "TS", color: "#3178C6", bgColor: "#FFFFFF" },
  { name: "⚛", color: "#61DAFB", bgColor: "#20232A" }, // React
  { name: "▲", color: "#000000", bgColor: "#FFFFFF" }, // Next.js
  { name: "📗", color: "#339933", bgColor: "#FFFFFF" }, // Node.js
  { name: "🐱", color: "#E0234E", bgColor: "#FFFFFF" }, // NestJS cat
  { name: "🐘", color: "#336791", bgColor: "#FFFFFF" }, // PostgreSQL
  { name: "🍃", color: "#47A248", bgColor: "#FFFFFF" }, // MongoDB
  { name: "🎨", color: "#06B6D4", bgColor: "#FFFFFF" }, // Tailwind
  { name: "📊", color: "#E10098", bgColor: "#FFFFFF" }, // GraphQL
  { name: "🔄", color: "#764ABC", bgColor: "#FFFFFF" }, // Redux
  { name: "🐍", color: "#3776AB", bgColor: "#FFD43B" }, // Python
  { name: "🐹", color: "#00ADD8", bgColor: "#FFFFFF" }, // Go
  { name: "💎", color: "#DC382D", bgColor: "#FFFFFF" }, // Redis
  { name: "⚡", color: "#231F20", bgColor: "#FFFFFF" }, // Kafka
  { name: "🐳", color: "#2496ED", bgColor: "#FFFFFF" }, // Docker
];

// Simple 3D icon component
function TechIcon({ position, tech, index }) {
  const meshRef = useRef();
  const { resolvedTheme } = useTheme();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      
      // Individual rotation for each icon
      meshRef.current.rotation.z = Math.sin(time * 0.5 + index) * 0.2;
      
      // Subtle floating
      const originalPos = position;
      const floatOffset = Math.sin(time * 0.4 + index * 0.8) * 0.03;
      meshRef.current.position.set(
        originalPos[0],
        originalPos[1] + floatOffset,
        originalPos[2]
      );
      
      // Always face camera
      meshRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Background circle */}
      <Plane args={[0.25, 0.25]}>
        <meshBasicMaterial 
          color={tech.bgColor} 
          transparent 
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </Plane>
      
      {/* Icon circle with border */}
      <Plane args={[0.22, 0.22]} position={[0, 0, 0.001]}>
        <meshBasicMaterial 
          color={tech.color} 
          transparent 
          opacity={1}
          side={THREE.DoubleSide}
        />
      </Plane>
      
      {/* Technology symbol/text */}
      <Plane args={[0.15, 0.15]} position={[0, 0, 0.002]}>
        <meshBasicMaterial 
          color={tech.name === "JS" || tech.name === "▲" ? "#FFFFFF" : tech.bgColor}
          transparent 
          opacity={1}
          side={THREE.DoubleSide}
        />
      </Plane>
    </group>
  );
}

export default function CodeSphere() {
  const { resolvedTheme } = useTheme();
  const groupRef = useRef();
  const isDarkTheme = resolvedTheme === "dark";
  
  // Generate stable positions for each technology
  const techPositions = useMemo(() => {
    return technologies.map((_, idx) => {
      const total = technologies.length;
      const radius = 1.6; // Optimal radius for visibility
      
      // Fibonacci sphere distribution for even spacing
      const y = 1 - (idx / (total - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (idx * 2.399963) % (2 * Math.PI); // Golden angle
      
      return [
        radius * radiusAtY * Math.cos(theta),
        radius * y,
        radius * radiusAtY * Math.sin(theta)
      ];
    });
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Gentle rotation of the entire sphere
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main wireframe sphere */}
      <Sphere args={[1.4, 20, 20]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff6b00"
          wireframe 
          transparent 
          opacity={0.2} 
        />
      </Sphere>
      
      {/* Technology icons */}
      {technologies.map((tech, i) => (
        <TechIcon
          key={tech.name + i}
          position={techPositions[i]}
          tech={tech}
          index={i}
        />
      ))}
      
      {/* Inner glow effect */}
      <Sphere args={[1.2, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff6b00"
          transparent 
          opacity={0.03} 
        />
      </Sphere>
      
      {/* Outer particles effect */}
      <Sphere args={[1.8, 12, 12]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff8c3f"
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </Sphere>
    </group>
  );
}
