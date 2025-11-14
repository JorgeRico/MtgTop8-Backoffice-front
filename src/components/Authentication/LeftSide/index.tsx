import { Link } from 'react-router-dom';
import LogoDark from './../../../images/logo/logo-dark.svg';
import Logo from './../../../images/logo/logo.svg';
import MobileImage from '../../Icons/Mobile';
import { routing } from '../../../types/routing';

const LeftSideSignInComponent = () => {
    return (
        <>
            <div className="hidden w-full xl:block xl:w-1/2">
                <div className="py-17.5 px-26 text-center">
                    <Link className="mb-5.5 inline-block" to={routing.home}>
                        <img className="hidden dark:block" src={Logo} alt="Logo" />
                        <img className="dark:hidden" src={LogoDark} alt="Logo" />
                    </Link>
                    <span className="inline-block">
                        <MobileImage></MobileImage>
                    </span>
                </div>
            </div>
        </>
    );
};

export default LeftSideSignInComponent;
