import Link from "next/link";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="flex flex-col min-h-screen">
          <header className="header">
            <Link href="/">
              <h1>M4uRoDev's Blog</h1>
            </Link>
          </header>
          <main className="flex-1 content">
            {children}
          </main>
          <footer className="footer">
            <p>&copy; 2024 Mi Blog</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
