export default function ImageGallery({ images }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {images.map((img, i) => (
        <HoverImage key={i} src={img.src} alt={img.alt} />
      ))}
    </div>
  );
} 