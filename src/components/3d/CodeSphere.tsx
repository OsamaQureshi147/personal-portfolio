"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, Circle, Text } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Technology data with proper branding
const technologies = [
  { name: "JS", symbol: "JS", color: "#F7DF1E", textColor: "#000000" },
  { name: "TS", symbol: "TS", color: "#3178C6", textColor: "#FFFFFF" },
  { name: "React", symbol: "⚛", color: "#61DAFB", textColor: "#000000" },
  { name: "Next", symbol: "▲", color: "#000000", textColor: "#FFFFFF" },
  { name: "Node", symbol: "N", color: "#339933", textColor: "#FFFFFF" },
  { name: "Nest", symbol: "🐱", color: "#E0234E", textColor: "#FFFFFF" },
  { name: "PostgreSQL", symbol: "🐘", color: "#336791", textColor: "#FFFFFF" },
  { name: "MongoDB", symbol: "🍃", color: "#47A248", textColor: "#FFFFFF" },
  { name: "Tailwind", symbol: "🎨", color: "#06B6D4", textColor: "#FFFFFF" },
  { name: "GraphQL", symbol: "QL", color: "#E10098", textColor: "#FFFFFF" },
  { name: "Redux", symbol: "RX", color: "#764ABC", textColor: "#FFFFFF" },
  { name: "Python", symbol: "🐍", color: "#3776AB", textColor: "#FFD43B" },
  { name: "Go", symbol: "GO", color: "#00ADD8", textColor: "#FFFFFF" },
  { name: "Redis", symbol: "💎", color: "#DC382D", textColor: "#FFFFFF" },
  { name: "Docker", symbol: "🐳", color: "#2496ED", textColor: "#FFFFFF" },
  { name: "Kafka", symbol: "K", color: "#231F20", textColor: "#FFFFFF" },
];

// Tech icon component with proper 3D circles
function TechIcon({ position, tech, index }: { position: [number, number, number], tech: any, index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock, camera }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      // Individual gentle rotation
      groupRef.current.rotation.z = Math.sin(time * 0.3 + index) * 0.1;
      
      // Subtle floating animation
      const floatOffset = Math.sin(time * 0.4 + index * 0.8) * 0.05;
      groupRef.current.position.set(
        position[0],
        position[1] + floatOffset,
        position[2]
      );
      
      // Face the camera
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Background circle */}
      <Circle args={[0.22]} position={[0, 0, -0.01]}>
        <meshBasicMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </Circle>
      
      {/* Technology color circle */}
      <Circle args={[0.18]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color={tech.color} 
          transparent 
          opacity={1}
          side={THREE.DoubleSide}
        />
      </Circle>
      
      {/* Technology symbol */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.12}
        color={tech.textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.3}
      >
        {tech.symbol}
      </Text>
    </group>
  );
}

export default function CodeSphere() {
  const { resolvedTheme } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const isDarkTheme = resolvedTheme === "dark";
  
  // Generate stable positions for each technology
  const techPositions = useMemo(() => {
    return technologies.map((_, idx) => {
      const total = technologies.length;
      const radius = 2.5; // Optimal radius for visibility
      
      // Fibonacci sphere distribution for even spacing
      const y = 1 - (idx / (total - 1)) * 2; // y from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (idx * 2.399963) % (2 * Math.PI); // Golden angle
      
      return [
        radius * radiusAtY * Math.cos(theta),
        radius * y,
        radius * radiusAtY * Math.sin(theta)
      ] as [number, number, number];
    });
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Gentle rotation of the entire sphere
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main wireframe sphere */}
      <Sphere args={[2.2, 24, 24]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff6b00"
          wireframe 
          transparent 
          opacity={0.3} 
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
      <Sphere args={[1.9, 20, 20]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff6b00"
          transparent 
          opacity={0.08} 
        />
      </Sphere>
      
      {/* Outer boundary sphere */}
      <Sphere args={[2.8, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff8c3f"
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>
    </group>
  );
}
