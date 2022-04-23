import { createSlice } from "@reduxjs/toolkit";
import {uid} from "uid";

export const ImageSlice = createSlice({
    name: "movies",
    initialState: {
        fontSizes: [
            {
                id: uid(),
                fontName: "XXS",
                fontSize: "0.5rem"
            },
            {
                id: uid(),
                fontName: "XS",
                fontSize: "0.75rem"
            },
            {
                id: uid(),
                fontName: "SM",
                fontSize: "1rem"
            },
            {
                id: uid(),
                fontName: "MD",
                fontSize: "1.25rem"
            },
            {
                id: uid(),
                fontName: "LG",
                fontSize: "1.5rem"
            },
            {
                id: uid(),
                fontName: "XL",
                fontSize: "1.75rem"
            },  
            {
                id: uid(),
                fontName: "XXL",
                fontSize: "2rem"
            },        
        ],
        fontSize: "1rem"
    },
    reducers: {
        setFontSize: (state, action) => {
            state.fontSize = action.payload;
        }
    },
});

export const {setFontSize} = ImageSlice.actions;
export default ImageSlice.reducer;