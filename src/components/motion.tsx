"use client";

import React from "react";
import { motion } from "framer-motion";

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function Motion({ children, className, ...props }: MotionProps) {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}
