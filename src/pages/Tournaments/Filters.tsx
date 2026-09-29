import YearFilter from '@/components/Filter/Year/YearFilter';
import NameFilter from '@/components/Filter/Name/NameFilter';

interface TableProps {
    setIsFilterSelected : Function;
    setSelectedYear     : Function;
    selectedYear        : number | null;
    selectedName        : string | null;
    setSelectedName     : Function;
}

const TournamentFilters = ({ setIsFilterSelected, setSelectedYear, selectedYear, selectedName, setSelectedName }: TableProps ) => {
    
    return (
        <>
            <YearFilter
                selectedYear        = {selectedYear}
                setSelectedYear     = {setSelectedYear}
                setIsFilterSelected = {setIsFilterSelected}
            />
                                            
            <NameFilter
                selectedName        = {selectedName}
                setSelectedName     = {setSelectedName}
                setIsFilterSelected = {setIsFilterSelected}
            />
        </>
    );
};

export default TournamentFilters;
