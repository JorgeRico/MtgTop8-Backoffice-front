import Table from '../components/Tables/Table';
import DefaultLayout from '../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Loader from '../common/Loader';
import { endpoints } from '../types/endpoints';

const Tournaments = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState(false);
    const [ leagues, setLeagues ]         = useState<any[] | null>(null);
    const headerItem                      = [ 'id', 'name', 'isLegacy', 'year', 'current', 'active' ];

    const apiCall = async () => {
        const authToken = Cookies.get('authToken');
        await fetch('http://127.0.0.1:5000/leagues', {
            headers: { 'Authorization': authToken || '' }
        })
        .then(response => response.json())
        .then(data => {
            let dataLeague: any[] = [];

            data.forEach((item: any) => {
                const values = {
                    id       : item.id,
                    name     : item.name,
                    format   : item.isLegacy == 1 ? 'Legacy' : '-',
                    year     : item.year,
                    current  : (parseInt(item.current) == 1) ? 'current' : '-',
                    active   : (parseInt(item.active) == 1) ? 'active' : '-'
                };
                dataLeague.push(values);
                console.log(values)
            });

            setLeagues(dataLeague);
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
