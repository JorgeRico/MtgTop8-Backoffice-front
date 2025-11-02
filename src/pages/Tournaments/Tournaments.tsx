import Table from '../../components/Tables/Table';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { endpoints } from '../../types/endpoints';
import { fetchInstance } from '../../hooks/apiCalls';
import { routing } from '../../types/routing';

const Tournaments = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ tournaments, setTournaments ] = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'date', 'players' ];

    const apiCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.API_URL}:${import.meta.env.API_PORT}${routing.tournaments}`)
            .then(data => {
                const dataTournament = (data || []).map((item: any) => ({
                    id      : item.id,
                    name    : item.name,
                    date    : item.date,
                    players : item.players
                }));

                setTournaments(dataTournament);
            })
        } catch (error) {
            console.error('Failed to load tournaments', error);
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
                    {tournaments ? (
                        <>
                            <Table
                                header   = {headerItem} 
                                data     = {tournaments}
                                name     = "Tournaments"
                                endpoint = {endpoints.tournaments}
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
