import { Link } from 'react-router-dom';
import React from 'react'

const CartEmpty: React.FC = () => {
  return (
    <>
        <div className="cart cart--empty">
                <h2>Корзина порожня <span>😕</span></h2>
                <p>
                  Скоріше за все, ви не замовляли піцу.<br/>
                  Для того, щоб замовити піццу перейдіть на головну сторінку.
                </p>
                <img src="../../img/empty-cart.png" alt="Empty cart"/>
                <Link to='/' className="button button--black">
                  <span>Повернутись назад</span>
                </Link>
              </div>
    </>
  )
}

export default CartEmpty