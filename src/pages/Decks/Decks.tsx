import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '@/types/web-routing';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import CreateButton from '@/components/MtgComponent/CreateButton';
import TableComponent from '@/components/Tables/TableComponent';

const Decks = () => {
    const [ decks, setDecks ]          = useState<any[] | null>(null);
    const [ headerItem ]               = useState<string[]>([ 'id', 'name', 'player', 'league' ]);
    const [ currentPage ]              = useState<number>(1);
    const [ limit ]                    = useState<number>(250);
    const [ isLoading, setIsLoading ]  = useState<boolean>(false);
    const [ totalItems, setTotalItems] = useState<number>(0);
    const { get }                      = fetchInstance;

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await get(`${import.meta.env.VITE_API_URL}${routing.decks}?page=${page}&limit=${limit}`)
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
            console.error('Failed to load decks', error);
        }
    };

    const getNumITems = async() => {
        const result = await get(`${import.meta.env.VITE_API_URL}${routing.decks}/num`);
        setTotalItems(result.count)
    }

    const onChangePage = (currentPage: number) => {
        apiCall(currentPage);
        getNumITems();
    }

    useEffect(() => {
        apiCall(currentPage);
        getNumITems();
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.decks}
                        text="Add new Deck">
                    </CreateButton>
                    <TableComponent
                        header       = {headerItem} 
                        data         = {decks ? decks : []}
                        name         = "Decks"
                        endpoint     = {endpoints.decks}
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

export default Decks;
