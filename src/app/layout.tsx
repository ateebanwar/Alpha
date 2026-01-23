import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: 200 30% 92%;
            }
            .dark, [data-layout="servicesSearch"], [data-layout="olympic"], [data-layout="3d-carousel"] {
              --background: 210 25% 12%;
            }
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
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
