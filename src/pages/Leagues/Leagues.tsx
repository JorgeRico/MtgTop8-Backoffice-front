import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance, addUrlPaginationParams, addUrlParam } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import CreateButton from '@/components/MtgComponent/CreateButton';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import TableComponent from '@/components/Tables/TableComponent';
import { useAuthStore } from '@/store/auth';
import Filters from '@/pages/Players/Filters';

const Tournaments = () => {
    const [ leagues, setLeagues ]      = useState<any[] | null>(null);
    const [ headerItem ]               = useState<string[]>([ 'id', 'name', 'isLegacy', 'year', 'current', 'active' ]);
    const [ currentPage ]              = useState<number>(1);
    const [ limit ]                    = useState<number>(2500);
    const [ isLoading, setIsLoading ]  = useState<boolean>(false);
    const [ totalItems, setTotalItems] = useState<number>(0);
    const { get, defaultHeaders }      = fetchInstance;
    const { toast }                    = commonFunctions;
    const { authToken }                = useAuthStore();
    const [ isFilterSelected, setIsFilterSelected ] = useState<boolean>(false);
    const [ selectedName, setSelectedName ]         = useState<string | null>('');
    const [ selectedYear, setSelectedYear ]         = useState<number | null>(null);

    const apiCall = async (page: number) => {
        setIsLoading(true);
        setIsFilterSelected(false);

        try {
            let url = "";
            // list
            if (selectedYear == null && selectedName == '') {
                url = addUrlPaginationParams(import.meta.env.VITE_API_URL+routing.leagues, page ?? 1, limit);
            }
            
            // filter name
            if (selectedYear != null && selectedName == '') {
                url = addUrlParam(import.meta.env.VITE_API_URL+routing.leagues, 'year', String(selectedYear));
            }

            // filter year
            if (selectedYear == null && selectedName != '') {
                url = addUrlParam(import.meta.env.VITE_API_URL+routing.leagues, 'name', String(selectedName));
            }

            await get(url, {headers: defaultHeaders(authToken)})
            .then(data => {
                const dataLeague = (data || []).map((item: any) => ({
                    id      : item.id,
                    name    : item.name,
                    format  : item.isLegacy === 1 ? 'Legacy' : '-',
                    year    : item.year,
                    current : Number(item.current) === 1 ? 'current' : '-',
                    active  : Number(item.active) === 1 ? 'active' : '-'
                }));

                setLeagues(dataLeague);
                setIsLoading(false);

                setSelectedYear(null);
                setSelectedName('');
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    };

    const getNumITems = async() => {
        const result = await get(`${import.meta.env.VITE_API_URL}${routing.leagues}/num`, {headers: defaultHeaders(authToken)});
        setTotalItems(result.count)
    }

    const onChangePage = (currentPage: number) => {
        setIsFilterSelected(false);
        apiCall(currentPage);
        getNumITems();
    }

    useEffect(() => {
        setIsFilterSelected(false);
        apiCall(currentPage);
        getNumITems();
    }, []);

    useEffect(() => {
        if (isFilterSelected) {
            apiCall(currentPage);
        }
    }, [isFilterSelected]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.leagues}
                        text="Add new League">
                    </CreateButton>

                    <Filters 
                        setIsFilterSelected = {setIsFilterSelected}
                        setSelectedYear     = {setSelectedYear}
                        selectedYear        = {selectedYear}
                        selectedName        = {selectedName}
                        setSelectedName     = {setSelectedName}
                    />

                    <TableComponent
                        header       = {headerItem} 
                        data         = {leagues ? leagues : []}
                        name         = "Leagues"
                        endpoint     = {endpoints.leagues}
                        onChangePage = {onChangePage}
                        isLoading    = {isLoading}
                        limit        = {limit}
                        totalItems   = {totalItems}
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Tournaments;
