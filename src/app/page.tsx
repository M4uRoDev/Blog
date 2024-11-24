import { getSortedPostsData } from './lib/posts';
import Link from 'next/link';

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="flex flex-col items-center flex-1 py-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Publicaciones Recientes</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {allPostsData.map(({ slug, title, date, image }) => (
          <li
            key={slug}
            className="relative rounded-lg shadow-md overflow-hidden group h-40 w-80 flex items-end"
            style={{
              backgroundImage: image
                ? `url(${image})`
                : `url('/images/default-bg-1.webp')`, // Fondo default si no hay imagen
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Capa de color desvanecido */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition duration-300"></div>

            <Link href={`/posts/${slug}`}>
              <div className="relative z-10 p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-300">{date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}