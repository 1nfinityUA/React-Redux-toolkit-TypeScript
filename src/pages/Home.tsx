import React from "react";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import qs from "qs";
import { list } from "../components/Sort";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filter/slice";
import { selectPizzaData } from "../redux/slices/pizza/selectors";
import { fetchPIzzas } from "../redux/slices/pizza/asyncActions";
import { SearchPizzaParams } from '../redux/slices/pizza/types'

const Home: React.FC = () => {
    const isMounted = React.useRef(false);
    const isSearch = React.useRef(false);
    const navigate = useNavigate();
    // redux
    // зроблено без селектора для наглядності
    const { categoryId, sort, currentPage, searchValue } = useSelector(
        (state: any) => state.filter
    );
    const { items2, status } = useSelector(selectPizzaData);
    const dispatch = useAppDispatch();

    //   redux
    // зроблено через кол-бек щоб при зміні инпута не переренджувало категорії
    const onClickCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);
    // запити на бек-енд йдуть за певною сторінкою
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };
    // робимо запит в окрму функцію
    const getPizzas = async () => {
        // змінні створені для зручності читання коду
        // запит формується в залежності від типу сортування та вибору категорії
        // добавленно запит по поточній сторінці
        // деск і акс це сортування з більшого до меньшого або навпаки якщо є мінус тоді від більшого
        // мінус видаляємо бо його кине в строку запиту
        // ліміт запиту стоїть 8 обьєктів
        // запити винесено в редакс
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const sortBy = sort.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `search=${searchValue}` : "";
        // запит перероблено на аксіос і в редаксі
        dispatch(
            fetchPIzzas({
                order,
                sortBy,
                category,
                currentPage,
                search,
            })
        );
    };

    //змінна для зручності читання коду + добавляємо перевірку по пошуку
    //пошук відбувається на стороні фронт енду без запиту на бек, через те що мало чого загружається
    //якщо велика база данних або дані часто міняються треба робити через запит на бек-енд
    const pizzas = items2
        // виключенно тому що фільтрація виконується на запиті в бек-енд
        // .filter((obj) => {
        //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        //         return true;
        //     }
        //     return false;
        // })
        .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
    // якшо були змінені параметри і був перший рендер тоді робимо запит
    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
        // для прокрутки вікна браузера вверх після відповіді фетчу
        window.scrollTo(0, 0);
        // тут дивимось за статусом змінних (якшо міняються тоді йде запит)
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);
    // бібіліотека qs для того щоб створити строчку ЮРЛ і закріпити її в браузері
    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                sortProperty: sort.sortProperty,
                categoryId: categoryId > 0 ? categoryId : null,
                currentPage: currentPage,
            };

            const queryString = qs.stringify(params, { skipNulls: true });
            navigate(`?${queryString}`);
            if (!window.location.search) {
                dispatch(fetchPIzzas({} as SearchPizzaParams));
            }
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);
    // якшо був перший рендер то провіряєм ЮРЛ параметри і зберігаєм в редаксі
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(1)
            ) as unknown as SearchPizzaParams;
            const sort = list.find((obj) => obj.sortProperty === params.sortBy);
            // з ЮРЛ приходе просто строкою а в редакс ми передаємо те що нам говорить редакс (наприклад намбер)
            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort || list[0],
                })
            );
            isSearch.current = true;
        }
    }, []);
    return (
        <div className="container">
            <div className="content__top">
                {/* передаємо змінні і їх стан в компонент через пропси, через те що з компонента назад не можливо передати */}
                <Categories
                    categoryId={categoryId}
                    onChangeCategory={onClickCategory}
                />
                {/* передаємо змінні і стан в пропси */}
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Всі піцци</h2>
            {/* тут з редакса бепер стату чи загрузка йде чи помилка чи все ок */}
            {/* і якщо помилка то рендери дів з написом помилка запиту якшо все ок то скелетон пока загрузка і тоді піци */}
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>Помилка запиту з бази данних</h2>
                </div>
            ) : (
                <div className="content__items">
                    {/* поки йде завантаження відображаємо скелет через тринаний оператор*/}
                    {status === "loading"
                        ? [...new Array(8)].map((_, index) => (
                              <Skeleton key={index} />
                          ))
                        : pizzas}
                </div>
            )}

            {/* пагінація - вибір сторінки за допомогою бібліотеки реакта*/}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};
export default Home;
