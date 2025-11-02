import Table from '../../components/Tables/Table';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { endpoints } from '../../types/endpoints';
import { fetchInstance } from '../../hooks/apiCalls';
import { routing } from '../../types/routing';

const Tournaments = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ leagues, setLeagues ]         = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'isLegacy', 'year', 'current', 'active' ];

    const apiCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.API_URL}:${import.meta.env.API_PORT}${routing.leagues}`)
            .then(data => {
                 const dataLeague = (data || []).map((item: any) => ({
                    id      : item.id,
                    name    : item.name,
                    format  : item.isLegacy === 1 ? 'Legacy' : '-',
                    year    : item.year,
                    current : Number(item.current) === 1 ? 'current' : '-',
                    active  : Number(item.active) === 1 ? 'active' : '-'
                }));

                setLeagues(dataLeague);
            })
        } catch (error) {
            console.error('Failed to load leagues', error);
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
                    {leagues ? (
                        <>
                            <Table
                                header   = {headerItem} 
                                data     = {leagues}
                                name     = "Leagues"
                                endpoint = {endpoints.leagues}
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
