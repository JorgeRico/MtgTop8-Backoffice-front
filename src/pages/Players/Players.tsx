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
    const [ selectedClearFilters, setClearFilters ] = useState<boolean>(false);
    const [ showPagination, setShowPagination ]     = useState<boolean>(true);

    const apiCall = async (url: string) => {
        setIsLoading(true);
        
        try {
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
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.players, currentPage, limit);
        apiCall(url);
        getNumITems();
    }

    useEffect(() => {
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.players, currentPage, limit);
        apiCall(url);
        getNumITems();
    }, []);

    useEffect(() => {
        if (selectedClearFilters === true) {
            let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.players, 1, limit);
            apiCall(url);
            getNumITems();
        }
    }, [selectedClearFilters]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.players}
                        text="Add new Player">
                    </CreateButton>

                    <TableComponent
                        header         = {headerItem} 
                        data           = {players ? players : []}
                        name           = "Players"
                        endpoint       = {endpoints.players}
                        onChangePage   = {onChangePage}
                        isLoading      = {isLoading}
                        limit          = {limit}
                        totalItems     = {totalItems}
                        showPagination = {showPagination}
                        filters        = {
                            <Filters 
                                apiCall           = {apiCall}
                                setClearFilters   = {setClearFilters}
                                endpoint          = {import.meta.env.VITE_API_URL + routing.players}
                                nameLabel         = "Filter by Player name"
                                namePlaceholder   = "Enter Player name"
                                setShowPagination = {setShowPagination}
                            />
                        }
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Players;
