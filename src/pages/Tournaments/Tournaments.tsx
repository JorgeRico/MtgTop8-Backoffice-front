import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/web-routing';
import CreateButton from '@/components/MtgComponent/CreateButton';
import { toast } from '@/hooks/toast';
import TableComponent from '@/components/Tables/TableComponent';

const Tournaments = () => {
    const [ tournaments, setTournaments ] = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'date', 'players' ]);
    const [ currentPage ]                 = useState<number>(1);
    const [ limit ]                       = useState<number>(10);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);
    const [ totalItems, setTotalItems]    = useState<number>(0);

    const apiCall = async (page: number) => {
        setIsLoading(true);
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.tournaments}?page=${page}&limit=${limit}`)
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
        const result = await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.tournaments}/num`);
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
                        endpoint={endpoints.tournaments}
                        text="Add new Tournament">
                    </CreateButton>
                    <TableComponent
                        header       = {headerItem} 
                        data         = {tournaments ? tournaments : []}
                        name         = "Tournaments"
                        endpoint     = {endpoints.tournaments}
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

export default Tournaments;
