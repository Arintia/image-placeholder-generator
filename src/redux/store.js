import { configureStore } from '@reduxjs/toolkit';
import ImageSlice from './image/ImageSlice';

export const store = configureStore({
    reducer: {
        image: ImageSlice
    }
});