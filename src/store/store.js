import { configureStore } from '@reduxjs/toolkit';
import teamSlice from 'features/Team/teamSlice';

const store = configureStore({
    reducer: {
        ipoState: teamSlice
    },
});

export default store;