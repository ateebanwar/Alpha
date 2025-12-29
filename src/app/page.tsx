import type { Metadata } from "next";
import CircleGrid from "@/components/CircleGrid";

export const metadata: Metadata = {
  title: "Alphabet Consultancy Services | IT Consulting & Development",
  description: "Alphabet Consultancy Services - Premium IT consulting, web development, mobile apps, cloud solutions, and digital transformation. 8+ years of excellence serving UK and international clients.",
  keywords: "IT consulting, web development, mobile apps, cloud services, UK, technology solutions",
  alternates: {
    canonical: "https://alphabetconsultancy.com",
  },
};

export default function Home() {
  return (
    <main className="fixed inset-0 bg-background flex flex-col p-0">
      <header className="fixed top-[10px] left-0 right-0 z-30 text-center pointer-events-none">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
          Alphabet
          <span className="text-gradient ml-2">Consultancy Services</span>
        </h1>
      </header>

      <div className="flex-1 relative mt-[70px] overflow-hidden">
        <CircleGrid />
      </div>
    </main>
  );
}
