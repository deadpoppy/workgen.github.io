import ImageGallery from '../components/ImageGallery';

const previewImages = [
  { src: '/images/preview/desktop-1.jpg', alt: '桌面端预览' },
  { src: '/images/preview/mobile-1.png', alt: '移动端预览' },
  { src: '/images/features/ai-preview.webp', alt: 'AI功能预览' }
];

export default function Home() {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">项目预览</h2>
      <ImageGallery images={previewImages} />
    </section>
  );
} 