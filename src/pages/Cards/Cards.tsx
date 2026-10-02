import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '@/types/web-routing';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance, addUrlPaginationParams } from '@/hooks/useApiCalls.tsx';
import TableComponent from '@/components/Tables/TableComponent';
import CreateButton from '@/components/MtgComponent/CreateButton';
import { useAuthStore } from '@/store/auth';
import Filters from '@/components/Filter/FilterCard';

const Decks = () => {
    const [ cards, setCards ]                       = useState<any[] | null>(null);
    const [ headerItem ]                            = useState<string[]>([ 'id', 'name', 'idDeck', 'board']);
    const [ currentPage ]                           = useState<number>(1);
    const [ limit ]                                 = useState<number>(2500);
    const [ isLoading, setIsLoading ]               = useState<boolean>(false);
    const [ totalItems, setTotalItems]              = useState<number>(0);
    const { get, defaultHeaders }                   = fetchInstance;
    const { authToken }                             = useAuthStore();
    const [ selectedClearFilters, setClearFilters ] = useState<boolean>(false);
    const [ showPagination, setShowPagination ]     = useState<boolean>(true);

    const apiCall = async (url: string) => {
        setIsLoading(true);

        try {
            await get(url, {headers: defaultHeaders(authToken)})
            .then(data => {
                const dataCard = (data || []).map((item: any) => ({
                    id     : item.id,
                    name   : item.num + ' '  + item.name,
                    idDeck : item.idDeck + ' - ' + item.decks.name,
                    board  : item.board == "sb" ? 'Sideboard' : 'Maindeck'
                }));

                setCards(dataCard);
                setIsLoading(false);
            })
        } catch (error) {
            console.error('Failed to load cards', error);
        }
    };

    const getNumITems = async() => {
        const result = await get(`${import.meta.env.VITE_API_URL}${routing.cards}/num`, {headers: defaultHeaders(authToken)});
        setTotalItems(result.count)
    }

    const onChangePage = (currentPage: number) => {
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.cards, currentPage, limit);
        apiCall(url);
        getNumITems();
    }

    useEffect(() => {
        let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.cards, currentPage, limit);
        apiCall(url);
        getNumITems();
    }, []);

    useEffect(() => {
        if (selectedClearFilters === true) {
            let url = addUrlPaginationParams(import.meta.env.VITE_API_URL + routing.cards, 1, limit);
            apiCall(url);
            getNumITems();
        }
    }, [selectedClearFilters]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.cards}
                        text="Add new Card">
                    </CreateButton>

                    <TableComponent
                        header       = {headerItem} 
                        data         = {cards ? cards : []}
                        name         = "Cards"
                        endpoint     = {endpoints.cards}
                        onChangePage = {onChangePage}
                        isLoading    = {isLoading}
                        limit        = {limit}
                        totalItems   = {totalItems}
                        showPagination = {showPagination}
                        filters        = {
                            <Filters 
                                apiCall           = {apiCall}
                                setClearFilters   = {setClearFilters}
                                endpoint          = {import.meta.env.VITE_API_URL + routing.cards}
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

export default Decks;
