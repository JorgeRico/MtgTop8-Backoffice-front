import Table from '../../components/Tables/Table';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { endpoints } from '../../types/endpoints';
import { fetchInstance } from '../../hooks/apiCalls';
import { routing } from '../../types/routing';

const Players = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ players, setPlayers ]         = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'position', 'idTournament', 'idDeck' ];

    const apiCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.API_URL}:${import.meta.env.API_PORT}${routing.players}`)
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
            console.error('Failed to load players', error);
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
                    {players ? (
                        <>
                            <Table
                                header   = {headerItem} 
                                data     = {players}
                                name     = "Players"
                                endpoint = {endpoints.players}
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
