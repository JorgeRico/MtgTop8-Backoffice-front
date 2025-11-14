interface InputProps {
    title: string;
}

const TopTitle = ({title}: InputProps) => {
    return (
        <>
            <article className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    {title}
                </h3>
            </article>    
        </>
    );
};

export default TopTitle;
