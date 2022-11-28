import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationPropsType ={
    currentPage: number;
    onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationPropsType> = ({currentPage, onChangePage}) => {
  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        // евент дивимось прямо тут через консоль
        // в ному є селектед який передає значення вибраної сторінки але починає з 0
        // + 1 бо сторінки починаються з 1 а не з 0
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        //сторінок треба виводити стількьки скільки бек-енд дає доступно
        pageCount={3}
        forcePage={currentPage-1}
      />
  )
}

export default Pagination;