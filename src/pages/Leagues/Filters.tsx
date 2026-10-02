import YearFilter from '@/components/Filter/Year/YearFilter';
import NameFilter from '@/components/Filter/Name/NameFilter';
import { useState } from 'react';
import { routing } from '@/types/web-routing';

interface TableProps {
    apiCall         : Function;
    setClearFilters : Function;
}

const LeagueFilters = ({ apiCall, setClearFilters }: TableProps ) => {
    const [ isFilterVisible, setIsFilterVisible ] = useState<boolean>(false);
    const [ isYearSelected, setIsYearSelected ]   = useState<boolean>(false);
    const [ isNameSelected, setIsNameSelected ]   = useState<boolean>(false);
    const endpoint = import.meta.env.VITE_API_URL + routing.leagues;
    // TODO: in future add isLegacy filter
    // now only we have legacy tournaments, but Vintage can be uploaded to database
    // TODO: Name filter can be a dropdown with different League names

    const onClickFilters = () => {
        setIsFilterVisible(true);
    }

    const onClickClearFilters = () => {
        setIsFilterVisible(false);
        setClearFilters(true);
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
                        <YearFilter
                            apiCall           = {apiCall}
                            endpoint          = {endpoint}
                            isYearSelected    = {isYearSelected}
                            setIsYearSelected = {setIsYearSelected}
                        />
                        
                        <NameFilter
                            apiCall           = {apiCall}
                            endpoint          = {endpoint}
                            label             = "Filter by League name"
                            placeholder       = "Enter League name"
                            isNameSelected    = {isNameSelected}
                            setIsNameSelected = {setIsNameSelected}
                        />
                    </div>
                </>
            )}
            
        </>
    );
};

export default LeagueFilters;
