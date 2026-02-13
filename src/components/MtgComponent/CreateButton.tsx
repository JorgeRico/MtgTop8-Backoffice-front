import { useNavigate } from 'react-router-dom';

const CreateButton = ({ endpoint, text }: { endpoint: string; text: string }) => {
    let navigate = useNavigate();
    
    const onClickCreate = () => {
        navigate(endpoint + '/create');
    }

    return (
        <>
            <div className="flex w-full justify-end items-end">
                <button className="flex w-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 cursor-pointer" onClick={() => onClickCreate()}>
                    {text}
                </button>
            </div>
        </>
    );
};

export default CreateButton;
