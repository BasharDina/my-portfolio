import type { Metadata } from "next";
import ExperienceRoot from "../components/experience/ExperienceRoot";

export const metadata: Metadata = {
  title: "Interactive Experience",
  description:
    "Immersive WebGL portfolio experience with cinematic scroll-story, 3D visuals, and premium motion design by Bashar Emad.",
  openGraph: {
    title: "Interactive Experience — Bashar Emad",
    description: "Immersive WebGL portfolio with cinematic scroll-story and 3D visuals.",
  },
};

export default function Page() {
  return <ExperienceRoot />;
}
