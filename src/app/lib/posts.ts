import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/app/content/blog');

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      // Convierte el contenido Markdown a HTML
      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      return {
        slug: fileName.replace(/\.md$/, ''),
        ...(data as { title: string; date: string, image?: string }),
        contentHtml,
      };
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
