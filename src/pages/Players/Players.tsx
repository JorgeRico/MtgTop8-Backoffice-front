import Table from '@/components/Tables/Table';
import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Loader from '@/common/Loader';
import { endpoints } from '@/types/endpoints';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import CreateButton from '@/components/MtgComponent/CreateButton';
import TablePagination from '@/components/Pagination';
import { toast } from '@/hooks/toast';
import { paginationHelpers } from '@/hooks/pagination';


const Players = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ players, setPlayers ]         = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'position', 'idTournament', 'idDeck' ]);
    const [ page, setPage]                = useState<number>(1);
    const [ limit ]                       = useState<number>(250);
    const [ totalItems, setTotalItems]    = useState<number>(0);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.players}?page=${page}&limit=${limit}`)
            .then(data => {
                const dataPlayer = (data || []).map((item: any) => ({
                    id           : item.id,
                    name         : item.name,
                    position     : item.position,
                    idTournament : item.idTournament,
                    idDeck       : item.idDeck
                }));

                setPlayers(dataPlayer);
                setIsLoading(false);
            })
        } catch (error) {
            toast('error', 'Failed to load players');
        }
    };

    const getNumITems = async() => {
        const result = await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.players}/num`);
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
                    <CreateButton
                        endpoint={endpoints.players}
                        text="Add new Player">
                    </CreateButton>
                    {players ? (
                        <>
                            <TablePagination
                                totalItems={totalItems}
                                totalPages={paginationHelpers.getTotalPages(totalItems, limit)}
                                pageArray={paginationHelpers.getPageNumbersArray(totalItems, limit)}
                                limit={limit}
                                apiCall={apiCall}
                            />
                            {!isLoading ? (
                                <Table
                                    header   = {headerItem} 
                                    data     = {players}
                                    name     = "Players"
                                    endpoint = {endpoints.players}
                                    apiCall  = {apiCall}
                                />
                                ) : (
                                    <Loader></Loader>
                                )
                            }
                            <TablePagination
                                totalItems={totalItems}
                                totalPages={paginationHelpers.getTotalPages(totalItems, limit)}
                                pageArray={paginationHelpers.getPageNumbersArray(totalItems, limit)}
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

export default Players;
