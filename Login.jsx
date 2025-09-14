import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin() {
        // Проверка заполнения полей
        if (!email || !password) {
            setError("Пожалуйста, заполните оба поля.");
            return;
        }

        // Отправка запроса на сервер для проверки пользователя
        fetch("http://localhost:3001/api/users")
            .then(response => response.json())
            .then(users => {
                const foundUser = users.find(user => user.username === email && user.password === password);

                if (foundUser) {
                    navigate("./Dashboard"); // Программный переход после логина
                } else {
                    setError("Ошибка авторизации: неверный email или пароль.");
                }
            })
            .catch(err => {
                console.error("Ошибка при получении пользователей:", err);
                setError("Ошибка авторизации. Попробуйте позже.");
            });
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Страница входа</h2>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                style={{ display: "block", margin: "10px auto" }} 
            />
            <input 
                type="password" 
                placeholder="Пароль" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                style={{ display: "block", margin: "10px auto" }} 
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
}