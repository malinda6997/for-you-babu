import Welcome from "@/components/Welcome";
import Hero from "@/components/Hero";
import RomanticNote from "@/components/RomanticNote";
import Memories from "@/components/Memories";
import Apology from "@/components/Apology";
import FinalMessage from "@/components/FinalMessage";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Welcome />
      <Hero />
      <RomanticNote />
      <Memories />
      <Apology />
      <FinalMessage />
    </main>
  );
}