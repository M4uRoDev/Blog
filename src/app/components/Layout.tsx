import Link from "next/link";
import "../globals.css";

import { ThemeToggle } from "./ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const commitHash = process.env.VERCEL_GIT_COMMIT_SHA ? process.env.VERCEL_GIT_COMMIT_SHA : "dev";
  const repoUrl = process.env.VERCEL_GIT_REPO_SLUG ? "https://github.com/M4uRoDev/Blog/" : "#";

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="flex flex-col min-h-screen">
          <header className="fixed header flex justify-between items-center px-4 py-4">
            {/* Título centrado a la izquierda */}
            <Link href="/">
              <h1 className="text-2xl font-bold">M4uRoDev&apos;s Blog</h1>
            </Link>
            {/* ThemeToggle en la esquina superior derecha */}
            <div className="text-sm">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 mt-10 content">{children}</main>
          <footer className="relative footer flex justify-center items-center">
            <p className="text-center">&copy; 2024 Mi Blog</p>
            <a
              href="https://github.com/M4uRoDev/Blog"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-8 h-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/* Marca de agua con enlace */}
            <a
              href={`${repoUrl}/commit/${commitHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 left-2 text-xs text-gray-400 dark:text-gray-600 hover:underline"
            >
              Commit: {commitHash.slice(0, 7)} {/* Solo primeros 7 caracteres */}
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
