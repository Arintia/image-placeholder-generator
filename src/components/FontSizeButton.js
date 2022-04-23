import React from 'react';
import { useDispatch } from 'react-redux';
import { setFontSize } from '../redux/image/ImageSlice';

function FontSizeButton({fontSize, sizeName}) {
    const dispatch = useDispatch();

    return (
        <button 
            value={fontSize} 
            type="button" 
            className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            onClick={(e) => dispatch(setFontSize(e.target.value))}
        >
            {sizeName}
        </button>
    );
}

export default FontSizeButton;