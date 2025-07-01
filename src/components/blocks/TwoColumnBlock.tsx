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
        justifyContent: 'space-evenly',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '10px',
        background: '#fafafa',
        minHeight: '300px',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{heading}</h2>
        <p style={{ margin: 0, fontSize: '1.1rem', color: '#555' }}>{subtitle}</p>
        <button
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            background: '#00bcd4',
            color: '#fff',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            width: 'fit-content',
          }}
        >
          {cta}
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: image ? 'transparent' : '#f0f0f0',
          border: image ? 'none' : '2px dashed #aaa',
        }}
      >
        {image ? (
          <img
            src={image}
            alt={heading}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '6px',
            }}
          />
        ) : (
          <span style={{ color: '#777', fontStyle: 'italic' }}>Image Placeholder</span>
        )}
      </div>
    </div>
  );
};

