import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '@/types/routing';
import { endpoints } from '@/types/endpoints';
import { fetchInstance } from '@/hooks/apiCalls';
import TableComponent from '@/components/Tables/TableComponent';
import CreateButton from '@/components/MtgComponent/CreateButton';

const Decks = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ cards, setCards ]             = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'idDeck' ]);
    const [ page ]                        = useState<number>(1);
    const [ limit ]                       = useState<number>(2500);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);
    const [ totalItems, setTotalItems]    = useState<number>(0);

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.cards}?page=${page}&limit=${limit}`)
            .then(data => {
                 const dataCard = (data || []).map((item: any) => ({
                    id     : item.id,
                    name   : item.name,
                    idDeck : item.idDeck
                }));

                setCards(dataCard);
                setIsLoading(false);
            })
        } catch (error) {
            console.error('Failed to load cards', error);
        }
    };

    const getNumITems = async() => {
        const result = await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.cards}/num`);
        
        setTotalItems(result.count)
    }

    useEffect(() => {
        if (isFirstLoad == false) {
            apiCall(page);
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.cards}
                        text="Add new Card">
                    </CreateButton>
                    <TableComponent
                        header          = {headerItem} 
                        data            = {cards ? cards : []}
                        name            = "Cards"
                        endpoint        = {endpoints.cards}
                        apiCall         = {apiCall}
                        isLoading       = {isLoading}
                        limit           = {limit}
                        apiNumItemsCall = {getNumITems}
                        totalItems      = {totalItems}
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Decks;
