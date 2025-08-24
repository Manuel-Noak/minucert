// Create a new file: app/(components)/FooterWrapper.tsx
"use client";
import { usePathname } from "next/navigation";
import Footer from "./(footer)/footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Define paths where footer should be hidden
  const hideFooterPaths = ['/dashboard', '/signin', '/admin'];
  
  // Check if current path should hide footer
  const shouldHideFooter = hideFooterPaths.some(path => 
    pathname?.toLowerCase().includes(path.toLowerCase())
  );

  // Only render footer if it shouldn't be hidden
  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}