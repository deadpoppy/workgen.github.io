export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        {children}
      </div>
    </div>
  );
} 