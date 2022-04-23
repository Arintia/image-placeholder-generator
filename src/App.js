import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState("light");
  const html = useRef();
  const lightModeSun = useRef();
  const darkModeMoon = useRef();

  useEffect(() => {
    html.current = document.querySelector("html");
    lightModeSun.current = document.getElementById("sun");
    darkModeMoon.current = document.getElementById("moon");
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

  useEffect(() => {
    theme === "dark" ? html.current.classList.add("dark") : html.current.classList.remove("dark")
  }, [theme]);

  const handleThemeSwitch = () => {
    if(theme === "dark") {
      setTheme("light");
    } else if(theme === "light") {
      setTheme("dark");
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center relative bg-gray-100 dark:bg-gray-800">
      <label className="swap swap-rotate absolute right-5 top-5">
        <input type="checkbox" onChange={handleThemeSwitch} />
        <svg id="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        <svg id="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
      </label>
      <div className="container flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-slate-900 mt-2 mb-3 dark:text-white">Image Placeholder Generator</h1>
        <div className="relative z-0 mb-3 w-1/4 group">
          <input type="number" name="width" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="width" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Width</label>
        </div>
        <div className="relative z-0 mb-3 w-1/4 group">
          <input type="number" name="height" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="height" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Height</label>
        </div>
        <div className="relative z-0 mb-3 w-1/4 group">
          <input type="text" name="caption" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="caption" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Caption</label>
        </div>
        <div className="mb-3 w-1/4 group">
          <label htmlFor="font" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Font</label>
          <select id="font" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Please select a font style...</option>
            <option>Serif</option>
            <option>Sans-serif</option>
            <option>Monospace</option>
            <option>Cursive</option>
            <option>Fantasy</option>
          </select>
        </div>
        <div className="mb-3 w-1/4 group">
          <label htmlFor="font-size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Font Size</label>
            <button type="button" className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              XXS
            </button>
            <button type="button" className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              XS
            </button>
            <button type="button" className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              S
            </button>
            <button type="button" className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              MD
            </button>
            <button type="button" className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              LG
            </button>
            <button type="button" className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              XL
            </button>
            <button type="button" className="w-11 justify-center text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800">
              XXL
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;
