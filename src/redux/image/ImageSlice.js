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
        fontStyles: [
            {
                id: uid(),
                fontName: "Serif",
            },
            {
                id: uid(),
                fontName: "Sans-serif",
            },
            {
                id: uid(),
                fontName: "Monospace",
            },
            {
                id: uid(),
                fontName: "Cursive",
            },
            {
                id: uid(),
                fontName: "Fantasy",
            }
        ],
        canvasFontStyle: "Serif"
    },
    reducers: {
        setFontSize: (state, action) => {
            state.canvasFontSize = action.payload;
        },
        setFontStyle: (state, action) => {
            state.canvasFontStyle = action.payload;
        }
    },
});

export const { setFontSize, setFontStyle } = ImageSlice.actions;
export default ImageSlice.reducer;