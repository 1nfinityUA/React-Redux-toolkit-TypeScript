import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
    const navigate = useNavigate();
    // type script begins
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    // витягуємо змінну яку вказали в роутах (динамічну)
    const { id } = useParams();
    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://63555930483f5d2df3b29481.mockapi.io/items-2/${id}`
                );
                setPizza(data);
            } catch (error) {
                alert("Помилка при отриманнi піцци");
                navigate("/");
            }
        }
        fetchPizza();
    }, []);
    if (!pizza) {
        return <>Загрузка...</>;
    }
    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₴</h4>
        </div>
    );
};

export default FullPizza;
