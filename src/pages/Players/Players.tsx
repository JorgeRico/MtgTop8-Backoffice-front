import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { endpoints } from '@/types/api-endpoints';
import { fetchInstance, addUrlPaginationParams } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import CreateButton from '@/components/MtgComponent/CreateButton';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import TableComponent from '@/components/Tables/TableComponent';
import { useAuthStore } from '@/store/auth';

const Players = () => {
    const [ players, setPlayers ]      = useState<any[] | null>(null);
    const [ headerItem ]               = useState<string[]>([ 'id', 'name', 'position', 'Tournament', 'Deck' ]);
    const [ currentPage ]              = useState<number>(1);
    const [ limit ]                    = useState<number>(250);
    const [ isLoading, setIsLoading ]  = useState<boolean>(false);
    const [ totalItems, setTotalItems] = useState<number>(0);
    const { get, defaultHeaders }      = fetchInstance;
    const { toast }                    = commonFunctions;
    const { authToken }                = useAuthStore();

    const apiCall = async (page: number) => {
        setIsLoading(true);

        try {
            await get(addUrlPaginationParams(import.meta.env.VITE_API_URL+routing.players, page, limit), {headers: defaultHeaders(authToken)})
            .then(data => {
                const dataPlayer = (data || []).map((item: any) => ({
                    id         : item.id,
                    name       : item.name,
                    position   : item.position,
                    tournament : item.date + ' - ' + item.tournament,
                    deck       : item.deck
                }));

                setPlayers(dataPlayer);
                setIsLoading(false);
            })
        } catch (error) {
            toast('error', 'Failed to load players');
        }
    };

    const getNumITems = async() => {
        const result = await get(`${import.meta.env.VITE_API_URL}${routing.players}/num`, {headers: defaultHeaders(authToken)});
        setTotalItems(result.count)
    }

    const onChangePage = (currentPage: number) => {
        apiCall(currentPage);
        getNumITems();
    }

    useEffect(() => {
        apiCall(currentPage);
        getNumITems();
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-10">
                    <CreateButton
                        endpoint={endpoints.players}
                        text="Add new Player">
                    </CreateButton>
                    <TableComponent
                        header       = {headerItem} 
                        data         = {players ? players : []}
                        name         = "Players"
                        endpoint     = {endpoints.players}
                        onChangePage = {onChangePage}
                        isLoading    = {isLoading}
                        limit        = {limit}
                        totalItems   = {totalItems}
                    ></TableComponent>
                </div>
            </DefaultLayout>
        </>
    );
};

export default Players;
