import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIpoList } from './api';
import { addIds } from 'utils/helpers/addIds';

const initialState = {
    Ipos: [],
    loading: true,
    error: null,
    selectedIpo: null,
};

export const fetchIpos = createAsyncThunk(
    'IpoList/fetchIpoList',
    async (arg, { rejectWithValue }) => {
        try {
            const data = await fetchIpoList()
            return addIds(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const IpoListSlice = createSlice({
    name: 'IpoList',
    initialState,
    reducers: {
        clearSelectedIpo(state) {
            state.selectedIpo = null;
        },
        updateIpo: (state, action) => {
            const data = action.payload;
            const { id } = data
            const itemIndex = state.Ipos.findIndex(({ id: ipoId }) => ipoId === id);
            if (itemIndex >= 0 && itemIndex < state.Ipos.length) {
                state.Ipos[itemIndex] = { ...state.Ipos[itemIndex], ...data };
            }
        },
        deleteIpoItem: (state, action) => {
            const data = action.payload;
            const { id } = data
            state.Ipos = state.Ipos.filter(item => item.id !== id);
        },
        deleteBulkItem: (state, action) => {
            const data = action.payload;
            const Ids = Object.entries(data).map(([key, value]) => value ? key : false).filter(Boolean);
            console.log({ Ids })
            state.Ipos = state.Ipos.filter(item => !Ids.includes(item.id));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIpos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIpos.fulfilled, (state, action) => {
                state.loading = false;
                state.Ipos = action.payload;
            })
            .addCase(fetchIpos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred fetching Ipos';
            })
    },
});

export const { clearSelectedIpo, updateIpo, deleteIpoItem, deleteBulkItem } = IpoListSlice.actions;
export default IpoListSlice.reducer;
