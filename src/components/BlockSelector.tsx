import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addBlock } from '../redux/layoutSlice';
import type { AppDispatch } from '../redux/store';
import "./block-selector.css"

export type BlockType = 'hero' | 'twoColumn' | 'imageGrid';

export type LayoutBlock = {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
};

const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  { type: 'hero', label: 'Hero Block' },
  { type: 'twoColumn', label: 'Two Column Row' },
  { type: 'imageGrid', label: '2x2 Image Grid' },
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
    <div>
      <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>Add Blocks</h3>
      <ul className="block-controls">
        {BLOCK_TYPES.map((block) => (
          <li key={block.type}>
            <button className="block-btn" onClick={() => handleAdd(block.type)}>
              {block.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

