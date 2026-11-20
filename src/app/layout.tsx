import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:{default:"KRAFENIO | Passion in Every Line of Code",template:"%s | KRAFENIO"},description:"Global software engineering and technology company."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body suppressHydrationWarning>{children}</body></html>; }
