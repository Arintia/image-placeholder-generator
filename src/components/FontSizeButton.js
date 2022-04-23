import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFontSize } from '../redux/image/ImageSlice';

function FontSizeButton({fontSize, sizeName}) {
    const dispatch = useDispatch();
    const canvasFontSize = useSelector(state => state.image.canvasFontSize);
    /**
     * The ternary operator below checks whether the current canvas font size is equal to the button's font size and changes the
     * styling based on that check.
     */
    return (
        <button 
            value={fontSize} 
            type="button" 
            className={
                canvasFontSize === fontSize
                ? 
                "w-11 justify-center text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg mb-1 md:mb-0 text-sm p-2.5 text-center inline-flex items-center mr-2"
                :
                "w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 mb-1 md:mb-0 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            }
            onClick={(e) => dispatch(setFontSize(e.target.value))}
        >
            {sizeName}
        </button>
    );
}

export default FontSizeButton;