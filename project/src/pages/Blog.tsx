import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, AlertCircle } from 'lucide-react';
import { getAllBlogPosts } from '../utils/blogLoader';
import { useState, useEffect } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState<ReturnType<typeof getAllBlogPosts>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const loadedPosts = getAllBlogPosts();
      console.log('Blog posts loaded:', loadedPosts.length);
      if (loadedPosts.length === 0) {
        console.warn('Debug: 0 posts found. Check glob path: ../content/blog/*.md');
      }
      setPosts(loadedPosts);
      setError(null);
    } catch (err) {
      console.error('Error loading blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Blog</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Expert advice on digital marketing, SEO, and lead generation strategies
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {post.description}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group-hover:gap-3"
                  >
                    Read More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-xl text-slate-600 mb-4">
              No blog posts found. Check back soon!
            </p>
            {import.meta.env.DEV && (
              <p className="text-sm text-slate-500 mb-4 font-mono">
                Debug: 0 posts found. Glob path: ../content/blog/*.md
              </p>
            )}
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Go to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
