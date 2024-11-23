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

export default async function Post({ params }: PageProps){
  const { slug } = await params;

  const allPostsData = await getSortedPostsData();
  const post = allPostsData.find((post) => post.slug === slug);

  if (!post) {
    return <div>Publicación no encontrada</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <article className="bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400">{post.title}</h1>
          <p className="text-gray-400 italic">{post.date}</p>
        </div>
        <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  );
}