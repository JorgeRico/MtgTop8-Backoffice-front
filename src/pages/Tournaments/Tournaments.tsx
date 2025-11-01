import Table from '../../components/Tables/Table';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Loader from '../../common/Loader';
import { endpoints } from '../../types/endpoints';

const Tournaments = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ tournaments, setTournaments ] = useState<any[] | null>(null);
    const headerItem = [ 'id', 'name', 'date', 'players' ];

    const apiCall = async () => {
        const authToken = Cookies.get('authToken');
        await fetch('http://127.0.0.1:5000/tournaments', {
            headers: { 'Authorization': authToken || '' }
        })
        .then(response => response.json())
        .then(data => {
            let dataTournament: any[] = [];

            data.forEach((item: any) => {
                const values = {
                    id      : item.id,
                    name    : item.name,
                    date    : item.date,
                    players : item.players
                };
                dataTournament.push(values);
            });

            setTournaments(dataTournament);
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
