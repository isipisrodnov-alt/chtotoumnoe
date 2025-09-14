import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Menu() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? "red" : theme === "dark" ? "#fff" : "#000",
        fontWeight: isActive ? "bold" : "normal",
        marginRight: "10px",
        textDecoration: "none"
    });

    const linkStyle = {
        color: theme === "dark" ? "#fff" : "#000",
        marginRight: "10px",
        textDecoration: "none"
    };

    return (
        <nav style={{ 
            marginBottom: "20px", 
            padding: "10px", 
            backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
            display: "flex",
            alignItems: "center"
        }}>
            <NavLink to="/" end style={navLinkStyle}>
                Главная
            </NavLink>

            <NavLink to="/about" style={navLinkStyle}>
                О нас
            </NavLink>
            
            <NavLink to="/Cart" style={navLinkStyle}>
                Корзина
            </NavLink>
            
            <NavLink to="/login" style={navLinkStyle}>
                Вход
            </NavLink>

            <button 
                onClick={toggleTheme} 
                style={{ 
                    marginLeft: "20px",
                    padding: "5px 10px",
                    backgroundColor: theme === "dark" ? "#555" : "#ddd",
                    color: theme === "dark" ? "#fff" : "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Переключить тему ({theme})
            </button>
        </nav>
    );
}

export default Menu;