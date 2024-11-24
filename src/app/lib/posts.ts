import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import directive from 'remark-directive';
import { visit } from 'unist-util-visit';
import { Node } from 'unist'; // Asegúrate de tener instalada la biblioteca 'unist'

interface ContainerDirectiveNode extends Node {
  type: 'containerDirective';
  name: string;
  data?: {
    hProperties?: {
      class?: string;
    };
  };
}

function attacher() {
  return (tree: Node) => {
    visit(tree, (node: Node) => {
      if ((node as ContainerDirectiveNode).type === 'containerDirective') {
        const containerNode = node as ContainerDirectiveNode;
        const data = containerNode.data || (containerNode.data = {});
        if (containerNode.name === 'float-left') {
          data.hProperties = { class: 'float-left max-w-[50%] mr-4 mb-2 rounded-lg shadow-lg' };
        } else if (containerNode.name === 'float-right') {
          data.hProperties = { class: 'float-right max-w-[50%] ml-4 mb-2 rounded-lg shadow-lg' };
        }
      }
    });
  };
}

const postsDirectory = path.join(process.cwd(), 'src/app/content/blog');

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      // Procesa Markdown con soporte para GFM
      const processedContent = await remark()
        .use(html)
        .use(gfm)
        .use(directive) // Soporte para directivas personalizadas
        .use(attacher) // Plugin personalizado para manejar clases en Markdown
        .process(content);
      // Convierte el contenido Markdown a HTML
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
