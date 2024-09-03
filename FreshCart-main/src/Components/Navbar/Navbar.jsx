import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authinticationContext";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { CartContext } from "../../context/cartContext";
import { WishlistContext } from "../../context/WishlistContext";
import CategoryContext from "../../context/categoryContext";
import { motion } from "framer-motion";
import { UserContext } from "../../context/userContext";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const [isMenuHovered , setIsMenuHovered] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();
  const { cartCounter, setCartCounter, setCartProducts } = useContext(CartContext);
  const { wishlistCounter, setWishlistCounter, setWishlist } = useContext(WishlistContext);
  const { categoryId , categoryName } = useContext(CategoryContext);
  const {setUser} = useContext(UserContext)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
    setIsWishlistOpen(false)
    setIsMenuOpen(false)
  };
  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen)
    setIsCartOpen(false)
    setIsMenuOpen(false)

  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsWishlistOpen(false)
    setIsCartOpen(false)
  };
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const dropdownVariants = {
    open: { opacity: 1, scale: 1, y: 0 },
    closed: { opacity: 0, scale: 0.95, y: -20 }
  };

  const mobileMenuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 }
  };

  function closingMenu(){
    setIsMenuOpen(false)
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken(null);
    setCartProducts({ products: [] });
    setCartCounter(0);
    setWishlist([]);
    setUser([]);
    setWishlistCounter(0);
    navigate('/login');
  };

  return (
    <header className="bg-blue-100 dark:bg-gray-800 sticky top-0 z-50">
      <nav className="w-full xl:container xl:mx-auto mx-0 px-4 py-3 lg:px-6 sm:py-3">
        <div className="flex items-center justify-between gap-5 md:gap-0 flex-row">  
          <div className="flex items-center">
            <div className="text-gray-800 dark:text-white font-bold text-sm xl:text-lg">
              <Link to={'/'}><i className="fa-solid fa-cart-plus"></i> FreshCart</Link>
            </div>
            {userToken && (
              <ul className="hidden md:flex items-center space-x-8 md:space-x-3 ms-10">
                <li><NavLink to={'/'} className="text-gray-800 text-[15px] xl:text-lg dark:text-white" activeClassName="font-semibold">Home</NavLink></li>
                <li
                  className="text-gray-800 text-[15px] xl:text-lg dark:text-white flex items-center"
                  onMouseEnter={() => setIsMenuHovered(true)}
                  aria-haspopup="true"
                  aria-expanded={isMenuHovered}
                >
                  Categories
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>

                  {isMenuHovered && (
                    <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate={isMenuHovered ? "open" : "closed"}
                    exit="closed"
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 top-12 right-0 left-0 h-[20rem] rounded-md shadow-lg bg-white border border-gray-200 dark:bg-[#20293A] dark:border-slate-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                      onMouseLeave={() => setIsMenuHovered(false)}
                      style={{ opacity: isMenuHovered ? 1 : 0, scale: isMenuHovered ? 1 : 0.95 }}
                    >
                      <div className="py-1 text-gray-700 flex items-center justify-between gap-y-10 flex-wrap dark:text-gray-400 text-xs space-y-3 lg:space-y-4 p-5" role="menu">
                        {categoryName.map((name, index) => (
                          <li key={index} className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                            <Link to={`/category/${categoryId[index]}`}>{name}</Link>
                          </li>
                        ))}
                        <li className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                          <Link to={`/category/`}>SuperMarket</Link>
                        </li>
                        <li className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                          <Link to={`/category/`}>Baby & Toys</Link>
                        </li>
                        <li className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                          <Link to={`/category/`}>Music</Link>
                        </li>
                        <li className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                          <Link to={`/category/`}>Books</Link>
                        </li>
                        <li className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                          <Link to={`/category/`}>Home</Link>
                        </li>
                        <li className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                          <Link to={`/category/`}>Mobiles</Link>
                        </li>
                        <li className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline">
                          <Link to={`/category/`}>Beauty & Health</Link>
                        </li>
                      </div>
                    </motion.div>
                  )}
                </li>
                <li><NavLink to={'/products'} className="text-gray-800 text-[15px] xl:text-lg dark:text-white" activeClassName="font-semibold">Shop</NavLink></li>
                <li><NavLink to={'/contact'} className="text-gray-800 text-[15px] xl:text-lg dark:text-white" activeClassName="font-semibold">Contact</NavLink></li>
                <li><NavLink to={'/about'} className="text-gray-800 text-[15px] xl:text-lg dark:text-white" activeClassName="font-semibold">About</NavLink></li>
                <li><NavLink to={'/allorders'} className="text-gray-800 text-[15px] xl:text-lg dark:text-white" activeClassName="font-semibold">Orders</NavLink></li>
              </ul>
            )}
          </div>
          <div className="flex items-center space-x-4 md:space-x-8">
            {!userToken ? (
              <>
                <ul className="hidden md:flex items-center space-x-8 ms-20">
                  <Link to={'/login'} className="text-gray-800 dark:text-white">Login</Link>
                  <Link to={'/register'} className="text-gray-800 dark:text-white">Register</Link>
                </ul>
              <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white hidden md:block">
                  {darkMode ? (
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" className="fill-transparent"></path>
                      <path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" className="fill-slate-400 dark:fill-slate-500"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 1-1Z" className="fill-slate-400 dark:fill-slate-500"></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className="fill-yellow-400/20 stroke-yellow-500"></path>
                      <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" className="stroke-yellow-500"></path>
                    </svg>
                  )}
                </button>
              </>
            ): (
              <>
                <button onClick={toggleCart} className="text-gray-800 relative dark:text-white">
                  <i className="fas text-xs lg:text-lg fa-cart-shopping"></i>
                  <div className="flex items-center justify-center rounded-full bg-rose-500 text-white text-xs w-4 h-4 absolute -top-2 -right-2" style={{ lineHeight: '1.2', padding: '2px' }}>
                    {cartCounter}
                  </div>
                </button>
                <button onClick={toggleWishlist} className="text-gray-800 relative dark:text-white">
                  <i className="fa-regular text-xs lg:text-lg fa-heart"></i>
                  <div className="flex items-center justify-center rounded-full bg-rose-500 text-white text-xs w-4 h-4 absolute -top-2 -right-2" style={{ lineHeight: '1.2', padding: '2px' }}>
                    {wishlistCounter}
                  </div>
                </button>
                <button className="cursor-pointer hidden md:inline-block" onClick={()=> {handleLogout(); closingMenu()}}>
                <i  className="fa-solid fa-arrow-right-from-bracket text-gray-950 dark:text-white"></i>
                </button>
                <Link to={'/profile'} onClick={()=> { setIsCartOpen(false); setIsMenuOpen(false); setIsWishlistOpen(false)}}><i className="fas fa-user-ninja dark:text-white"></i></Link>
                <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white hidden md:block">
                  {darkMode ? (
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" className="fill-transparent"></path>
                      <path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" className="fill-slate-400 dark:fill-slate-500"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 1-1Z" className="fill-slate-400 dark:fill-slate-500"></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className="fill-yellow-400/20 stroke-yellow-500"></path>
                      <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" className="stroke-yellow-500"></path>
                    </svg>
                  )}
                </button>
              </>
            )}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="outline-none">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
  <motion.div
    variants={mobileMenuVariants}
    initial="closed"
    animate="open"
    exit="closed"
    transition={{ duration: 0.2 }}
    className="mobile-menu md:hidden mt-4"
  >
    {userToken ? (
      <ul>
        <li onClick={()=> closingMenu()} className="mb-3 hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700">
          <NavLink
            to="/"
            className="text-gray-800 dark:text-white"
            activeClassName="font-semibold"
          >
            Home
          </NavLink>
        </li>
        <li onClick={()=> closingMenu()} className="relative mb-3">
          <button
            className="w-full flex justify-between items-center hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700 dark:text-white"
            onClick={() => setIsMenuHovered(!isMenuHovered)}
          >
            Categories
            <svg
              className={`w-4 h-4 transform transition-transform ${
                isMenuHovered ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {isMenuHovered && (
            <motion.div
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50"
            >
              <div
                className="py-1 text-gray-700 flex items-center justify-between gap-y-10 flex-wrap dark:text-gray-400 text-sm space-y-3 lg:space-y-4 p-5"
                role="menu"
              >
                {categoryName.map((name, index) => (
                  <li
                    key={index}
                    className="block font-medium w-1/3 text-gray-500 dark:text-gray-300 hover:underline"
                  >
                    <Link to={`/category/${categoryId[index]}`}>{name}</Link>
                  </li>
                ))}
                <li className="block font-medium w-1/3 me-5 text-gray-500 dark:text-gray-300 hover:underline">
                  <Link to="/category/">SuperMarket</Link>
                </li>
                <li className="block font-medium w-1/3 me-5 text-gray-500 dark:text-gray-300 hover:underline">
                  <Link to="/category/">Baby & Toys</Link>
                </li>
                <li className="block font-medium w-1/3 me-5 text-gray-500 dark:text-gray-300 hover:underline">
                  <Link to="/category/">Music</Link>
                </li>
                <li className="block font-medium w-1/3 me-5 text-gray-500 dark:text-gray-300 hover:underline">
                  <Link to="/category/">Books</Link>
                </li>
                <li className="block font-medium w-1/3 me-5 text-gray-500 dark:text-gray-300 hover:underline">
                  <Link to="/category/">Home</Link>
                </li>
                <li className="block font-medium w-1/3 me-5 text-gray-500 dark:text-gray-300 hover:underline">
                  <Link to="/category/">Mobiles</Link>
                </li>
                <li className="block font-medium w-1/3 me-5 text-gray-500 dark:text-gray-300 hover:underline">
                  <Link to="/category/">Beauty & Health</Link>
                </li>
              </div>
            </motion.div>
          )}
        </li>
        <li onClick={()=> closingMenu()} className="mb-3 hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700">
          <NavLink
            to="/products"
            className="text-gray-800 dark:text-white"
            activeClassName="font-semibold"
          >
            Shop
          </NavLink>
        </li>
        <li onClick={()=> closingMenu()} className="mb-3 hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700">
          <NavLink
            to="/contact"
            className="text-gray-800 dark:text-white"
            activeClassName="font-semibold"
          >
            Contact
          </NavLink>
        </li>
        <li onClick={()=> closingMenu()} className="mb-3 hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700">
          <NavLink
            to="/about"
            className="text-gray-800 dark:text-white"
            activeClassName="font-semibold"
          >
            About
          </NavLink>
        </li>
        <li onClick={()=> closingMenu()} className="mb-3 hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700">
          <NavLink
            to="/allorders"
            className="text-gray-800 dark:text-white"
            activeClassName="font-semibold"
          >
            Orders
          </NavLink>
        </li>
      </ul>
    ) : (
      <>
        <div className="flex items-center justify-between">
        <div>
        <Link to="/login" onClick={ ()=> closingMenu()} className="text-gray-800 hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700 dark:text-white block">
          Login
        </Link>
        <Link to="/register" onClick={ ()=> closingMenu()} className="text-gray-800 hover:bg-gray-200 py-2 px-4 dark:hover:bg-gray-700 dark:text-white block">
          Register
        </Link>
        </div>
        <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white">
                  {darkMode ? (
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" className="fill-transparent"></path>
                      <path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" className="fill-slate-400 dark:fill-slate-500"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 1-1Z" className="fill-slate-400 dark:fill-slate-500"></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className="fill-yellow-400/20 stroke-yellow-500"></path>
                      <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" className="stroke-yellow-500"></path>
                    </svg>
                  )}
        </button>
        </div>
      </>
    )}
    {userToken && (
      <div className="flex justify-between items-center">
        <i
          onClick={()=>{handleLogout(); closingMenu()}}
          className="fa-solid fa-arrow-right-from-bracket text-gray-950 dark:text-white"
        ></i>
        <button onClick={toggleDarkMode} className="text-gray-800 dark:text-white">
          {darkMode ? (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                className="fill-transparent"
              ></path>
              <path
                d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                className="fill-slate-400 dark:fill-slate-500"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1 1-1Z"
                className="fill-slate-400 dark:fill-slate-500"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                d="M10 2a1 1 0 1 0 2 0V0a1 1 0 0 0-2 0v2Zm10 10a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM11 20a1 1 0 0 1 1-1h0a1 1 0 0 1 0 2h0a1 1 0 0 1-1-1ZM2 11a1 1 0 1 0 0 2H0a1 1 0 1 0 0-2h2ZM4.222 3.808a1 1 0 0 1 1.414-1.414l1.414 1.415a1 1 0 0 1-1.415 1.414L4.222 3.808Zm13.142 14.85a1 1 0 1 1 1.415-1.414l1.414 1.415a1 1 0 0 1-1.414 1.414l-1.415-1.414Zm-.001-14.85a1 1 0 0 1 1.414 1.414l-1.415 1.415a1 1 0 0 1-1.414-1.415l1.415-1.414ZM5.636 17.95a1 1 0 0 1 1.414 1.415L5.636 20.78a1 1 0 0 1-1.414-1.414l1.414-1.414ZM12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11Zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
      </div>
    )}
  </motion.div>
)}

      </nav>
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} toggleCart={toggleCart} />
      <Wishlist isOpen={isWishlistOpen} setIsOpen={setIsWishlistOpen} toggleWishlist={toggleWishlist} />
    </header>
  );
}

