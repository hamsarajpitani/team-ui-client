
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import IPOListing from 'features/Team/listing';
import { fetchIpos } from 'features/Team/ipoSlice';

const Home = () => {
    const dipatch = useDispatch();

    useEffect(() => {
        dipatch(fetchIpos())
    }, [dipatch])

    return (
        <div>
            <IPOListing />
        </div>
    )
}

export default Home
