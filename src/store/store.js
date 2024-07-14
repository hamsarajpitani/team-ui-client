import { configureStore } from '@reduxjs/toolkit';
import teamSlice from 'features/Team/teamSlice';

const store = configureStore({
    reducer: {
        teamState: teamSlice
    },
});

export default store;