import AuthLayout from '@/layout/AuthLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import LeftSideComponent from '@/components/Authentication/LeftSide';
import SignUpComponent from '@/components/Authentication/RightSide/SignUp';

const SignUp = () => {
    return (
        <>
            <AuthLayout>
                <Breadcrumb pageName="Sign up" />
                <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-wrap items-center">
                        <LeftSideComponent></LeftSideComponent>
                        <SignUpComponent></SignUpComponent>
                    </div>
                </section>
            </AuthLayout>
        </>
    );
};

export default SignUp;
