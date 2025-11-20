import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { endpoints } from '@/types/endpoints';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import CreateButton from '@/components/MtgComponent/CreateButton';
import { toast } from '@/hooks/toast';
import TableComponent from '@/components/Tables/TableComponent';

const Players = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ players, setPlayers ]         = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'position', 'idTournament', 'idDeck' ]);
    const [ page ]                        = useState<number>(1);
    const [ limit ]                       = useState<number>(250);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);
    const [ totalItems, setTotalItems]    = useState<number>(0);

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.players}?page=${page}&limit=${limit}`)
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
        const result = await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.players}/num`);
        
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
                        endpoint={endpoints.players}
                        text="Add new Player">
                    </CreateButton>
                    <TableComponent
                        header          = {headerItem} 
                        data            = {players ? players : []}
                        name            = "Players"
                        endpoint        = {endpoints.players}
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

export default Players;
