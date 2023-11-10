import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";

import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Mon site portfolio réalisé avec Next.js ",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html className="" lang="en">
//       <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
//         <Provider>
//           <main className="relative overflow-hidden">
//             <Navbar />
//             {children}
//             <Footer />
//           </main>
//         </Provider>
//       </body>
//     </html>
//   );
// }

const RootLayout = ({ children }) => (
  <html className="" lang="en">
    <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Provider>
        <main className="relative overflow-hidden">
          <Navbar />
          {children}
          <Footer />
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
