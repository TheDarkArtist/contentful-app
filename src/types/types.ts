export type ImageGridBlockProps = {
  images?: string[];
};
export type TwoColumnBlockProps = {
  heading?: string;
  subtitle?: string;
  cta?: string;
  image?: string;
};
export type HeroBlockProps = {
  heading?: string;
  subtitle?: string;
  cta?: string;
  backgroundImage?: string;
};

export type LayoutBlock = {
  id: string;
  type: 'hero' | 'two-column' | 'image-grid';
  props: HeroBlockProps | TwoColumnBlockProps | ImageGridBlockProps;
};

