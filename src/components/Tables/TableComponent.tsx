import Table from '@/components/Tables/Table';
import { useState, useEffect } from 'react';
import Loader from '@/common/Loader';
import TablePagination from '@/components/Pagination';

interface TableProps {
    header          : string[]; 
    data            : Record<string, any>[]; 
    name            : string;
    endpoint        : string;
    apiCall         : Function;
    isLoading       : boolean;
    limit           : number;
    apiNumItemsCall : Function;
    totalItems      : number;
}

const TableComponent = ({ header, name, data, endpoint, apiCall, isLoading, limit, apiNumItemsCall, totalItems }: TableProps) => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ page, setPage]                = useState<number>(1);

    useEffect(() => {
        if (isFirstLoad == false) {
            apiNumItemsCall();
            setPage(1)
            apiCall(page);
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <>
            {data ? (
                <>
                    <TablePagination
                        totalItems = {totalItems}
                        limit      = {limit}
                        apiCall    = {apiCall}
                    />
                    <Table
                        header          = {header} 
                        data            = {data}
                        name            = {name}
                        endpoint        = {endpoint}
                        apiCall         = {apiCall}
                        isLoading       = {isLoading}
                        apiNumItemsCall = {apiNumItemsCall}
                    />
                    <TablePagination
                        totalItems = {totalItems}
                        limit      = {limit}
                        apiCall    = {apiCall}
                    />
                </>
            ) : (
                <Loader />  
            )}
        </>
    );
};

export default TableComponent;
