import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance, addUrlPaginationParams } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import CreateButton from '@/components/MtgComponent/CreateButton';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import TableComponent from '@/components/Tables/TableComponent';
import { useAuthStore } from '@/store/auth';
import Filters from '@/components/Filter/Filters';

const Leagues = () => {
    const [ leagues, setLeagues ]                   = useState<any[] | null>(null);
    const [ headerItem ]                            = useState<string[]>([ 'id', 'name', 'isLegacy', 'year', 'current', 'active' ]);
    const [ currentPage ]                           = useState<number>(1);
    const [ limit ]                                 = useState<number>(2500);
    const [ isLoading, setIsLoading ]               = useState<boolean>(false);
    const [ totalItems, setTotalItems]              = useState<number>(0);
    const { get, defaultHeaders }                   = fetchInstance;
    const { toast }                                 = commonFunctions;
    const { authToken }                             = useAuthStore();
    const [ selectedClearFilters, setClearFilters ] = useState<boolean>(false);
    const [ showPagination, setShowPagination ]     = useState<boolean>(true);

    const apiCall = async (url: string) => {
        setIsLoading(true);
        
        try {
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
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.leagues, currentPage, limit);
        apiCall(url);
        getNumITems();
    }

    useEffect(() => {
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.leagues, currentPage, limit);
        apiCall(url);
        getNumITems();
    }, []);

    useEffect(() => {
        if (selectedClearFilters === true) {
            let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.leagues, 1, limit);
            apiCall(url);
            getNumITems();
        }
    }, [selectedClearFilters]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.leagues}
                        text="Add new League">
                    </CreateButton>

                    <TableComponent
                        header         = {headerItem} 
                        data           = {leagues ? leagues : []}
                        name           = "Leagues"
                        endpoint       = {endpoints.leagues}
                        onChangePage   = {onChangePage}
                        isLoading      = {isLoading}
                        limit          = {limit}
                        totalItems     = {totalItems}
                        showPagination = {showPagination}
                        filters        = {
                            <Filters 
                                apiCall           = {apiCall}
                                setClearFilters   = {setClearFilters}
                                endpoint          = {import.meta.env.VITE_API_URL + routing.leagues}
                                nameLabel         = "Filter by League name"
                                namePlaceholder   = "Enter League name"
                                setShowPagination = {setShowPagination}
                            />
                        }
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Leagues;
