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

const Players = () => {
    const [ players, setPlayers ]                   = useState<any[] | null>(null);
    const [ headerItem ]                            = useState<string[]>([ 'id', 'name', 'position', 'Tournament', 'Deck' ]);
    const [ currentPage ]                           = useState<number>(1);
    const [ limit ]                                 = useState<number>(250);
    const [ isLoading, setIsLoading ]               = useState<boolean>(false);
    const [ totalItems, setTotalItems]              = useState<number>(0);
    const { get, defaultHeaders }                   = fetchInstance;
    const { toast }                                 = commonFunctions;
    const { authToken }                             = useAuthStore();
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
                url = addUrlPaginationParams(import.meta.env.VITE_API_URL+routing.players, page, limit);
            }
            
            // filter name
            if (selectedYear != null && selectedName == '') {
                url = addUrlParam(import.meta.env.VITE_API_URL+routing.players, 'year', String(selectedYear));
            }

            // filter year
            if (selectedYear == null && selectedName != '') {
                url = addUrlParam(import.meta.env.VITE_API_URL+routing.players, 'name', String(selectedName));
            }
            
            await get(url, {headers: defaultHeaders(authToken)})
            .then(data => {
                const dataPlayer = (data || []).map((item: any) => ({
                    id         : item.id,
                    name       : item.name,
                    position   : item.position,
                    tournament : item.date + ' - ' + item.tournament,
                    deck       : item.deck
                }));

                setPlayers(dataPlayer);
                setIsLoading(false);

                setSelectedYear(null);
                setSelectedName('');
            })
        } catch (error) {
            toast('error', 'Failed to load players');
        }
    };

    const getNumITems = async() => {
        const result = await get(`${import.meta.env.VITE_API_URL}${routing.players}/num`, {headers: defaultHeaders(authToken)});
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
                        endpoint={endpoints.players}
                        text="Add new Player">
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
                        data         = {players ? players : []}
                        name         = "Players"
                        endpoint     = {endpoints.players}
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

export default Players;
