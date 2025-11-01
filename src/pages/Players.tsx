import Table from '../components/Tables/Table';
import DefaultLayout from '../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Loader from '../common/Loader';
import { endpoints } from '../types/endpoints';

const Players = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ players, setPlayers ]         = useState<any[] | null>(null);
    const headerItem = [ 'id', 'name', 'position', 'idTournament', 'idDeck' ];

    const apiCall = async () => {
        const authToken = Cookies.get('authToken');
        await fetch('http://127.0.0.1:5000/players', {
            headers: { 'Authorization': authToken || '' }
        })
        .then(response => response.json())
        .then(data => {
            let dataPlayer: any[] = [];

            data.forEach((item: any) => {
                const values = {
                    id           : item.id,
                    name         : item.name,
                    position     : item.position,
                    idTournament : item.idTournament,
                    idDeck       : item.idDeck
                };
                dataPlayer.push(values);
            });

            setPlayers(dataPlayer);
        })
        .catch(err => {
            console.error(err)
        });
    }

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
