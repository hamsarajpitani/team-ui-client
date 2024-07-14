import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeamList } from './api';
import { addIds } from 'utils/helpers/addIds';

const initialState = {
    teams: [],
    loading: true,
    error: null,
    selectedTeam: null,
};

export const fetchteams = createAsyncThunk(
    'IpoList/fetchteams',
    async (arg, { rejectWithValue }) => {
        try {
            const data = await fetchTeamList()
            return addIds(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const teamListSlice = createSlice({
    name: 'teamList',
    initialState,
    reducers: {
        clearSelecteTeam(state) {
            state.selectedTeam = null;
        },
        updateTeam: (state, action) => {
            const data = action.payload;
            const { id } = data
            const itemIndex = state.teams.findIndex(({ id: ipoId }) => ipoId === id);
            if (itemIndex >= 0 && itemIndex < state.teams.length) {
                state.teams[itemIndex] = { ...state.teams[itemIndex], ...data };
            }
        },
        deleteTeamItem: (state, action) => {
            const data = action.payload;
            const { id } = data
            state.teams = state.teams.filter(item => item.id !== id);
        },
        deleteBulkItem: (state, action) => {
            const data = action.payload;
            const Ids = Object.entries(data).map(([key, value]) => value ? key : false).filter(Boolean);
            state.teams = state.teams.filter(item => !Ids.includes(item.id));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchteams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchteams.fulfilled, (state, action) => {
                state.loading = false;
                state.teams = action.payload;
            })
            .addCase(fetchteams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred fetching Ipos';
            })
    },
});

export const { clearSelecteTeam, updateTeam, deleteTeamItem, deleteBulkItem } = teamListSlice.actions;
export default teamListSlice.reducer;
