import Table from '../../components/Tables/Table';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Loader from '../../common/Loader';
import { endpoints } from '../../types/endpoints';

const Decks = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ decks, setDecks ]             = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'idPlayer' ];

    const apiCall = async () => {
        const authToken = Cookies.get('authToken');
        await fetch('http://127.0.0.1:5000/decks', {
            headers: { 'Authorization': authToken || '' }
        })
        .then(response => response.json())
        .then(data => {
            let dataDeck: any[] = [];

            data.forEach((item: any) => {
                const values = {
                    id       : item.id,
                    name     : item.name,
                    idPlayer : item.idplayer
                };
                dataDeck.push(values);
            });

            setDecks(dataDeck);
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
                    {decks ? (
                        <>
                            <Table
                                header   = {headerItem} 
                                data     = {decks}
                                name     = "Decks"
                                endpoint = {endpoints.decks}
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

export default Decks;
