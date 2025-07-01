import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addBlock } from '../redux/layoutSlice';
import type { AppDispatch } from '../redux/store';

export type BlockType = 'hero' | 'two-column' | 'image-grid';

export type LayoutBlock = {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
};

const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  { type: 'hero', label: 'Hero Block' },
  { type: 'two-column', label: 'Two Column Row' },
  { type: 'image-grid', label: '2x2 Image Grid' },
];

const createBlock = (type: BlockType): LayoutBlock => ({
  id: nanoid(),
  type,
  props: {},
});

export const BlockSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (type: BlockType) => {
    dispatch(addBlock(createBlock(type)));
  };

  return (
    <div className="block-selector">
      <h3>Add a Block</h3>
      <ul>
        {BLOCK_TYPES.map((block) => (
          <li key={block.type}>
            <button onClick={() => handleAdd(block.type)}>{block.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

