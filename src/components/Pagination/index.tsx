import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import Loader from '../../common/LoaderSmall';

interface PaginationProps {
    totalItems : number;
    limit      : number;
    totalPages : number;
    pageArray  : any[];
    apiCall    : Function;
}

const TablePagination = ({totalItems, totalPages, pageArray, limit, apiCall}: PaginationProps) => {
    const [ firstItem, setFirstItem ]                  = useState<number>(1);
    const [ lastItem, setLastItem ]                    = useState<number>(0);
    const [ currentPage, setCurrentPage ]              = useState<number>(0);
    const [ isFirstLoad, setIsFirstLoad ]              = useState<boolean>(false);
    const [ paginationIsLoaded, sePaginationIsLoaded ] = useState<boolean>(false);

    // pagination items styles
    const common     = 'px-4 py-2 rounded text-gray-700 flex w-10 items-center justify-center h-10 text-sm font-medium hover:bg-blue-500/[0.08] dark:hover:text-brand-500';
    const currentCss = "bg-blue-500/[0.5] dark:text-white";
    const otherCss   = "dark:text-gray-400 hover:text-brand-500 ";
    
    const onClickPrevious = () => {
        let page = currentPage - 1;
        setCurrentPage(page);
        checkButtons(page, totalPages);
        previous(page, limit);
        setLastItem(page*limit);
        
        apiCall(page);
    }

    const previous = (page: number, limit: number) => {
         if (page-1 == 0) {
            setFirstItem(1);
        } else {
            setFirstItem((page)*limit-limit);
        }
    }

    const onClickNext = () => {
        let page = currentPage + 1;
        setCurrentPage(page);
        checkButtons(page, totalPages);
        setFirstItem((page-1)*limit);
        next(page, limit, totalItems);
        
        apiCall(page);
    }

    const next = (page: number, limit: number, totalItems: number) => {
        if (page*limit > totalItems) {
            setLastItem(totalItems)
        } else {
            setLastItem(page*limit)
        }
    }

    const onClickPage = (page: number) => {
        setCurrentPage(page);
        checkButtons(page, totalPages)
        previous(page, limit);
        next(page, limit, totalItems);
        
        apiCall(page);
    }

    const checkButtons = (page: number, totalPages: number) => {
        if (page == totalPages) {
            document.querySelector('#next')?.toggleAttribute('disabled');
            document.querySelector('#prev')?.removeAttribute('disabled')
        } else if (page == 1) {
            document.querySelector('#next')?.removeAttribute('disabled');
            document.querySelector('#prev')?.toggleAttribute('disabled')
        } else {
            document.querySelector('#next')?.removeAttribute('disabled');
            document.querySelector('#prev')?.removeAttribute('disabled')
        }
    }

    useEffect(() => {
        if (isFirstLoad == false) {
            setCurrentPage(1);
            setFirstItem(1);
            setLastItem(limit);
            setTimeout(() => { sePaginationIsLoaded(true); }, 1500);
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="pb-3 xl:pb-0">
                    <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                        Showing {firstItem} to {lastItem} of {totalItems} entries
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <button id="prev" onClick={onClickPrevious} className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm">
                        Previous
                    </button>
                    {paginationIsLoaded ? (
                            <div className="flex items-center gap-2">ddd
                                {(pageArray?.map((number) => (
                                    (currentPage == number) ? (
                                        <article key={uuidv4()}>
                                            <button onClick={() => onClickPage(number)} className={`${common} ${currentCss}`}>{number}</button>
                                        </article>
                                    ) : (
                                        <article key={uuidv4()}>
                                            <button onClick={() => onClickPage(number)} className={`${common} ${otherCss}`}>{number}</button>
                                        </article>
                                    )
                                )))}
                            </div>
                        ) : (
                            <Loader></Loader>
                        )
                    }
                    <button id="next" onClick={onClickNext} className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
