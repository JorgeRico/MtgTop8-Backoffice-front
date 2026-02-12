import InputFormSimple from '@/components/Forms/InputForm/DeckCard';
import InputNumberFormSimple from '@/components/Forms/InputNumberForm/DeckCard';
import TopTitle from '@/components/Forms/Top';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';

interface EditDeckComponentProps {
    title  : string;
    cards  : any;
    option : string;
}

const EditDeckComponent = ({title, cards, option}: EditDeckComponentProps) => {
    const [ numSelected, setNumSelected ]   = useState<number | null>(null);
    const [ nameSelected, setNameSelected ] = useState<string | null>(null);
    const { put }                           = fetchInstance;
    const { toast }                         = commonFunctions;

    const onHandleEditCard = (event: any) => {
        event.preventDefault();

        setTimeout(() => document.querySelector('#num-'  + event.target.value)?.toggleAttribute('disabled'), 500);
        setTimeout(() => document.querySelector('#name-' + event.target.value)?.toggleAttribute('disabled'), 500);
        setTimeout(() => document.querySelector('#edit-' + event.target.value)?.classList.add('hidden'), 100);
        setTimeout(() => document.querySelector('#save-' + event.target.value)?.classList.remove('hidden'), 500);
    }

    const onHandleSaveCard = async (event: any) => {
        event.preventDefault();

        var name = document.querySelector<HTMLInputElement>('input[name="name-' + event.target.value+'"]')?.value;
        var num  = document.querySelector<HTMLInputElement>('input[name="num-'  + event.target.value+'"]')?.value;

        document.querySelector('#num-'  + event.target.value)?.toggleAttribute('disabled');
        document.querySelector('#name-' + event.target.value)?.toggleAttribute('disabled');
        document.querySelector('#save-' + event.target.value)?.classList.add('hidden');

        if (!name) {
            return '';
        }
        
        if (!num) {
            return '';
        }

        onSubmitForm(event, event.target.value, name, parseInt(num));
    }

    const onSubmitForm = async (event: any, id: number, name: string, num: number) => {
            event.preventDefault();
    
            const body = {
                'name' : name,
                'num'  : num,
            }
    
            try {
                await put(`${import.meta.env.VITE_API_URL}${routing.cards}/${id}`, body)
                .then(() => {
                    setTimeout(() => toast('success', "Deck Card updated correctly"), 500);
                    setTimeout(() => document.querySelector('#edit-' + id)?.classList.remove('hidden'), 1500);
                    setNameSelected(name);
                    setNumSelected(num);
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
                    <div className="flex flex-col grow gap-3 flex-wrap p-6.5">
                        {cards.length > 0 ? (
                                <>
                                {cards.map((item: any) => {
                                    if (item.board === option) 
                                        return (
                                            <div className="w-full" key={uuidv4()}>
                                                <InputNumberFormSimple
                                                    id={`num-${item.id}`}
                                                    name={`num-${item.id}`}
                                                    selectedOption={numSelected ?? item.num}
                                                />
                                                <InputFormSimple
                                                    id={`name-${item.id}`}
                                                    name={`name-${item.id}`}
                                                    selectedOption={nameSelected ?? item.name}
                                                />
                                                <button className="bg-secondary text-black-2 p-3 ml-4 rounded-md border-[1.5px] border-meta-10" value={item.id} onClick={onHandleEditCard} id={`edit-${item.id}`}>edit</button>
                                                <button className="bg-primary text-white p-3 ml-4 rounded-md border-[1.5px] border-meta-10 hidden" value={item.id} onClick={onHandleSaveCard} id={`save-${item.id}`}>save</button>
                                            </div>
                                        )
                                    }
                                )}
                                </>
                            ) : (
                                <div className="w-full">
                                    <p>No cards in this section</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditDeckComponent;
