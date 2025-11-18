import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { endpoints } from '@/types/endpoints';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import CreateButton from '@/components/MtgComponent/CreateButton';
import { toast } from '@/hooks/toast';
import TableComponent from '@/components/Tables/TableComponent';

const Tournaments = () => {
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);
    const [ leagues, setLeagues ]         = useState<any[] | null>(null);
    const [ headerItem ]                  = useState<string[]>([ 'id', 'name', 'isLegacy', 'year', 'current', 'active' ]);
    const [ page ]                        = useState<number>(1);
    const [ limit ]                       = useState<number>(10);
    const [ isLoading, setIsLoading ]     = useState<boolean>(false);
    const [ totalItems, setTotalItems]    = useState<number>(0);

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.leagues}?page=${page ?? 1}&limit=${limit}`)
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
                setIsLoading(false);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    };

    const getNumITems = async() => {
        const result = await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.leagues}/num`);
        
        setTotalItems(result.count)
    }

    useEffect(() => {
        if (isFirstLoad == false) {
            apiCall(page);
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.leagues}
                        text="Add new League">
                    </CreateButton>
                    <TableComponent
                        header          = {headerItem} 
                        data            = {leagues ? leagues : []}
                        name            = "Leagues"
                        endpoint        = {endpoints.leagues}
                        apiCall         = {apiCall}
                        isLoading       = {isLoading}
                        limit           = {limit}
                        apiNumItemsCall = {getNumITems}
                        totalItems      = {totalItems}
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Tournaments;
