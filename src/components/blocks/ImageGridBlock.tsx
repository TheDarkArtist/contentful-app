type ImageGridBlockProps = {
  images?: string[];
};

export const ImageGridBlock = ({ images = [] }: ImageGridBlockProps) => {
  const safeImages = images.slice(0, 4);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      {safeImages.map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`Grid Image ${i + 1}`}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
  );
};

