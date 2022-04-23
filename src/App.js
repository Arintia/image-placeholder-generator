import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FontSizeButton from './components/FontSizeButton';
import FontStyleOption from './components/FontStyleOption';
import { setFontStyle } from './redux/image/ImageSlice';

function App() {
  // Used to dispatch callbacks to redux store
  const dispatch = useDispatch();
  /**
   * Stores/sets current theme
   * @param {String} theme - Current theme("light" or "dark")
   */
  const [theme, setTheme] = useState("light");
  /**
   * Stores HTML DOM element to set its class to "dark" if dark mode is activated. 
   */
  const html = useRef();
  /**
   * Stores HTML5 Canvas DOM element's 2D context
   */
  const canvas = useRef();
  /**
   * Stores sun SVG for light mode
   */
  const lightModeSun = useRef();
  /**
   * Stores moon SVG for dark mode
   */
  const darkModeMoon = useRef();
  /**
   * Stores fontSizes array fetched from redux store
   * @param fontSizes.id - Unique ID of the font size
   * @param fontSizes.fontSize - Font size("1rem", "1.5rem" etc)
   * @param fontSizes.sizeName - Font size name("SM", "MD" etc)
   */
  const fontSizes = useSelector(state => state.image.fontSizes);
  /**
   * Stores fontStyles array fetched from redux store
   * @param fontStyles.id - Unique ID of the font style
   * @param fontStyles.fontName - Name of the font("Sans-serif", "Serif" etc)
   */
  const fontStyles = useSelector(state => state.image.fontStyles);
  /**
   * Stores canvasFontSize fetched from redux store(currently selected font size)
   */
  const canvasFontSize = useSelector(state => state.image.canvasFontSize);
  /**
   * Stores canvasFontStyle fetched from redux store(currently selected font Style)
   */
  const canvasFontStyle = useSelector(state => state.image.canvasFontStyle);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [canvasCaption, setCanvasCaption] = useState(`${canvasWidth}x${canvasHeight}`);
  const [canvasFontWeight, setCanvasFontWeight] = useState(400);
  const [canvasTextColor, setCanvasTextColor] = useState("#ffffff");
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#cccccc");

  /**
   * This useEffect is called upon dom mount. It assigns the necessary DOM elements such as the canvas context, html DOM element,
   * light and dark mode SVG's. It then checks if the user prefers dark mode or light mode in their system and changes the app's
   * theme based on their preference. 
   */
  useEffect(() => {
    html.current = document.querySelector("html");
    lightModeSun.current = document.getElementById("sun");
    darkModeMoon.current = document.getElementById("moon");
    canvas.current = document.getElementById("image-canvas").getContext("2d");
    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      darkModeMoon.current.setAttribute("class", "swap-off fill-current w-7 h-7 text-slate-900 dark:text-white");
      lightModeSun.current.setAttribute("class", "swap-on fill-current w-7 h-7 text-slate-900 dark:text-white");
    } else if(window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
      lightModeSun.current.setAttribute("class", "swap-off fill-current w-7 h-7 text-slate-900 dark:text-white");
      darkModeMoon.current.setAttribute("class", "swap-on fill-current w-7 h-7 text-slate-900 dark:text-white");
    }
    
  }, []);

  /**
   * This useEffect hook is called each time theme state is manipulated. It checks whether or not the theme is equal to "dark" and
   * assigns the "dark" class to the HTML dom element if it is. This is how Tailwind CSS handles theming.
   */
  useEffect(() => {
    theme === "dark" ? html.current.classList.add("dark") : html.current.classList.remove("dark")
  }, [theme]);

  /**
   * Every time canvas states(background color, caption, font size etc) are changed, the HTML5 Canvas is deleted and re-painted.
   * This is done to make sure the old text doesn't remain on screen. Once the text is written on a canvas, it's no longer a text
   * and it's simply some pixels on the screen. Therefore, this useEffect hook re-paints the canvas to make sure it's on par with
   * the end-user's expectations.
   */
  useEffect(() => {
    canvas.current.clearRect(0, 0, canvasWidth, canvasHeight);
    canvas.current.fillStyle = canvasBackgroundColor;
    canvas.current.fillRect(0, 0, canvasWidth, canvasHeight);
    canvas.current.font = `${canvasFontWeight} ${canvasFontSize} ${canvasFontStyle}`;
    canvas.current.fillStyle = canvasTextColor;
    canvas.current.fillText(canvasCaption, (canvasWidth / 2) - (canvas.current.measureText(canvasCaption).width /2), canvasHeight / 2);
  }, [canvasBackgroundColor, canvasCaption, canvasFontSize, canvasFontStyle, canvasFontWeight, canvasHeight, canvasTextColor, canvasWidth]);

  /**
   * Switches the theme based on the current theme.
   */
  const handleThemeSwitch = () => {
    if(theme === "dark") {
      setTheme("light");
    } else if(theme === "light") {
      setTheme("dark");
    }
  }

  /**
   * Converts the HTMl5 Canvas to a downloadable PNG file and starts the download.
   * @param {*} e - Event object 
   */
  const convertCanvasToPng = (e) => {
    const canvas = document.getElementById("image-canvas");
    const image = canvas.toDataURL("image/png");
    const downloadBtn = document.getElementById("download-canvas");
    downloadBtn.setAttribute("download", "placeholder");
    downloadBtn.setAttribute('href', image);
  }

  return (
    <React.Fragment>
      <main className="overflow-hidden w-screen h-screen flex flex-col items-center justify-center pt-48 lg:pt-0 relative pb-36 lg:pb-0 bg-gray-100 dark:bg-gray-800">
        <aside>
          <label htmlFor="theme-switcher" className="swap swap-rotate absolute right-0 lg:right-5 top-3">
            <input type="checkbox" id="theme-switcher" onChange={handleThemeSwitch} />
            <svg id="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            <svg id="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          </label>
        </aside>
        <h1 className="text-2xl lg:text-3xl font-bold text-center text-slate-900 lg:static absolute top-0 mt-2 mb-3 dark:text-white">Image Placeholder Generator</h1>
        <div className="flex items-center justify-center min-w-full w-full h-full">
          <div className="container flex flex-col items-center justify-center">
            <div className="relative z-0 mb-3 w-1/2 group">
              <input 
                type="number" 
                id="width" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                value={canvasWidth}
                onChange={(e) => setCanvasWidth(e.target.value)} 
                required 
              />
              <label htmlFor="width" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Width</label>
            </div>
            <div className="relative z-0 mb-3 w-1/2 group">
              <input 
                type="number" 
                id="height" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                value={canvasHeight}
                onChange={(e) => setCanvasHeight(e.target.value)} 
                required 
              />
              <label htmlFor="height" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Height</label>
            </div>
            <div className="relative z-0 mb-3 w-1/2 group">
              <input 
                type="text" 
                id="caption" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                value={canvasCaption}
                onChange={(e) => setCanvasCaption(e.target.value)} 
                required 
              />
              <label htmlFor="caption" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Caption</label>
            </div>
            <div className="mb-3 w-1/2 group">
              <label htmlFor="font" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Font</label>
              <select 
                id="font" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={canvasFontStyle}
                onChange={(e) => dispatch(setFontStyle(e.target.value))} 
              >
                {fontStyles.map(fontStyle => 
                  <FontStyleOption key={fontStyle.id} fontName={fontStyle.fontName} />  
                )}
              </select>
            </div>
            <div className="mb-3 w-1/2 group">
              <label htmlFor="font-size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Font Size</label>
              {fontSizes.map(font => 
                <FontSizeButton key={font.id} sizeName={font.sizeName} fontSize={font.fontSize} />  
              )}
            </div>
            <div className="relative z-0 mb-3 w-1/2 group">
              <input 
                type="text" 
                id="fontWeight" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={canvasFontWeight}
                onChange={(e) => setCanvasFontWeight(e.target.value)} 
                required 
              />
              <label htmlFor="fontWeight" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Font Weight</label>
            </div>
            <div className="relative z-0 mb-3 w-1/2 group">
              <input 
                type="text" 
                id="textColor" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                value={canvasTextColor}
                onChange={(e) => setCanvasTextColor(e.target.value)} 
                required 
              />
              <label htmlFor="textColor" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Text Color</label>
            </div>
            <div className="relative z-0 mb-3 w-1/2 group">
              <input 
                type="text" 
                id="bgColor" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                value={canvasBackgroundColor}
                onChange={(e) => setCanvasBackgroundColor(e.target.value)} 
                required 
              />
              <label htmlFor="bgColor" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Background Color</label>
            </div>
          </div>
          <div className="w-1/2 h-1/2 flex flex-col justify-center items-center mr-12">
            <div className="w-full h-full mb-4 relative">
              <canvas 
                id="image-canvas"
                className="absolute w-full h-full"
                width={canvasWidth} 
                height={canvasHeight}
              />
            </div>
            <a 
              id="download-canvas"
              type="button" 
              onClick={convertCanvasToPng} 
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Download Image
            </a>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 right-0 text-gray-800 dark:text-white">
                <p className="mr-2 mb-2 text-sm lg:text-lg">Developed by Yigit Atak <a href="https://github.com/Arintia/image-placeholder-generator"><FontAwesomeIcon className="ml-1 text-md lg:text-2xl" icon={faGithub} /></a></p>
      </footer>
    </React.Fragment>
  );
}

export default App;
