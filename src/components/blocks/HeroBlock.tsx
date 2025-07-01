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
  return (
    <div
      style={{
        padding: '4rem 2rem',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '8px',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{heading}</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{subtitle}</p>
      <button style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '4px' }}>
        {cta}
      </button>
    </div>
  );
};

