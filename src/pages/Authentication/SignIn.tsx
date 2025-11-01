import React from 'react';
import AuthLayout from '../../layout/AuthLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LeftSideComponent from '../../components/Authentication/LeftSide';
import SignInComponent from '../../components/Authentication/RightSide/SignIn';

const SignIn: React.FC = () => {
    return (
        <>
            <AuthLayout>
                <Breadcrumb pageName="Sign In" />
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-wrap items-center">
                        <LeftSideComponent></LeftSideComponent>
                        <SignInComponent></SignInComponent>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
};

export default SignIn;
