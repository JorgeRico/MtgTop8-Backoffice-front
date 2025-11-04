import TrashIcon from '../Icons/Trash';
import { v4 as uuidv4 } from "uuid";
import EditIcon from '../Icons/Edit';
import React from 'react';
import { fetchInstance } from '../../hooks/apiCalls';
import { toast } from '../../hooks/toast';
import Loader from '../../common/LoaderSmall';

const Table: React.FC<{ header: string[]; name: string; data: Record<string, any>[], endpoint: string, apiCall: Function }> = ({ header, name, data, endpoint, apiCall }) => {
    const editSubmit = () => {
        window.location.href = endpoint + "/edit"
    }

    const deleteSubmit = async (event: any, id: string) => {
        event.currentTarget.classList.toggle('hidden');
        document.querySelector('#loading-item-'+id)?.classList.toggle('hidden');
        document.querySelector('#edit-item-'+id)?.classList.toggle('hidden');
        
        try {
            await fetchInstance.delete(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/${endpoint}/${id}`)
            .then(data => {
                setTimeout(() => toast('success', "Deleted correctly, id: " + id), 1000);
                setTimeout(() => apiCall(), 1500);
            })
        } catch (error) {
            toast('error', "Failed to delete Deck and Player");
        }
    }

    return (
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
                                    <th key={uuidv4()} className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
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
                        {data.map((item) => (
                            <tr key={uuidv4()}>
                                {Object.entries(item).map(([key, value]) => (
                                    <td key={uuidv4()} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className={`text-black dark:text-white ${key}`}>
                                            {value}
                                        </p>
                                    </td>
                                ))}
                            
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <div className="loading hidden" id={`loading-item-${item.id}`}>
                                            <Loader></Loader>
                                        </div>
                                        <button id={`edit-item-${item.id}`} className="hover:text-primary editItem" onClick={() => editSubmit()}>
                                            <EditIcon></EditIcon>
                                        </button>
                                        <button id={`delete-item-${item.id}`} className="hover:text-primary deleteItem" onClick={(e) => deleteSubmit(e, item.id)}>
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
    );
};

export default Table;
