import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '@/types/web-routing';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import TableComponent from '@/components/Tables/TableComponent';
import CreateButton from '@/components/MtgComponent/CreateButton';

const Decks = () => {
    const [ cards, setCards ]          = useState<any[] | null>(null);
    const [ headerItem ]               = useState<string[]>([ 'id', 'name', 'idDeck' ]);
    const [ currentPage ]              = useState<number>(1);
    const [ limit ]                    = useState<number>(2500);
    const [ isLoading, setIsLoading ]  = useState<boolean>(false);
    const [ totalItems, setTotalItems] = useState<number>(0);
    const { get }                      = fetchInstance;

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await get(`${import.meta.env.VITE_API_URL}${routing.cards}?page=${page}&limit=${limit}`)
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
        const result = await get(`${import.meta.env.VITE_API_URL}${routing.cards}/num`);
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
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Decks;
