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
    const [ currentPage, setCurrentPage ]              = useState<number>(1);
    const [ isFirstLoad, setIsFirstLoad ]              = useState<boolean>(false);
    const [ paginationIsLoaded, sePaginationIsLoaded ] = useState<boolean>(false);

    // pagination items styles
    const common     = 'px-4 py-2 rounded text-gray-700 flex w-10 items-center justify-center h-10 text-sm font-medium hover:bg-blue-500/[0.08] dark:hover:text-brand-500';
    const currentCss = "bg-blue-500/[0.5] dark:text-white";
    const otherCss   = "dark:text-gray-400 hover:text-brand-500 ";

    // pagination button status
    const isFirstPage = currentPage === 1;
    const isLastPage  = currentPage === totalPages;
    
    const onClickPrevious = (event: any) => {
        event.preventDefault();

        let page = currentPage - 1;
        setCurrentPage(page);
        apiCall(page);
    }

    const onClickNext = (event: any) => {
        event.preventDefault();

        let page = currentPage + 1;
        setCurrentPage(page);
        apiCall(page);
    }

    const onClickPage = (event: any) => {
        event.preventDefault();
        let page = parseInt(event.target.value);

        setCurrentPage(page);   
        apiCall(page);
    }

    useEffect(() => {
        if (isFirstLoad == false) {
            setTimeout(() => { sePaginationIsLoaded(true); }, 1000);
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="pb-3 xl:pb-0">
                    <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                        Showing {currentPage == 1 ? 1 : ((currentPage-1)*limit+1)} to {(currentPage*limit) >= totalItems ? totalItems : (currentPage*limit)} of {totalItems} entries
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    {paginationIsLoaded ? (
                            <>
                                {!isFirstPage && (
                                <button id="prev" onClick={onClickPrevious} className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm">
                                    Previous
                                </button>
                                )}
                                <div className="flex items-center gap-2">
                                    {(pageArray?.map((number) => (
                                        <article key={uuidv4()}>
                                            <button onClick={onClickPage} value={number} className={(currentPage == number) ?  `${currentCss} ${common}` : `${otherCss} ${common}`}>{number}</button>
                                        </article>
                                    )))}
                                </div>
                                {!isLastPage && (
                                <button id="next" onClick={onClickNext} className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                                    Next
                                </button>
                                )}
                            </>
                        ) : (
                            <Loader></Loader>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
