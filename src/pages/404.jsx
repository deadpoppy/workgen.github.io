import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <h1 className="text-9xl font-bold mb-4 animate-pulse">404</h1>
      <p className="text-xl mb-8">页面未找到 - 你来到了未知领域</p>
      <Link href="/" className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm">
        返回首页
      </Link>
    </div>
  );
} 