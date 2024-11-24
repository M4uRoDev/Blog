import { getSortedPostsData } from './lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="flex flex-col items-center flex-1 py-4 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Publicaciones Recientes</h2>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl px-4" // Disminuye el gap general
        style={{
          gridAutoFlow: 'row', // Asegura que los elementos se agreguen de izquierda a derecha
          gridAutoRows: '10px', // Reduce la base para alturas dinámicas, disminuyendo la separación vertical
        }}
      >
        {allPostsData.map(({ slug, title, date, image }) => (
          <li
            key={slug}
            className="relative rounded-lg shadow-md overflow-hidden group border dark:border-sky-500"
            style={{
              gridRowEnd: `span ${Math.ceil(Math.random() * 3 + 5)}`, // Altura aleatoria respetando el contenido
            }}
          >
            {/* Imagen optimizada o imagen predeterminada */}
            <div className="relative w-full h-full">
              <Image
                src={image || '/images/default-bg-1.webp'}
                alt={title}
                layout="fill"
                className="object-cover"
                priority={true}
              />
            </div>
            {/* Contenido del card */}
            <Link href={`/posts/${slug}`}>
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 bg-gradient-to-t from-gray-800 dark:from-sky-800 hover:from-sky-800/20 border-sky-950 text-white">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm">{date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
