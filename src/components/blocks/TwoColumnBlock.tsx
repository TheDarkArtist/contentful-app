type TwoColumnBlockProps = {
  heading?: string;
  subtitle?: string;
  cta?: string;
  image?: string;
};

export const TwoColumnBlock = ({
  heading = 'Title Here',
  subtitle = 'Subtitle goes here.',
  cta = 'Learn More',
  image,
}: TwoColumnBlockProps) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{heading}</h2>
        <p style={{ marginBottom: '1rem' }}>{subtitle}</p>
        <button style={{ padding: '0.5rem 1rem' }}>{cta}</button>
      </div>
      {image && (
        <img
          src={image}
          alt={heading}
          style={{
            flex: 1,
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '4px',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  );
};

