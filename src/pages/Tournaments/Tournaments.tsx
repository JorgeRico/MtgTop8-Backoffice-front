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

const Tournaments = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ tournaments, setTournaments ] = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'date', 'players' ];

    const apiCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.tournaments}`)
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
            toast('error', 'Failed to load tournaments');
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
                        endpoint={endpoints.tournaments}
                        text="Add new Tournament">
                    </CreateButton>
                    {tournaments ? (
                        <>
                            <Table
                                header   = {headerItem} 
                                data     = {tournaments}
                                name     = "Tournaments"
                                endpoint = {endpoints.tournaments}
                                apiCall  = {apiCall}
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

export default Tournaments;
