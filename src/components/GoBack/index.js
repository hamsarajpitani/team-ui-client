
import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { tw } from '../../utils/helpers/tw';

const GoBack = ({ from = '/', className }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate(from, { replace: true });
        }
    };

    return (
        <div onClick={handleGoBack} className={tw('h-11 w-11 place-content-center rounded-lg border p-2 shadow-md flex items-center justify-center', className)}>
            <MdArrowBackIos />
        </div >
    )
}

export default GoBack