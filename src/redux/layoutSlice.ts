import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type BlockType = 'hero' | 'two-column' | 'image-grid';

export interface LayoutBlock {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}

interface LayoutState {
  blocks: LayoutBlock[];
  past: LayoutBlock[][];
  future: LayoutBlock[][];
}

const initialState: LayoutState = {
  blocks: [],
  past: [],
  future: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout(state, action: PayloadAction<LayoutBlock[]>) {
      state.blocks = action.payload;
      state.past = [];
      state.future = [];
    },

    addBlock(state, action: PayloadAction<LayoutBlock>) {
      state.past.push([...state.blocks]);
      state.blocks.push(action.payload);
      state.future = [];
    },

    removeBlock(state, action: PayloadAction<string>) {
      state.past.push([...state.blocks]);
      state.blocks = state.blocks.filter((b) => b.id !== action.payload);
      state.future = [];
    },
    moveBlock(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      state.past.push([...state.blocks]);

      const updated = [...state.blocks];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);

      state.blocks = updated;
      state.future = [];
    },

    undo(state) {
      if (state.past.length === 0) return;
      const previous = state.past.pop()!;
      state.future.push([...state.blocks]);
      state.blocks = previous;
    },

    redo(state) {
      if (state.future.length === 0) return;
      const next = state.future.pop()!;
      state.past.push([...state.blocks]);
      state.blocks = next;
    },
  },
});

export const {
  addBlock,
  removeBlock,
  moveBlock,
  undo,
  redo,
  setLayout,
} = layoutSlice.actions;

export default layoutSlice.reducer;

