import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PG {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  availability: boolean;
}

interface PGState {
  pgs: PG[];
  loading: boolean;
  error: string | null;
}

const initialState: PGState = {
  pgs: [],
  loading: false,
  error: null,
};

const pgSlice = createSlice({
  name: 'pg',
  initialState,
  reducers: {
    setPGs: (state, action: PayloadAction<PG[]>) => {
      state.pgs = action.payload;
      state.loading = false;
    },
    addPG: (state, action: PayloadAction<PG>) => {
      state.pgs.push(action.payload);
    },
    updatePG: (state, action: PayloadAction<PG>) => {
      const index = state.pgs.findIndex((pg) => pg.id === action.payload.id);
      if (index !== -1) {
        state.pgs[index] = action.payload;
      }
    },
    deletePG: (state, action: PayloadAction<string>) => {
      state.pgs = state.pgs.filter((pg) => pg.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPGs, addPG, updatePG, deletePG, setLoading, setError } = pgSlice.actions;
export default pgSlice.reducer;