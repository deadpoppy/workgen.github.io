import Header from './Header';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <ThemeToggle className="fixed bottom-4 right-4" />
    </div>
  );
} 