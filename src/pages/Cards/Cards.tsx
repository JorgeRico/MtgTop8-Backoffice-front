import Table from '@/components/Tables/Table';
import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '@/types/routing';
import Loader from '@/common/Loader';
import { endpoints } from '@/types/endpoints';
import { fetchInstance } from '@/hooks/apiCalls';
import TablePagination from '@/components/Pagination';

const Decks = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ cards, setCards ]             = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'idDeck' ]);
    const [ page, setPage]                = useState<number>(1);
    const [ limit ]                       = useState<number>(250);
    const [ totalItems, setTotalItems]    = useState<number>(0);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.cards}?page=${page}&limit=${limit}`)
            .then(data => {
                 const dataCard = (data || []).map((item: any) => ({
                    id       : item.id,
                    name     : item.name,
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
            getNumITems();
            setPage(1)
            apiCall(page);
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    {cards ? (
                        <>
                            <TablePagination
                                totalItems={totalItems}
                                limit={limit}
                                apiCall={apiCall}
                            />
                            {!isLoading ? (
                                <Table
                                    header   = {headerItem} 
                                    data     = {cards}
                                    name     = "Decks"
                                    endpoint = {endpoints.cards}
                                    apiCall  = {apiCall}
                                />
                                ) : (
                                    <Loader></Loader>
                                )
                            }
                            <TablePagination
                                totalItems={totalItems}
                                limit={limit}
                                apiCall={apiCall}
                            />
                        </>
                    ) : (
                        <Loader />  
                    )}
                </div>
            </DefaultLayout>
        </>
    );
};

export default Decks;
