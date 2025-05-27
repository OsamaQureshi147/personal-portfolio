"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Circle, Text } from "@react-three/drei";
import * as THREE from "three";

// Simple technology data
const technologies = [
  { name: "JavaScript", symbol: "JS", color: "#F7DF1E", textColor: "#000000" },
  { name: "TypeScript", symbol: "TS", color: "#3178C6", textColor: "#FFFFFF" },
  { name: "React", symbol: "⚛", color: "#61DAFB", textColor: "#000000" },
  { name: "Next.js", symbol: "▲", color: "#000000", textColor: "#FFFFFF" },
  { name: "Node.js", symbol: "N", color: "#339933", textColor: "#FFFFFF" },
  { name: "Python", symbol: "PY", color: "#3776AB", textColor: "#FFFFFF" },
  { name: "PostgreSQL", symbol: "PG", color: "#336791", textColor: "#FFFFFF" },
  { name: "MongoDB", symbol: "🍃", color: "#47A248", textColor: "#FFFFFF" },
  { name: "TailwindCSS", symbol: "TW", color: "#06B6D4", textColor: "#FFFFFF" },
  { name: "Docker", symbol: "🐳", color: "#2496ED", textColor: "#FFFFFF" },
  { name: "Redis", symbol: "RD", color: "#DC382D", textColor: "#FFFFFF" },
  { name: "Go", symbol: "GO", color: "#00ADD8", textColor: "#FFFFFF" },
];

// Tech icon component
function TechIcon({ position, tech, index }: { 
  position: [number, number, number], 
  tech: typeof technologies[0], 
  index: number 
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock, camera }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
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
      {/* White border circle */}
      <Circle args={[0.4]} position={[0, 0, -0.01]}>
        <meshBasicMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </Circle>
      
      {/* Technology color circle */}
      <Circle args={[0.35]} position={[0, 0, 0]}>
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
        fontSize={0.1}
        color={tech.textColor}
        anchorX="center"
        anchorY="middle"
      >
        {tech.symbol}
      </Text>
    </group>
  );
}

export default function CodeSphere() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate positions for each technology using Fibonacci sphere
  const getPosition = (index: number, total: number): [number, number, number] => {
    const radius = 2.5;
    const y = 1 - (index / (total - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = (index * 2.399963) % (2 * Math.PI);
    
    return [
      radius * radiusAtY * Math.cos(theta),
      radius * y,
      radius * radiusAtY * Math.sin(theta)
    ];
  };

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
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
          key={tech.name}
          position={getPosition(i, technologies.length)}
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