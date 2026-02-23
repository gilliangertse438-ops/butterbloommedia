import fm from 'front-matter';
import { marked } from 'marked';
import type { BlogPost, BlogFrontmatter } from '../types/blog';

const blogPostModules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

export function getAllBlogPosts(): BlogPost[] {
  try {
    const posts: BlogPost[] = [];

    for (const path in blogPostModules) {
      try {
        const rawContent = blogPostModules[path];

        if (!rawContent || typeof rawContent !== 'string') {
          if (import.meta.env.DEV) {
            console.warn(`Invalid content for ${path}`);
          }
          continue;
        }

        const parsed = fm<BlogFrontmatter>(rawContent);
        const frontmatter = parsed.attributes;

        if (!frontmatter.title || !frontmatter.description) {
          if (import.meta.env.DEV) {
            console.warn(`Missing required frontmatter fields in ${path}`);
          }
          continue;
        }

        const slug = path
          .split('/')
          .pop()
          ?.replace('.md', '') || '';

        const body = parsed.body ?? '';
        const html = marked.parse(body) as string;

        let tags: string[] = [];
        if (Array.isArray(frontmatter.tags)) {
          tags = frontmatter.tags;
        } else if (typeof frontmatter.tags === 'string') {
          tags = frontmatter.tags.split(',').map(t => t.trim()).filter(Boolean);
        }

        posts.push({
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          author: frontmatter.author || 'Unknown',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          tags,
          body,
          html,
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(`Error processing blog post at ${path}:`, error);
        }
      }
    }

    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    if (import.meta.env.DEV) {
      console.log('Loaded posts:', sortedPosts.map(p => ({
        slug: p.slug,
        bodyLength: p.body.length,
        htmlLength: p.html.length
      })));
    }

    return sortedPosts;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error loading blog posts:', error);
    }
    return [];
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  try {
    const posts = getAllBlogPosts();
    return posts.find(post => post.slug === slug);
  } catch (error) {
    console.error(`Error getting blog post with slug ${slug}:`, error);
    return undefined;
  }
}
