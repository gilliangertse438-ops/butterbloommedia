import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, AlertCircle } from 'lucide-react';
import { getBlogPostBySlug } from '../utils/blogLoader';
import { useState, useEffect } from 'react';
import { marked } from 'marked';
import type { BlogPost as BlogPostType } from '../types/blog';
import '../styles/blog.css';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      const loadedPost = getBlogPostBySlug(slug);
      setPost(loadedPost || null);
      setError(null);
    } catch (err) {
      console.error('Error loading blog post:', err);
      setError('Failed to load blog post. Please try again later.');
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Post</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            The blog post you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-5 h-5 text-slate-600" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {import.meta.env.DEV && (!post.body || post.body.length === 0) && (
          <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-1">Debug: Post body is empty</h3>
                <p className="text-yellow-800 text-sm">
                  Check markdown file and loader parsing. The body field should contain markdown content.
                </p>
                <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify({ slug: post.slug, bodyLength: post.body?.length || 0, htmlLength: post.html?.length || 0 }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-white shadow-lg p-8 md:p-12">
          {/* Using dangerouslySetInnerHTML for markdown content.
              Note: Content is from trusted markdown files bundled at build time.
              For user-generated content, use a sanitization library like DOMPurify. */}
          <article
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.html || marked.parse(post.body || '') }}
          />
        </div>

        <div className="mt-12 p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to grow your business?
          </h3>
          <p className="text-slate-700 mb-6">
            Let's discuss how our digital marketing strategies can help you generate more leads and achieve your business goals.
          </p>
          <Link
            to="/#contact"
            className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
          >
            Get Started Today
          </Link>
        </div>
      </article>
    </div>
  );
}
