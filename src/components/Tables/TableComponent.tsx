import Table from '@/components/Tables/Table';
import { useState, useEffect, JSX } from 'react';
import Loader from '@/common/Loader';
import TablePagination from '@/components/Pagination';

interface TableProps {
    header         : string[]; 
    data           : Record<string, any>[]; 
    name           : string;
    endpoint       : string;
    onChangePage   : Function;
    isLoading      : boolean;
    limit          : number;
    totalItems     : number;
    filters        : JSX.Element;
    showPagination : boolean;
}

const TableComponent = ({ header, name, data, endpoint, onChangePage, isLoading, limit, totalItems, showPagination, filters }: TableProps) => {
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
                    {showPagination === true && (
                        <TablePagination
                            totalItems     = {numItems}
                            limit          = {limit}
                            onChangePage   = {onChangePage}
                        />
                    )}
                    
                    {filters ?? null}
                    <Table
                        header         = {header} 
                        data           = {data}
                        name           = {name}
                        endpoint       = {endpoint}
                        isLoading      = {isLoading}
                        changeNumItems = {changeNumItems}
                    />
                    {/* <TablePagination
                        totalItems     = {numItems}
                        limit          = {limit}
                        onChangePage   = {onChangePage}
                    /> */}
                </>
            ) : (
                <Loader />  
            )}
        </>
    );
};

export default TableComponent;
