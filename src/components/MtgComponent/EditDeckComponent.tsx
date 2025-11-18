import InputFormSimple from '@/components/Forms/InputForm/DeckCard';
import InputNumberFormSimple from '@/components/Forms/InputNumberForm/DeckCard';
import TopTitle from '@/components/Forms/Top';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';


interface EditDeckComponentProps {
    title  : string;
    cards  : any;
    option : string;
}

const EditDeckComponent = ({title, cards, option}: EditDeckComponentProps) => {
    const [ numSelected, setNumSelected ] = useState<number | null>(null);

    const onHandleEditCard = (event: any) => {
        event.preventDefault();

        document.querySelector('#num-'+ event.target.value)?.toggleAttribute('disabled');
        document.querySelector('#name-'+ event.target.value)?.toggleAttribute('disabled');

        document.querySelector('#edit-'+ event.target.value)?.toggleAttribute('hidden');
        document.querySelector('#save-'+ event.target.value)?.toggleAttribute('hidden');
    }

    const onHandleSaveCard = (event: any) => {
        event.preventDefault();

        document.querySelector('#num-'+ event.target.value)?.toggleAttribute('disabled');
        document.querySelector('#name-'+ event.target.value)?.toggleAttribute('disabled');

        document.querySelector('#edit-'+ event.target.value)?.toggleAttribute('hidden');
        document.querySelector('#save-'+ event.target.value)?.toggleAttribute('hidden');

        var name = document.querySelector<HTMLInputElement>('input[name="name-'+event.target.value+'"]')?.value;
        var num = document.querySelector<HTMLInputElement>('input[name="num-'+event.target.value+'"]')?.value;

        if (!name) {
            return '';
        }
        if (!num) {
            return '';
        }
        onSubmitForm(event.target.value, name, parseInt(num));
    }

    const onSubmitForm = async (id: number, name: string, num: number) => {
            // event.preventDefault();
            // setIsLoading(true);
    
            const body = {
                'name' : name,
                'num'  : num,
            }
    
            try {
                await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.cards}/${id}`, body)
                .then(data => {
                    // setTimeout(() => setIsLoading(false), 2000);
                    setTimeout(() => toast('success', "Deck Card updated correctly"), 2000);
                })
            } catch (error) {
                toast('error', "Failed to update card");
            }
        };

    return (
        <>
            <section className="flex flex-col gap-9 mb-5">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <TopTitle title={title}></TopTitle>
                    <div className="flex flex-col flex-grow gap-3 flex-wrap p-6.5">
                        {cards.map((item: any) => {
                            {if (item.board === option) 
                                return (
                                    <div className="w-full" key={uuidv4()}>
                                        <InputNumberFormSimple
                                            id={`num-${item.id}`}
                                            name={`num-${item.id}`}
                                            selectedOption={item.num}
                                        />
                                        <InputFormSimple
                                            id={`name-${item.id}`}
                                            name={`name-${item.id}`}
                                            selectedOption={item.name}
                                        />
                                        <button className="bg-secondary text-black-2 p-3 ml-4 rounded-md border-[1.5px] border-meta-10" value={item.id} onClick={onHandleEditCard} id={`edit-${item.id}`}>edit</button>
                                        <button className="bg-primary text-white p-3 ml-4 rounded-md border-[1.5px] border-meta-10" hidden value={item.id} onClick={onHandleSaveCard} id={`save-${item.id}`}>save</button>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditDeckComponent;
