import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { moveBlock, undo, redo, setLayout } from '../redux/layoutSlice';
import { BlockRenderer } from './BlockRenderer';
import { BlockSelector } from './BlockSelector';
import type { KnownAppSDK } from 'contentful-ui-extensions-sdk';

type BuilderProps = {
  sdk: KnownAppSDK;
};

type FieldCapableSDK = KnownAppSDK & {
  field: {
    getValue: () => Promise<unknown>;
    setValue: (value: unknown) => Promise<unknown>;
  };
};

function isFieldCapableSDK(sdk: KnownAppSDK): sdk is FieldCapableSDK {
  return (
    typeof sdk === 'object' &&
    sdk !== null &&
    'field' in sdk &&
    typeof (sdk as unknown as Record<string, unknown>).field === 'object' &&
    typeof (sdk as FieldCapableSDK).field.getValue === 'function'
  );
}

export const Builder = ({ sdk }: BuilderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const layout = useSelector((state: RootState) => state.layout.blocks);
  const canUndo = useSelector((state: RootState) => state.layout.past.length > 0);
  const canRedo = useSelector((state: RootState) => state.layout.future.length > 0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadInitialLayout = async () => {
      if (isFieldCapableSDK(sdk)) {
        const saved = await sdk.field.getValue();
        if (Array.isArray(saved)) {
          dispatch(setLayout(saved));
          console.info('[builder] loaded layout from Contentful');
        } else {
          console.info('[builder] no saved layout found');
        }
      } else {
        console.warn('[builder] sdk is not field-capable');
      }
    };

    loadInitialLayout();
  }, [sdk, dispatch]);

  useEffect(() => {
    if (isFieldCapableSDK(sdk)) {
      sdk.field.setValue(layout);
    }
  }, [layout, sdk]);


  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Required to allow drop
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      dispatch(moveBlock({ from: draggedIndex, to: targetIndex }));
    }
    setDraggedIndex(null);
  };

  return (
    <div className="builder">
      <BlockSelector />

      <div className="controls" style={{ marginBottom: '1rem' }}>
        <button onClick={() => dispatch(undo())} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={() => dispatch(redo())} disabled={!canRedo}>
          Redo
        </button>
      </div>

      <div className="block-list">
        {layout.map((block, index) => (
          <div
            key={block.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            style={{
              marginBottom: '1rem',
              border: '1px dashed #aaa',
              padding: '0.5rem',
              cursor: 'move',
              background: '#f8f8f8',
            }}
          >
            <BlockRenderer block={block} />
          </div>
        ))}
      </div>
    </div>
  );
};

