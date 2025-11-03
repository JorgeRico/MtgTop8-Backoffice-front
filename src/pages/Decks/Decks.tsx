import Table from '../../components/Tables/Table';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { routing } from '../../types/routing';
import Loader from '../../common/Loader';
import { endpoints } from '../../types/endpoints';
import { fetchInstance } from '../../hooks/apiCalls';
import CreateButton from '../../components/MtgComponent/CreateButton';
import TablePagination from '../../components/Pagination';

const Decks = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ decks, setDecks ]             = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'idPlayer' ];

    const apiCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}`)
            .then(data => {
                 const dataDeck = (data || []).map((item: any) => ({
                    id       : item.id,
                    name     : item.name,
                    idPlayer : item.idPlayer
                }));

                setDecks(dataDeck);
            })
        } catch (error) {
            console.error('Failed to load decks', error);
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
                        endpoint={endpoints.decks}
                        text="Add new Deck">
                    </CreateButton>
                    {decks ? (
                        <>
                            <Table
                                header   = {headerItem} 
                                data     = {decks}
                                name     = "Decks"
                                endpoint = {endpoints.decks}
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

export default Decks;
