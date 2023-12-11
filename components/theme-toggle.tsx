"use client";

import { Button, ButtonClasses } from "@/components/ui/button";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { AnimatePresence, MotionConfig, Variants, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionMoonIcon = motion(MoonIcon);
const MotionSunIcon = motion(SunIcon);

const toggleVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function ThemeToggle({
  className,
}: {
  className?: ButtonClasses;
}) {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className={cn(
        "hover:bg-transparent dark:hover:bg-transparent",
        className,
      )}
      aria-label={
        theme === "dark" ? "switch to light theme" : "switch to dark theme"
      }
    >
      <MotionConfig transition={{ duration: 0.15 }}>
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <MotionMoonIcon
              key="moon"
              variants={toggleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          ) : (
            <MotionSunIcon
              key="sun"
              variants={toggleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          )}
        </AnimatePresence>
      </MotionConfig>
    </Button>
  );
}
