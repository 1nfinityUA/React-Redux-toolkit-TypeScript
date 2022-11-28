import React from "react";

type CategoryPropsType = {
    categoryId: number;
    onChangeCategory: (i: number) => void;
};
const categories = [
    "Всі",
    "М'ясні",
    "Вегітаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
];

// обернуто в мемо щоб не перемальовувало всі компоненти а тримало їх в кеші
const Categories: React.FC<CategoryPropsType> = React.memo(({
    categoryId,
    onChangeCategory,
}) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        key={i}
                        onClick={() => onChangeCategory(i)}
                        className={categoryId === i ? "active" : ""}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
});
export default Categories;
