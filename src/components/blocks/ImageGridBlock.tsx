type ImageGridBlockProps = {
  images?: string[];
};

export const ImageGridBlock = ({ images = [] }: ImageGridBlockProps) => {
  const filledImages = [...images.slice(0, 4)];
  while (filledImages.length < 4) {
    filledImages.push('');
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#fafafa',
      }}
    >
      {filledImages.map((url, i) =>
        url ? (
          <img
            key={i}
            src={url}
            alt={`Grid Image ${i + 1}`}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '6px',
            }}
          />
        ) : (
          <div
            key={i}
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f0f0f0',
              border: '2px dashed #bbb',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
              fontStyle: 'italic',
              fontSize: '0.95rem',
            }}
          >
            Placeholder
          </div>
        )
      )}
    </div>
  );
};

