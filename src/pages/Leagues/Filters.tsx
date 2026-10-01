import YearFilter from '@/components/Filter/Year/YearFilter';
import NameFilter from '@/components/Filter/Name/NameFilter';

interface TableProps {
    setIsFilterSelected : Function;
    setSelectedYear     : Function;
    selectedYear        : number | null;
    selectedName        : string | null;
    setSelectedName     : Function;
}

const LeagueFilters = ({ setIsFilterSelected, setSelectedYear, selectedYear, selectedName, setSelectedName }: TableProps ) => {
    // TODO: in future add isLegacy filter
    // now only we have legacy tournaments, but Vintage can be uploaded to database
    // TODO: Name filter can be a dropdown with different League names
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
                label               = "Filter by League name"
                placeholder         = "Enter League name"
            />
        </>
    );
};

export default LeagueFilters;
