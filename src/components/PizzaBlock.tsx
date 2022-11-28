import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slices/cart/slice";
import { selectCartItemById } from "../redux/slices/cart/selectors";
import { Link } from "react-router-dom";
import {CartItemType} from '../redux/slices/cart/types'

type PizzaBlockPropsType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

const typeNames = ["тонке", "традиційне"];
const PizzaBlock: React.FC<PizzaBlockPropsType> = ({
    id,
    title,
    price,
    imageUrl,
    sizes,
    types,
}) => {
    // почався редакс )))
    const dispatch = useDispatch();
    // тут в селектор ми передаємо ід для того щоб функція його зрівняла в редаксі з ід обєкта
    const cartItem = useSelector(selectCartItemById(id));
    const addedCount = cartItem ? cartItem.count : 0;
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);
    // генеруємо обєкт для корзини
    const onClickAdd = () => {
        const item: CartItemType = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0
        };
        dispatch(addItem(item));
    };
    return (
        <div className="pizza-block">
            {/* навішали лінк для переходу на більше інформаціїї про піцу за її ід */}
            <Link to={`/pizza/${id}`}>
                {" "}
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </Link>
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((type) => (
                        <li
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={activeType === type ? "active" : ""}
                        >
                            {typeNames[type]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, i) => (
                        <li
                            key={i}
                            onClick={() => setActiveSize(i)}
                            className={activeSize === i ? "active" : ""}
                        >
                            {size} см.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">від {price} ₴</div>
                <button
                    onClick={onClickAdd}
                    className="button button--outline button--add"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Додати</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </button>
            </div>
        </div>
    );
};

export default PizzaBlock;
