import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteMember, deleteMembers, fetchMembers, fetchTeamList, updateMember } from './api';

const initialState = {
    teams: [],
    loading: true,
    error: null,
    pagination: null,
    selectedTeam: null,
    currentPage: 0,
};

export const fetchteams = createAsyncThunk(
    'IpoList/fetchteams',
    async (page = 0, { rejectWithValue }) => {
        try {
            const data = await fetchMembers(page + 1)
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateMemberAsync = createAsyncThunk(
    'teamList/updateMember',
    async (memberData, { rejectWithValue }) => {
        try {
            const response = await updateMember(memberData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteMemberAsync = createAsyncThunk(
    'teamList/deleteMember',
    async (memberId, { rejectWithValue }) => {
        try {
            const response = await deleteMember(memberId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteMembersAsync = createAsyncThunk(
    'teamList/deleteMembers',
    async (memberIds, { rejectWithValue }) => {
        try {
            await deleteMembers(memberIds);
            return memberIds;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchteams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchteams.fulfilled, (state, action) => {
                state.loading = false;
                state.teams = action.payload.items;
                state.pagination = action.payload.count
            })
            .addCase(fetchteams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred fetching Ipos';
            })
            .addCase(updateMemberAsync.fulfilled, (state, action) => {
                const updatedMember = action.payload;
                const itemIndex = state.teams.findIndex(({ _id: ipoId }) => ipoId === updatedMember._id);
                if (itemIndex >= 0 && itemIndex < state.teams.length) {
                    state.teams[itemIndex] = { ...state.teams[itemIndex], ...updatedMember };
                }
            })
            .addCase(deleteMemberAsync.fulfilled, (state, action) => {
                state.teams = state.teams.filter((member) => member._id !== action.payload);
            })
            .addCase(deleteMembersAsync.fulfilled, (state, action) => {
                state.teams = state.teams.filter(item => !action.payload.includes(item._id));
            });
    },
});

export const { clearSelecteTeam } = teamListSlice.actions;
export default teamListSlice.reducer;
