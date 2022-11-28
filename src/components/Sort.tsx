import React from "react";
import { useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filter/slice";
import { SortPropertyEnum } from "../redux/slices/filter/types";
import { SortPopup } from "../redux/slices/filter/types";

type Listtype = {
    name: string;
    sortProperty: SortPropertyEnum;
};
type SortPopupPropsType = {
    value: SortPopup;
};

// массив обєктів для того щоб було можливо по ключу звернутись до назви і сам признак сортування
// type scrypt ON
export const list: Listtype[] = [
    { name: "популярності ↑", sortProperty: SortPropertyEnum.RAITING_DESC },
    { name: "популярності ↓", sortProperty: SortPropertyEnum.RAITING_ASC },
    { name: "ціні ↑", sortProperty: SortPropertyEnum.PRICE_DESC },
    { name: "ціні ↓", sortProperty: SortPropertyEnum.PRICE_ASC },
    { name: "алфавіту ↑", sortProperty: SortPropertyEnum.TITLE_DESC },
    { name: "алфавіту ↓", sortProperty: SortPropertyEnum.TITLE_ASC },
];

// обернуто в реакт мемо для того щоб не перемальовувався компонент а лишався в кеші коли його не трогають
const Sort: React.FC<SortPopupPropsType> = React.memo(({ value }) => {
    // redux
    const dispatch = useDispatch();
    // typescript
    const sortRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);

    // функція яка при кліку міняє вибраний тип сортування і закриває вікно вибору
    const onClickListItem = (obj: Listtype) => {
        setOpen(false);
        dispatch(setSort(obj));
    };
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // для тайп скрипт МаусЕвент не має ПАз тому ми дописуємого його окремо щоб не було помилки
            const _event = event as MouseEvent & {
                path: Node[];
            };
            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setOpen(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортування по:</b>
                {/* сетОпен дивиться на стан опен і дає протилежне значення (працює тільки з тру або фолс) */}
                <span onClick={() => setOpen(!open)}>{value.name}</span>
            </div>
            {/* якщо опен дає тру тоді код йде далі і рендерить дів з попуп і тим самим відкриває його */}
            {open && (
                <div className="sort__popup">
                    <ul>
                        {list.map((obj, i) => (
                            <li
                                key={i}
                                onClick={() => onClickListItem(obj)}
                                // якщо вибраний тоді видиє тру і клас стає "актів"
                                className={
                                    value.sortProperty === obj.sortProperty
                                        ? "active"
                                        : ""
                                }
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default Sort;
