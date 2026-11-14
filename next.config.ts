import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Development and production must not overwrite each other's generated files.
export default function nextConfig(phase: string): NextConfig {
  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    // Static portfolio metadata needs no streaming boundary during hydration.
    htmlLimitedBots: /.*/,
  };
}
