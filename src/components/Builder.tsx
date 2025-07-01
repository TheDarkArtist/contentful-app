import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { moveBlock, undo, redo, setLayout } from '../redux/layoutSlice';
import { BlockRenderer } from './BlockRenderer';
import { BlockSelector } from './BlockSelector';
import type { EditorAppSDK } from '@contentful/app-sdk';

type BuilderProps = {
  sdk: EditorAppSDK;
};

export const Builder = ({ sdk }: BuilderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const layout = useSelector((state: RootState) => state.layout.blocks);
  const canUndo = useSelector((state: RootState) => state.layout.past.length > 0);
  const canRedo = useSelector((state: RootState) => state.layout.future.length > 0);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isSavingRef = useRef(false);

  useEffect(() => {
    const loadInitialLayout = async () => {
      try {
        const layoutField = sdk.entry.fields.layoutConfig;
        if (!layoutField) {
          console.warn('[builder] layoutConfig field not found');
          setIsInitialized(true);
          return;
        }

        const saved = await layoutField.getValue();
        if (Array.isArray(saved) && saved.length > 0) {
          dispatch(setLayout(saved));
          console.info('[builder] loaded layout from layoutConfig:', saved.length, 'blocks');
        } else {
          console.info('[builder] no saved layoutConfig found, starting with empty layout');
        }
      } catch (error) {
        console.error('[builder] failed to load initial layout:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadInitialLayout();
  }, [sdk, dispatch]);

  useEffect(() => {
    if (!isInitialized || isSavingRef.current) {
      return;
    }

    const saveLayout = async () => {
      try {
        isSavingRef.current = true;
        const layoutField = sdk.entry.fields.layoutConfig;

        if (layoutField && 'setValue' in layoutField) {
          await layoutField.setValue(layout);
          console.info('[builder] layout saved to layoutConfig');
        }
      } catch (error) {
        console.error('[builder] failed to save layout:', error);
      } finally {
        isSavingRef.current = false;
      }
    };

    const timeoutId = setTimeout(saveLayout, 500);
    return () => clearTimeout(timeoutId);
  }, [layout, sdk, isInitialized]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';

    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();

    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      dispatch(moveBlock({ from: draggedIndex, to: targetIndex }));
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (!isInitialized) {
    return (
      <div className="builder">
        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
          Loading layout...
        </div>
      </div>
    );
  }

  return (
    <div className="builder">
      <BlockSelector />

      <div className="controls" style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => dispatch(undo())}
          disabled={!canUndo}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: canUndo ? '#fff' : '#f5f5f5',
            cursor: canUndo ? 'pointer' : 'not-allowed',
          }}
        >
          Undo
        </button>
        <button
          onClick={() => dispatch(redo())}
          disabled={!canRedo}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: canRedo ? '#fff' : '#f5f5f5',
            cursor: canRedo ? 'pointer' : 'not-allowed',
          }}
        >
          Redo
        </button>
      </div>

      <div className="block-list">
        {layout.length === 0 ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#666',
            border: '2px dashed #ccc',
            borderRadius: '4px',
            background: '#fafafa'
          }}>
            No blocks added yet. Use the block selector above to add your first block.
          </div>
        ) : (
          layout.map((block, index) => (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              style={{
                marginBottom: '1rem',
                border: dragOverIndex === index ? '2px solid #007acc' : '1px dashed #aaa',
                padding: '0.5rem',
                cursor: 'move',
                background: draggedIndex === index ? '#f0f0f0' : '#f8f8f8',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                opacity: draggedIndex === index ? 0.8 : 1,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
                fontSize: '0.8rem',
                color: '#666'
              }}>
                <span>Block {index + 1}: {block.type}</span>
                <span style={{ cursor: 'grab' }}>⋮⋮</span>
              </div>
              <BlockRenderer block={block} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
