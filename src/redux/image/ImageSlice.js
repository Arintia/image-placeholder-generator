import { createSlice } from "@reduxjs/toolkit";
import {uid} from "uid";

export const ImageSlice = createSlice({
    name: "movies",
    initialState: {
        fontSizes: [
            {
                id: uid(),
                sizeName: "XXS",
                fontSize: "0.5rem"
            },
            {
                id: uid(),
                sizeName: "XS",
                fontSize: "0.75rem"
            },
            {
                id: uid(),
                sizeName: "SM",
                fontSize: "1rem"
            },
            {
                id: uid(),
                sizeName: "MD",
                fontSize: "1.25rem"
            },
            {
                id: uid(),
                sizeName: "LG",
                fontSize: "1.5rem"
            },
            {
                id: uid(),
                sizeName: "XL",
                fontSize: "1.75rem"
            },  
            {
                id: uid(),
                sizeName: "XXL",
                fontSize: "2rem"
            },        
        ],
        canvasFontSize: "1rem",
    },
    reducers: {
        setFontSize: (state, action) => {
            state.fontSize = action.payload;
        }
    },
});

export const {setFontSize} = ImageSlice.actions;
export default ImageSlice.reducer;