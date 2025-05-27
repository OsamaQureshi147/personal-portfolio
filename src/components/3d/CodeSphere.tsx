"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

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
  "Python",
  "Go",
  "Redis",
  "Kafka",
  "Docker"
];

export default function CodeSphere() {
  const { resolvedTheme } = useTheme();
  const groupRef = useRef();
  const textRefs = useRef([]);

  const isDarkTheme = resolvedTheme === "dark";
  
  // Generate stable positions for each technology
  const techPositions = useMemo(() => {
    return techSkills.map((_, idx) => {
      const total = techSkills.length;
      const radius = 1.8; // Smaller radius to keep them closer
      
      // Use golden angle for better distribution
      const y = 1 - (idx / (total - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (idx * 2.4) % (2 * Math.PI); // Golden angle approximation
      
      return [
        radius * radiusAtY * Math.cos(theta),
        radius * y,
        radius * radiusAtY * Math.sin(theta)
      ];
    });
  }, []);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    
    // Slow rotation of the entire group
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
    }
    
    // Keep texts facing the camera without flipping
    textRefs.current.forEach((textRef, i) => {
      if (textRef && textRef.current) {
        const text = textRef.current;
        
        // Get world position of text
        const worldPos = new THREE.Vector3();
        text.getWorldPosition(worldPos);
        
        // Calculate direction from text to camera
        const direction = new THREE.Vector3();
        direction.subVectors(camera.position, worldPos).normalize();
        
        // Prevent flipping by constraining rotation
        const up = new THREE.Vector3(0, 1, 0);
        const right = new THREE.Vector3();
        right.crossVectors(up, direction).normalize();
        
        // Only rotate around Y axis to prevent flipping
        const angle = Math.atan2(direction.x, direction.z);
        text.rotation.set(0, angle, 0);
        
        // Subtle floating animation
        const originalPos = techPositions[i];
        const floatOffset = Math.sin(time * 0.3 + i * 0.5) * 0.05;
        text.position.set(
          originalPos[0],
          originalPos[1] + floatOffset,
          originalPos[2]
        );
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <Sphere args={[1.6, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff6b00"
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>
      
      {/* Technology labels */}
      {techSkills.map((skill, i) => {
        if (!textRefs.current[i]) {
          textRefs.current[i] = React.createRef();
        }
        
        const position = techPositions[i];
        
        return (
          <Text
            key={skill}
            ref={textRefs.current[i]}
            position={position}
            fontSize={0.12}
            color={
              i % 4 === 0 ? "#ff6b00" :  // Orange
              i % 4 === 1 ? "#ff8c3f" :  // Light orange
              i % 4 === 2 ? "#e55c00" :  // Dark orange
                           "#ffac7f"     // Very light orange
            }
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-medium.woff"
            maxWidth={2}
            textAlign="center"
          >
            {skill}
          </Text>
        );
      })}
      
      {/* Inner glow sphere */}
      <Sphere args={[1.4, 12, 12]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#ff6b00"
          transparent 
          opacity={0.05} 
        />
      </Sphere>
    </group>
  );
}
