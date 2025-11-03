import Table from '../../components/Tables/Table';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { endpoints } from '../../types/endpoints';
import { fetchInstance } from '../../hooks/apiCalls';
import { routing } from '../../types/routing';
import CreateButton from '../../components/MtgComponent/CreateButton';
import TablePagination from '../../components/Pagination';
import { toast } from '../../hooks/toast';

const Players = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ players, setPlayers ]         = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'position', 'idTournament', 'idDeck' ];

    const apiCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.players}`)
            .then(data => {
                const dataPlayer = (data || []).map((item: any) => ({
                    id           : item.id,
                    name         : item.name,
                    position     : item.position,
                    idTournament : item.idTournament,
                    idDeck       : item.idDeck
                }));

                setPlayers(dataPlayer);
            })
        } catch (error) {
            toast('error', 'Failed to load players');
        }
    };

    useEffect(() => {
        if (isFirstLoad == false) {
            apiCall()
            
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
                            <Table
                                header   = {headerItem} 
                                data     = {players}
                                name     = "Players"
                                endpoint = {endpoints.players}
                            />
                            <TablePagination></TablePagination>
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
