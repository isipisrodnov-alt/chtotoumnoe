import React, { useEffect, useState } from "react";

function Home({ addToCart }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Запрос данных об услугах с сервера
        fetch("http://localhost:3001/api/services")
            .then(response => response.json())
            .then(data => {
                setServices(data); // Сохраняем данные в состоянии
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка при получении услуг:", err);
                setError("Ошибка при загрузке данных.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Список услуг</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {services.map(service => (
                    <div key={service.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                        <h2>{service.service_name}</h2>
                        <p>{service.description}</p>
                        <p>Длительность: {service.duration}</p> {/* Добавлено поле длительности */}
                        <p>Цена: {service.price} руб.</p>
                        <p>Подробное описание: {service.long_description}</p> {/* Полное описание */}
                        <button onClick={() => addToCart(service)}>Добавить в корзину</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;