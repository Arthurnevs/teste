import type { Metadata } from "next";
import { LoveStory } from "./love-story";

export const metadata: Metadata = {
  title: "Para Angeliny, com amor",
  description: "Uma pequena surpresa feita de grandes sentimentos.",
};

export default function Home() {
  return <LoveStory />;
}
