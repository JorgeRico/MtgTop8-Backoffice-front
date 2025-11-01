import TrashIcon from '../Icons/Trash';
import { v4 as uuidv4 } from "uuid";
import EditIcon from '../Icons/Edit';
import React from 'react';
import { routing } from '../../types/routing';

const Table: React.FC<{ header: string[]; name: string; data: Record<string, any>[], endpoint: string }> = ({ header, name, data, endpoint }) => {
    const editSubmit = () => {
        window.location.href = endpoint + "/edit"
    }

    const deleteSubmit = () => {
        alert(endpoint)
        
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
                                <>
                                {(item == 'id') ? (
                                        <th key={uuidv4()} className="py-4 px-4 font-medium text-black dark:text-white">
                                            {item}
                                        </th>
                                    ) : (
                                        <th key={uuidv4()} className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                                            {item}
                                        </th>
                                    )}
                                </>
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
                                        <button className="hover:text-primary" onClick={() => editSubmit()}>
                                            <EditIcon></EditIcon>
                                        </button>
                                        <button className="hover:text-primary" onClick={() => deleteSubmit()}>
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
