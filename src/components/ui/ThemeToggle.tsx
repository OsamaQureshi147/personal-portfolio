"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  // Prevents hydration mismatch
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${
        resolvedTheme === "dark" ? "light" : "dark"
      } theme`}
    >
      <div className="relative h-6 w-6 overflow-hidden">
        {resolvedTheme === "dark" ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-6 w-6 rotate-0 scale-100 transition-all" />
          </motion.div>
        )}
      </div>
    </Button>
  );
}
