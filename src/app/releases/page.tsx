"use client";

import { useEffect, useState } from "react";

interface Commit {
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
}

export default function ReleasesPage() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch("/api/commits");
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setCommits(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  
    fetchCommits();
  }, []);

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error: {error}</p>
        <p>Por favor verifica que el token sea válido y que el repositorio exista.</p>
      </div>
    );
  }

  if (!commits.length) {
    return <p>Cargando commits...</p>;
  }

  const formatMessage = (message: string) => {
    // Divide los mensajes en líneas separadas por "+"
    return message.split("+").map((line, index) => (
      <p key={index} className="mb-1">
        {line.trim()}
      </p>
    ));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-2/3 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Lista de Releases</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Aquí podemos ver la lista de commits realizados en el repositorio del blog, para fines prácticos dejaremos los commits, luego de que el proyecto crezca se podrán mostrar como releases de versiones, especificando su versión. Por ahora los distintos commits serán el release.
      </p>
      <ul className="space-y-6">
        {commits.map((commit, index) => (
          <li
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-100 dark:bg-gray-800 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-500">
                Commit #{commits.length - index}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(commit.commit.author.date)}
              </p>
            </div>
            <div className="text-gray-700 dark:text-gray-300 mt-2">
              {formatMessage(commit.commit.message)}
            </div>
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-sm text-blue-400 hover:underline"
            >
              Ver commit completo
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
