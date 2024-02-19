import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from '@/components/bootstrap/bootstrap-client'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wordle for Discord",
  description: "Guess the Wordle with your Discord community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <BootstrapClient/>
    </html>
  );
}
