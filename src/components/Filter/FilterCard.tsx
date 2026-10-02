import { useEffect, useState } from 'react';
import DeckFilter from '@/components/Filter/Deck/DeckFilter';

interface TableProps {
    apiCall           : Function;
    setClearFilters   : Function;
    endpoint          : string;
    nameLabel         : string;
    namePlaceholder   : string;
    setShowPagination : Function;
}

const FilterDeck = ({ apiCall, setClearFilters, endpoint, nameLabel, namePlaceholder, setShowPagination }: TableProps ) => {
    const [ isFilterVisible, setIsFilterVisible ] = useState<boolean>(false);
    const [ isDeckSelected, setIsDeckSelected ]   = useState<boolean>(false);
    
    const onClickFilters = () => {
        setIsFilterVisible(true);
    }

    const onClickClearFilters = () => {
        setIsFilterVisible(false);
        setClearFilters(true);
        setShowPagination(true);
    }

    useEffect(() => {
        if (isDeckSelected === true) {
            setShowPagination(false);
        }
    }, [isDeckSelected]);


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
                        <DeckFilter
                            apiCall           = {apiCall}
                            endpoint          = {endpoint}
                            label             = {nameLabel}
                            placeholder       = {namePlaceholder}
                            setIsDeckSelected = {setIsDeckSelected}
                            isDeckSelected    = {isDeckSelected}
                        />
                    </div>
                </>
            )}
            
        </>
    );
};

export default FilterDeck;
