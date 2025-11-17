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


const Tournaments = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ tournaments, setTournaments ] = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'date', 'players' ]);
    const [ page, setPage]                = useState<number>(1);
    const [ limit ]                       = useState<number>(10);
    const [ totalItems, setTotalItems]    = useState<number>(0);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);

    const apiCall = async (page: number) => {
        setIsLoading(true);
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.tournaments}?page=${page}&limit=${limit}`)
            .then(data => {
                const dataTournament = (data || []).map((item: any) => ({
                    id      : item.id,
                    name    : item.name,
                    date    : item.date,
                    players : item.players
                }));

                setTournaments(dataTournament);
                setIsLoading(false);
            })
        } catch (error) {
            toast('error', 'Failed to load tournaments');
        }
    };

    const getNumITems = async() => {
        const result = await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.tournaments}/num`);
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
                        endpoint={endpoints.tournaments}
                        text="Add new Tournament">
                    </CreateButton>
                    {tournaments ? (
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
                                    data     = {tournaments}
                                    name     = "Tournaments"
                                    endpoint = {endpoints.tournaments}
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

export default Tournaments;
