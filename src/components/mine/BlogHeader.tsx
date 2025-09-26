import { useState } from "react";

const BlogHeader = () => {
    const [menu, setMenu] = useState(false);

const collapseMenu = {
    display: menu?'block':'none'
}
const toggleMenu = ()=>{
    setMenu(!menu);
}



    return (<header className="border-b border-gray-300 bg-white tracking-wide relative z-50">
        <section className="flex flex-wrap items-center gap-4 relative py-2 px-4 sm:px-10 min-h-[70px] border-b border-gray-300">
            <a href="#" className="max-sm:hidden"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-[136px]" />
            </a>
            <a href="#" className="hidden max-sm:block"><img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" className="w-9" />
            </a>

            <ul className="flex space-x-8 lg:absolute lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2 max-lg:hidden">
                <li><a href='#' className="hover:text-pink-600 text-slate-900 font-medium text-[15px]">Menu</a>
                </li>
                <li><a href='#' className="hover:text-pink-600 text-slate-900 font-medium text-[15px]">Stories</a>
                </li>
                <li><a href='#' className="hover:text-pink-600 text-slate-900 font-medium text-[15px]">About</a>
                </li>
                <li><a href='#' className="hover:text-pink-600 text-slate-900 font-medium text-[15px]">Careers</a>
                </li>
            </ul>

            <div className="lg:absolute lg:right-10 flex items-center ml-auto">
                <button
                    className="px-4 py-2 text-[15px] rounded-sm font-medium text-white bg-pink-500 hover:bg-pink-600 outline-0 cursor-pointer">Order
                    food</button>
                <div className="inline-block border-l-2 ml-4 pl-4 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width='20px'
                        className="cursor-pointer fill-gray-400">
                        <path
                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                    </svg>
                </div>
            </div>
        </section>

        <div className="flex flex-wrap items-start gap-4 px-10 py-3 relative">

            <div id="collapseMenu"
            style={collapseMenu}
                className="w-full max-lg:hidden lg:!block max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
                <button id="toggleClose" onClick={toggleMenu} className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"></path>
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"></path>
                    </svg>
                </button>

                <ul
                    className="lg:flex lg:justify-center gap-x-8 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                    <li className="mb-6 hidden max-lg:block">
                        <a href="#"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
                        </a>
                    </li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Breakfast</a></li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Salads</a></li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Sides</a></li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Treats</a></li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Drinks</a></li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Dipping Sauces and Dressings</a>
                    </li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Kid's Meals</a></li>
                    <li className="max-lg:border-b border-pink-200 max-lg:py-3"><a href='#'
                        className="hover:text-pink-600 text-slate-500 font-medium text-[15px] block">Catering</a></li>
                </ul>
            </div>

            <div className="flex ml-auto lg:hidden">
                <button id="toggleOpen" onClick={toggleMenu} className="cursor-pointer">
                    <svg className="w-7 h-7 fill-gray-800" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    </header>
    )
}


export default BlogHeader;