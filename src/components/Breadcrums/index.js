import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const BreadcrumLink = ({ route, isLast }) => {
    let decodedSlug = decodeURIComponent(route);
    let formattedText = decodedSlug.replace(/-/g, ' ');
    return (
        <span key={route} className="flex items-center capitalize">
            <MdKeyboardArrowRight className="mx-1" size={21} />
            {isLast ? (
                <span className='cursor-default'>{formattedText}</span>
            ) : (
                <Link to={route}>{formattedText}</Link>
            )}
        </span>
    )
}

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const routesList = pathname.split('/').filter(Boolean);
    return (
        <div className="flex items-center  text-secondary text-base">
            <Link to={'/'}>
                Home
            </Link>
            {routesList?.map((route, index) => {
                const isLast = index === routesList.length - 1;
                return (
                    <BreadcrumLink route={route} isLast={isLast} />
                );
            })}
        </div>
    );
};

export default Breadcrumbs;
