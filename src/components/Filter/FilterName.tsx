import NameFilter from '@/components/Filter/Name/NameFilter';
import { useState } from 'react';
import PlayerFilter from '@/components/Filter/Player/PlayerFilter';

interface TableProps {
    apiCall           : Function;
    setClearFilters   : Function;
    endpoint          : string;
    nameLabel         : string;
    namePlaceholder   : string;
    setShowPagination : Function;
}

const Filters = ({ apiCall, setClearFilters, endpoint, nameLabel, namePlaceholder, setShowPagination }: TableProps ) => {
    const [ isFilterVisible, setIsFilterVisible ]   = useState<boolean>(false);
    const [ isPlayerSelected, setIsPlayerSelected ] = useState<boolean>(false);
    const [ isNameSelected, setIsNameSelected ]     = useState<boolean>(false);
    
    const onClickFilters = () => {
        setIsFilterVisible(true);
    }

    const onClickClearFilters = () => {
        setIsFilterVisible(false);
        setClearFilters(true);
        setShowPagination(true);
    }

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
                        <PlayerFilter
                            apiCall             = {apiCall}
                            endpoint            = {endpoint}
                            label               = "Filter by player name"
                            placeholder         = "Enter player name"
                            isPlayerSelected    = {isPlayerSelected}
                            setIsPlayerSelected = {setIsPlayerSelected}
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
