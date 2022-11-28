import React from 'react';
import Styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={Styles.root}>
        <h1>
            <img src="../../img/NotFoundIcon.svg" alt="NotFoundIcon" />
            <span>Not found</span>
        </h1>
        <p>
            Сторінка відсутня в нашому інтернет-магазині
        </p>
    </div>
  )
}

export default NotFoundBlock;