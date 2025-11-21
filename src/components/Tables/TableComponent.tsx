import Table from '@/components/Tables/Table';
import { useState, useEffect } from 'react';
import Loader from '@/common/Loader';
import TablePagination from '@/components/Pagination';

interface TableProps {
    header       : string[]; 
    data         : Record<string, any>[]; 
    name         : string;
    endpoint     : string;
    onChangePage : Function;
    isLoading    : boolean;
    limit        : number;
    totalItems   : number;
}

const TableComponent = ({ header, name, data, endpoint, onChangePage, isLoading, limit, totalItems }: TableProps) => {
    const [ numItems, setNumItems ] = useState(0);

    const changeNumItems = () => {
        setNumItems(numItems-1);
    }

    useEffect(() => {
        setNumItems(totalItems);
    }, [totalItems > 0]);

    return (
        <>
            {data ? (
                <>
                    <TablePagination
                        totalItems     = {numItems}
                        limit          = {limit}
                        onChangePage   = {onChangePage}
                    />
                    <Table
                        header         = {header} 
                        data           = {data}
                        name           = {name}
                        endpoint       = {endpoint}
                        isLoading      = {isLoading}
                        changeNumItems = {changeNumItems}
                    />
                    <TablePagination
                        totalItems     = {numItems}
                        limit          = {limit}
                        onChangePage   = {onChangePage}
                    />
                </>
            ) : (
                <Loader />  
            )}
        </>
    );
};

export default TableComponent;
