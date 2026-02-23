import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                We encountered an error while loading this page.
              </p>
            </div>

            {this.state.error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="font-semibold text-red-800 mb-2">Error Details:</h2>
                <p className="text-sm text-red-700 font-mono break-all">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-semibold text-red-800 hover:text-red-900">
                      Show stack trace
                    </summary>
                    <pre className="mt-2 text-xs text-red-700 overflow-auto max-h-64 p-2 bg-red-100 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Reload Page
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold text-center"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
