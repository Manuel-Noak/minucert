// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FooterWrapper from "./(components)/FooterWrapper";
import "./globals.css";
import { AppProvider } from "./(state)/state";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MinuCert | Trusted AI Certification & Training Platform",
  description:
    "Discover and enroll in top AI courses with MinuCert, the trusted platform partnered with leading AI providers worldwide. Get certified and advance your career in artificial intelligence.",
  keywords: [
    "AI courses",
    "artificial intelligence certification",
    "online AI training",
    "AI learning platform",
    "machine learning courses",
    "MinuCert",
    "AI providers",
    "AI education",
  ],
  openGraph: {
    title: "MinuCert | Trusted AI Certification & Training Platform",
    description:
      "Advance your career with AI certifications from MinuCert. Learn from top providers, access cutting-edge AI courses, and get globally recognized credentials.",
    url: "https://www.minucert.com", // update with your real domain
    siteName: "MinuCert",
    images: [
      {
        url: "/logo.png", // update with your OG image path
        width: 1200,
        height: 630,
        alt: "MinuCert - AI Courses and Certifications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MinuCert | Trusted AI Certification & Training Platform",
    description:
      "Learn AI online with MinuCert. Access top courses, certifications, and training from global providers.",
    images: ["/logo.png"],
    creator: "@minucert",
  },
  alternates: {
    canonical: "https://www.minucert.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AppProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </AppProvider>
        <FooterWrapper />
      </body>
    </html>
  );
}
