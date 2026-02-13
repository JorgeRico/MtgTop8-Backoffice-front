import TrashIcon from '@/components/Icons/Trash';
import { v4 as uuidv4 } from "uuid";
import EditIcon from '@/components/Icons/Edit';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import LoaderSmall from '@/common/LoaderSmall';
import Loader from '@/common/Loader';
import { useState, useEffect } from 'react';
import "./module.css";
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

interface TableProps {
    header         : string[]; 
    name           : string;
    data           : Record<string, any>[]; 
    endpoint       : string;
    isLoading      : boolean;
    changeNumItems : Function;
}

const Table = ({ header, name, data, endpoint, isLoading, changeNumItems }: TableProps) => {
    let navigate                                     = useNavigate();
    const [ dataItems, setDataItems ]                = useState<Record<string, any>[]>(data);
    const { delete: deleteInstance, defaultHeaders } = fetchInstance;
    const { toast }                                  = commonFunctions;
    const { authToken }                              = useAuthStore()

    const editSubmit = (event: any, id: string) => {
        event.preventDefault();
        navigate(endpoint + "/edit/" + id);
    }

    const loading = (id: string) => {
        document.querySelector('#loading-item-'+id)?.classList.remove('hidden');
        document.querySelector('#edit-item-'+id)?.setAttribute('hidden', 'true');
        document.querySelector('#delete-item-'+id)?.setAttribute('hidden', 'true');
    }

    const removeItem = (id: string) => {
        document.querySelector('#slideSource-'+id)?.classList.toggle('fade');
        setTimeout(() => toast('success', "Deleted correctly, id: " + id), 1000);
        setTimeout(() => handleDelete(parseInt(id)), 1000);
        setTimeout(() => changeNumItems(), 1000);
    }

    // fake reload list
    const handleDelete = (id: number) => {
        setDataItems(dataItems.filter(item => item.id !== id));
    };

    const deleteSubmit = async (event: any, id: string) => {
        event.preventDefault();
        loading(id);

        try {
            await deleteInstance(`${import.meta.env.VITE_API_URL}/${endpoint}/${id}`, {headers: defaultHeaders(authToken)});
            removeItem(id);
        } catch (error) {
            toast('error', "Failed to delete Deck and Player");
        }
    }

    useEffect(() => {
        setDataItems(data);
    }, [data]);

    return (
        <>
            {!isLoading ? (
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        {name}
                    </h4>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4" key={uuidv4()}>
                                    {header.map((item) => (
                                        (item == 'id') ? (
                                            <th key={uuidv4()} className="py-4 px-4 font-medium text-black dark:text-white">
                                                {item}
                                            </th>
                                        ) : (
                                            <th key={uuidv4()} className="min-w-55 py-4 px-4 font-medium text-black dark:text-white">
                                                {item}
                                            </th>
                                        )
                                    ))}
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataItems.map((item) => (
                                    <tr key={uuidv4()} id={`slideSource-${item.id}`} className="slideSource">
                                        {Object.entries(item).map(([key, value]) => (
                                            <td key={uuidv4()} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className={`text-black dark:text-white ${key}`}>
                                                    {value}
                                                </p>
                                            </td>
                                        ))}
                                    
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5" >
                                                <div className="loading hidden" id={`loading-item-${item.id}`}>
                                                    <LoaderSmall></LoaderSmall>
                                                </div>
                                                <button id={`edit-item-${item.id}`} className="hover:text-primary editItem cursor-pointer" onClick={(e) => editSubmit(e, item.id)}>
                                                    <EditIcon></EditIcon>
                                                </button>
                                                <button id={`delete-item-${item.id}`} className="hover:text-primary deleteItem cursor-pointer" onClick={(e) => deleteSubmit(e, item.id)}>
                                                    <TrashIcon></TrashIcon>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <Loader></Loader>
            )}
        </>
    );
};

export default Table;
