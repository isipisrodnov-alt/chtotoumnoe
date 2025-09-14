import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Cart from "./Cart"; 
import Login from "./Login";

function App() {
    const [cart, setCart] = useState([]);
    const [theme, setTheme] = useState("light");

    function addToCart(item) {
        setCart(prevCart => [...prevCart, item]);
    }

    function toggleTheme() {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <Router>
            <div>
                <Menu cartItemsCount={cart.length} toggleTheme={toggleTheme} theme={theme} />
                <Routes>
                    <Route path="/" element={<Home addToCart={addToCart} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart initialCartItems={cart} />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

function Menu({ cartItemsCount, toggleTheme, theme }) {
    return (
        <nav>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/cart">Корзина ({cartItemsCount})</NavLink>
            <NavLink to="/login">Вход</NavLink>
            <button onClick={toggleTheme}>
                Переключить тему ({theme})
            </button>
        </nav>
    );
}

export default App;