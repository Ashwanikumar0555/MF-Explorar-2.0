// import "./globals.css";
// import { ReactNode } from "react";
// import { QueryProvider } from "../providers/QueryProvider"; // Correct named import
// import { ThemeProvider } from "../providers/ThemeProvider";
// import Navbar from "../components/organisms/Navbar";
// import Footer from "../components/organisms/Footer";

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <QueryProvider>
//           <ThemeProvider>
//             <Navbar />
//             <main className="min-h-screen p-4">{children}</main>
//             <Footer />
//           </ThemeProvider>
//         </QueryProvider>
//       </body>
//     </html>
//   );
// }



import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from "react";
import { QueryProvider } from "../providers/QueryProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mutual Fund Explorer',
  description: 'Explore mutual funds',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen p-4">{children}</main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
