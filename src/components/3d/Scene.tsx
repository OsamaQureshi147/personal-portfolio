'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { Vector3, Mesh, Group } from 'three';

// Define proper types for the Computer component
interface ComputerProps {
  position: [number, number, number];
  theme: string | undefined;
}

function Computer(props: ComputerProps) {
  const group = useRef<Group>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    // Animate scale on mount
    const timer = setTimeout(() => {
      setScale(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // In a real app, you'd use a model from a public repository
  // This is just a placeholder function since we can't load actual gLTF models
  const computerModel = () => {
    return (
      <mesh position={props.position} ref={group as any} scale={scale}>
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial
          color={props.theme === 'dark' ? '#ff8c3f' : '#ff6b00'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    );
  };

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return computerModel();
}

// Define proper types for the FloatingCube component
interface FloatingCubeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  rotationFactor?: number;
  size?: [number, number, number];
}

function FloatingCube({
  position,
  color,
  speed = 1,
  rotationFactor = 0.01,
  size = [0.3, 0.3, 0.3],
}: FloatingCubeProps) {
  const mesh = useRef<Mesh>(null);
  const initialPosition = useRef(new Vector3(...position));
  const [scale, setScale] = useState(0);

  useEffect(() => {
    // Animate scale on mount with a slight delay
    const timer = setTimeout(() => {
      setScale(1);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (mesh.current) {
      mesh.current.position.y =
        initialPosition.current.y + Math.sin(time * speed) * 0.1;

      mesh.current.rotation.x += rotationFactor;
      mesh.current.rotation.y += rotationFactor * 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface SceneContentProps {
  theme: string | undefined;
}

// Create a scene content component that will be rendered inside Canvas
function SceneContent({ theme }: SceneContentProps) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotate the entire group slowly
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Suspense fallback={null}>
        <group ref={groupRef}>
          <Computer position={[0, -0.5, 0]} theme={theme} />

          <FloatingCube
            position={[-1.5, 0.2, 0]}
            color={theme === 'dark' ? '#ff8c3f' : '#ff6b00'}
            speed={0.8}
            size={[0.4, 0.4, 0.4]}
          />
          <FloatingCube
            position={[1.5, 0.2, 0]}
            color={theme === 'dark' ? '#ff6b00' : '#e55c00'}
            speed={1.2}
            size={[0.3, 0.3, 0.3]}
          />
          <FloatingCube
            position={[0, 1, -0.5]}
            color={theme === 'dark' ? '#ffac7f' : '#ff8c3f'}
            speed={1}
            size={[0.25, 0.25, 0.25]}
          />
        </group>

        <Environment preset='city' />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.5}
      />
    </>
  );
}

export default function Scene() {
  const { resolvedTheme } = useTheme();

  return (
    <div className='h-[400px] w-full'>
      <Canvas>
        <SceneContent theme={resolvedTheme} />
      </Canvas>
    </div>
  );
}
