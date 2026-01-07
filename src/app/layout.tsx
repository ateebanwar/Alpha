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
        <style dangerouslySetInnerHTML={{
          __html: `
            .no-animations * {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
            .no-animations .floating,
            .no-animations .floating-slow,
            .no-animations .floating-fast {
              animation: none !important;
            }
            .no-animations .neu-card,
            .no-animations .neu-circle,
            .no-animations .neu-tile {
              transition: none !important;
            }
            /* Allow CSS transitions in 3D carousel for overlay effects */
            .no-animations .carousel_component .carousel_overlay,
            .no-animations .carousel_component .carousel_item {
              transition-duration: 0.6s !important;
            }
            .no-animations .carousel_component .carousel_item {
              transition-duration: 0.3s !important;
            }
            /* Allow button transitions for default hover behavior */
            .no-animations button {
              transition-duration: 0.15s !important;
            }
          `
        }} />
      </head>
      <body className={`${outfit.variable} ${inter.variable} antialiased`} suppressHydrationWarning={true}>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
