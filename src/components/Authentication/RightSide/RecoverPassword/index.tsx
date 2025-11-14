import { useState } from 'react';
import { Link } from 'react-router-dom';
import MailImage from '../../../Icons/Mail';
import { routing } from '../../../../types/routing';
import firebase from '../../../../hooks/firebase.tsx';
import Loader from '../../../../common/LoaderSmall';
import { toast } from '../../../../hooks/toast';

const RecoverPassword = () => {
    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmitForm = async () => {
        setIsLoading(true);

        var email = document.querySelector<HTMLInputElement>('input[name="email"]')?.value;

        if (email) {
            if (await firebase.recover(email)) {
                setTimeout(() => toast('success', "Check your e-mail to proceed to change your password"), 1500);
                setTimeout(() => setIsLoading(false), 1500);
            }
        }
    }

    return (
        <>
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Recover Password
                    </h2>

                    <form action={onSubmitForm}>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <span className="absolute right-4 top-4">
                                    <MailImage></MailImage>
                                </span>
                            </div>
                        </div>

                        <div className="mb-5">
                            {!isLoading ? (
                                <input
                                    type="submit"
                                    value="Recover password"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                />
                            ) : (
                                <Loader></Loader>
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <p>
                                Already have an account?{' '}
                                <Link to={routing.home} className="text-primary">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RecoverPassword;
