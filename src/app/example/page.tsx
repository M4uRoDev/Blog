import Link from "next/link";

export default function ExamplePage() {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-6">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">Página de Ejemplo</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Esta es una página de ejemplo fuera del contenido del blog. Puedes personalizarla como desees.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
