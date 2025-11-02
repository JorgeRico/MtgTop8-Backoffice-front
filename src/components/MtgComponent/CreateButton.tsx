const CreateButton = ({ endpoint, text }: { endpoint: string; text: string }) => {
    
    const onClickCreate = () => {
        window.location.href = endpoint + '/create'
    }

    return (
        <>
            <div className="flex w-full justify-end items-end">
                <button className="flex w-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={() => onClickCreate()}>
                    {text}
                </button>
            </div>
        </>
    );
};

export default CreateButton;
