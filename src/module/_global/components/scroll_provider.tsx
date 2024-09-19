"use client";

import { useHookstate } from "@hookstate/core";
import { useEffect, useRef } from "react";
import { Box } from "@mantine/core";
import { currentScroll } from "../bin/val_global";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { set } = useHookstate(currentScroll);

  useEffect(() => {
    if (window) {
      const handleScroll = () => {
        if (containerRef.current) {
          set(containerRef);
        }
      };

      const container = containerRef.current;
      container?.addEventListener("scroll", handleScroll);

      return () => {
        container?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [containerRef, set]);
  return (
    <Box
      h={"100vh"}
      style={{ overflow: "auto", position: "relative" }}
      ref={containerRef}
    >
      {children}
    </Box>
  );
}

