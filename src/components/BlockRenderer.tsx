import { HeroBlock } from './blocks/HeroBlock';
import { TwoColumnBlock } from './blocks/TwoColumnBlock';
import { ImageGridBlock } from './blocks/ImageGridBlock';
import type { LayoutBlock } from '../redux/layoutSlice';

type BlockRendererProps = {
  block: LayoutBlock;
};

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  switch (block.type) {
    case 'hero':
      return <HeroBlock {...block.props} />;
    case 'twoColumn':
      return <TwoColumnBlock {...block.props} />;
    case 'imageGrid':
      return <ImageGridBlock {...block.props} />;
    default:
      return <div>Unknown block: {block.type}</div>;
  }
};

