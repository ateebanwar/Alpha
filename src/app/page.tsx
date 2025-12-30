import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Alphabet Consultancy Services | IT Consulting & Development",
  description: "Alphabet Consultancy Services - Premium IT consulting, web development, mobile apps, cloud solutions, and digital transformation. 8+ years of excellence serving UK and international clients.",
  keywords: "IT consulting, web development, mobile apps, cloud services, UK, technology solutions",
  alternates: {
    canonical: "https://alphabetconsultancy.com",
  },
};

export default function Home() {
  return <HomeClient />;
}
