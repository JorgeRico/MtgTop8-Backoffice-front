import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '@/types/web-routing';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance, addUrlPaginationParams } from '@/hooks/useApiCalls.tsx';
import CreateButton from '@/components/MtgComponent/CreateButton';
import TableComponent from '@/components/Tables/TableComponent';
import { useAuthStore } from '@/store/auth';
import FilterName from '@/components/Filter/FilterName';
import { commonFunctions } from '@/hooks/useCommonFunctions';

const Decks = () => {
    const [ decks, setDecks ]                       = useState<any[] | null>(null);
    const [ headerItem ]                            = useState<string[]>([ 'id', 'name', 'player', 'league' ]);
    const [ currentPage ]                           = useState<number>(1);
    const [ limit ]                                 = useState<number>(250);
    const [ isLoading, setIsLoading ]               = useState<boolean>(false);
    const [ totalItems, setTotalItems]              = useState<number>(0);
    const { get, defaultHeaders }                   = fetchInstance;
    const { authToken }                             = useAuthStore();
    const [ selectedClearFilters, setClearFilters ] = useState<boolean>(false);
    const [ showPagination, setShowPagination ]     = useState<boolean>(true);
    const { toast }                                 = commonFunctions;
    
    const apiCall = async (url: string) => {
        setIsLoading(true);
        
        try {
            await get(url, {headers: defaultHeaders(authToken)})
            .then(data => {
                 const dataDeck = (data || []).map((item: any) => ({
                    id       : item.id,
                    name     : item.name,
                    player   : item.player,
                    league   : item.league
                }));

                setDecks(dataDeck);
                setIsLoading(false);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    };

    const getNumITems = async() => {
        const result = await get(`${import.meta.env.VITE_API_URL}${routing.decks}/num`, {headers: defaultHeaders(authToken)});
        setTotalItems(result.count)
    }

    const onChangePage = (currentPage: number) => {
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.decks, currentPage, limit);
        apiCall(url);
        getNumITems();
    }

    useEffect(() => {
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.decks, currentPage, limit);
        apiCall(url);
        getNumITems();
    }, []);

    useEffect(() => {
        if (selectedClearFilters === true) {
            let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.decks, 1, limit);
            apiCall(url);
            getNumITems();
        }
    }, [selectedClearFilters]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.decks}
                        text="Add new Deck">
                    </CreateButton>
                    <TableComponent
                        header         = {headerItem} 
                        data           = {decks ? decks : []}
                        name           = "Decks"
                        endpoint       = {endpoints.decks}
                        onChangePage   = {onChangePage}
                        isLoading      = {isLoading}
                        limit          = {limit}
                        totalItems     = {totalItems}
                        showPagination = {showPagination}
                        filters      = {
                            <FilterName 
                                apiCall           = {apiCall}
                                setClearFilters   = {setClearFilters}
                                endpoint          = {import.meta.env.VITE_API_URL + routing.decks}
                                nameLabel         = "Filter by deck name"
                                namePlaceholder   = "Enter Deck name"
                                setShowPagination = {setShowPagination}
                            />
                        }
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Decks;
