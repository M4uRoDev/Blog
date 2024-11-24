import { getSortedPostsData } from '../../lib/posts';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allPostsData = await getSortedPostsData();
  return allPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: PageProps) {
  const { slug } = await params;

  const allPostsData = await getSortedPostsData();
  const post = allPostsData.find((post) => post.slug === slug);

  if (!post) {
    return <div>Publicación no encontrada</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <article className="dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2 sm:mb-0">{post.title}</h1>
          <p className="text-gray-400 italic text-sm sm:text-base">{post.date}</p>
        </div>
        <div
          className="prose dark:prose-dark"
          dangerouslySetInnerHTML={{
            __html: post.contentHtml
              // Procesa imágenes con src antes que alt="float-left"
              .replace(
                /<img([^>]*?)src="([^"]+)"([^>]*?)alt="float-left"([^>]*)>/g,
                (_, before, src, middle, after) => {
                  return `<a href="${src}" target="_blank" rel="noopener noreferrer">
                    <img ${before} class="float-left sm:max-w-[20%] max-w-full max-h-100 object-contain mr-4 mb-2 rounded-lg shadow-lg" src="${src}" ${middle} ${after} />
                  </a>`;
                }
              )
              // Procesa imágenes con src antes que alt="float-right"
              .replace(
                /<img([^>]*?)src="([^"]+)"([^>]*?)alt="float-right"([^>]*)>/g,
                (_, before, src, middle, after) => {
                  return `<a href="${src}" target="_blank" rel="noopener noreferrer">
                    <img ${before} class="float-right sm:max-w-[20%] max-w-full max-h-100 object-contain ml-4 mb-2 rounded-lg shadow-lg" src="${src}" ${middle} ${after} />
                  </a>`;
                }
              )
              // Procesa imágenes sin alt específico (default case)
              .replace(
                /<img([^>]*?)src="([^"]+)"([^>]*)>/g,
                (_, before, src, after) => {
                  return `<a href="${src}" target="_blank" rel="noopener noreferrer">
                    <img ${before} class="max-w-full max-h-100 object-contain mb-4 rounded-lg shadow-lg" src="${src}" ${after} />
                  </a>`;
                }
              ),
          }}
        />
      </article>
    </div>
  );
}
