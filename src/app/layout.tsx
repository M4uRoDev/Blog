import type { Metadata } from "next";

import './globals.css';
import Layout from './components/Layout';
import { ThemeProvider } from "./components/ThemeContext";

export const metadata: Metadata = {
  title: "M4uRoDev's Blog",
  description: "Mi blog personal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}
