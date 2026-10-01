import YearFilter from '@/components/Filter/Year/YearFilter';
import NameFilter from '@/components/Filter/Name/NameFilter';
import { useEffect, useState } from 'react';

interface TableProps {
    apiCall           : Function;
    setClearFilters   : Function;
    endpoint          : string;
    nameLabel         : string;
    namePlaceholder   : string;
    setShowPagination : Function;
}

const Filters = ({ apiCall, setClearFilters, endpoint, nameLabel, namePlaceholder, setShowPagination }: TableProps ) => {
    const [ isFilterVisible, setIsFilterVisible ] = useState<boolean>(false);
    const [ isYearSelected, setIsYearSelected ]   = useState<boolean>(false);
    const [ isNameSelected, setIsNameSelected ]   = useState<boolean>(false);
    
    const onClickFilters = () => {
        setIsFilterVisible(true);
    }

    const onClickClearFilters = () => {
        setIsFilterVisible(false);
        setClearFilters(true);
        setShowPagination(true);
    }

    useEffect(() => {
        if (isYearSelected === true) {
            setIsNameSelected(false);
            setShowPagination(false);
        }
        if (isNameSelected === true) {
            setIsYearSelected(false);
            setShowPagination(false);
        }
        
    }, [isYearSelected, isNameSelected]);

    return (
        <>
            <div className="flex w-full justify-end items-end underline font-medium text-blue hover:text-opacity-90 cursor-pointer">
                <div onClick={onClickFilters} className="flex justify-end items-end underline font-medium text-blue hover:text-opacity-90 cursor-pointer">
                    filters
                </div>
                <div onClick={onClickClearFilters} className="ml-5 flex justify-end items-end underline font-medium text-blue hover:text-opacity-90 cursor-pointer">
                    clear filters
                </div>
            </div>
            { isFilterVisible && (
                <>
                    <div className={`${isFilterVisible ? 'block' : 'hidden'} w-full`}>
                        <YearFilter
                            apiCall           = {apiCall}
                            endpoint          = {endpoint}
                            isYearSelected    = {isYearSelected}
                            setIsYearSelected = {setIsYearSelected}
                        />
                        
                        <NameFilter
                            apiCall           = {apiCall}
                            endpoint          = {endpoint}
                            label             = {nameLabel}
                            placeholder       = {namePlaceholder}
                            setIsNameSelected = {setIsNameSelected}
                            isNameSelected    = {isNameSelected}
                        />
                    </div>
                </>
            )}
            
        </>
    );
};

export default Filters;
