import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "./providers";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});



export const metadata: Metadata = {
  title: "Alphabet Consultancy Services | IT Consulting & Development",
  description: "Alphabet Consultancy Services - Premium IT consulting, web development, mobile apps, cloud solutions, and digital transformation. 8+ years of excellence serving UK and international clients.",
  keywords: "IT consulting, web development, mobile apps, cloud services, UK, technology solutions",
  openGraph: {
    title: "Alphabet Consultancy Services | IT Consulting & Development",
    description: "Alphabet Consultancy Services - Premium IT consulting, web development, mobile apps, cloud solutions, and digital transformation.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alphabet Consultancy Services | IT Consulting & Development",
    description: "Alphabet Consultancy Services - Premium IT consulting, web development, mobile apps, cloud solutions, and digital transformation.",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
