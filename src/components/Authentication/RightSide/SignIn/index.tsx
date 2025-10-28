import React from 'react';
import { Link } from 'react-router-dom';
import LockImage from '../../Images/Lock';
import MailImage from '../../Images/Mail';

const SignIn: React.FC = () => {
    return (
        <>
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Sign In to TailAdmin
                    </h2>

                    <form>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />

                                <span className="absolute right-4 top-4">
                                    <MailImage></MailImage>
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Re-type Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="6+ Characters, 1 Capital letter"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />

                                <span className="absolute right-4 top-4">
                                    <LockImage></LockImage>
                                </span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <input
                                type="submit"
                                value="Sign In"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                            />
                        </div>

                        <div className="mt-6 text-center">
                            <p>
                                Don’t have any account?{' '}
                                <Link to="/signup" className="text-primary">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
