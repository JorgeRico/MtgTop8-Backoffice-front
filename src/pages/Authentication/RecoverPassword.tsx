import AuthLayout from '@/layout/AuthLayout';
import Breadcrumb from '@/components/Breadcrumbs/Public';
import LeftSideComponent from '@/components/Authentication/LeftSide';
import RecoverPasswordComponent from '@/components/Authentication/RightSide/RecoverPassword';

const RecoverPassword = () => {
    return (
        <>
            <AuthLayout>
                <Breadcrumb pageName="Recover Password" />
                <section className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-wrap items-center">
                        <LeftSideComponent></LeftSideComponent>
                        <RecoverPasswordComponent></RecoverPasswordComponent>
                    </div>
                </section>
            </AuthLayout>
        </>
    );
};

export default RecoverPassword;
