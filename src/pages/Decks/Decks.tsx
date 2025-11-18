import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '@/types/routing';
import { endpoints } from '@/types/endpoints';
import { fetchInstance } from '@/hooks/apiCalls';
import CreateButton from '@/components/MtgComponent/CreateButton';
import TableComponent from '@/components/Tables/TableComponent';

const Decks = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ decks, setDecks ]             = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'idPlayer' ]);
    const [ page ]                        = useState<number>(1);
    const [ limit ]                       = useState<number>(250);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);
    const [ totalItems, setTotalItems]    = useState<number>(0);

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}?page=${page}&limit=${limit}`)
            .then(data => {
                 const dataDeck = (data || []).map((item: any) => ({
                    id       : item.id,
                    name     : item.name,
                    idPlayer : item.idPlayer
                }));

                setDecks(dataDeck);
                setIsLoading(false);
            })
        } catch (error) {
            console.error('Failed to load decks', error);
        }
    };

    const getNumITems = async() => {
        const result = await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}/num`);
        
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
                        endpoint={endpoints.decks}
                        text="Add new Deck">
                    </CreateButton>
                    <TableComponent
                        header          = {headerItem} 
                        data            = {decks ? decks : []}
                        name            = "Decks"
                        endpoint        = {endpoints.decks}
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
