type HeroBlockProps = {
  heading?: string;
  subtitle?: string;
  cta?: string;
  backgroundImage?: string;
};

export const HeroBlock = ({
  heading = 'Default Heading',
  subtitle = 'Default subtitle goes here.',
  cta = 'Click Me',
  backgroundImage,
}: HeroBlockProps) => {
  const hasImage = !!backgroundImage;

  return (
    <div
      style={{
        position: 'relative',
        padding: '4rem 2rem',
        backgroundImage: hasImage
          ? `url(${backgroundImage})`
          : 'linear-gradient(45deg, #eee, #ccc)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: hasImage ? '#fff' : '#333',
        textAlign: 'center',
        borderRadius: '8px',
        overflow: 'hidden',
        minHeight: '300px',
      }}
    >
      {!hasImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#999',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            marginTop: "6rem"
          }}>
            Background Image
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{heading}</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{subtitle}</p>
        <button
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '4px',
            backgroundColor: '#00bcd4',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

