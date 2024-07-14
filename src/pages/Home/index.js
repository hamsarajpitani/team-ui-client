
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import TeamListing from 'features/Team/listing';
import { fetchteams } from 'features/Team/teamSlice';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchteams())
    }, [dispatch])

    return (
        <div>
            <TeamListing />
        </div>
    )
}

export default Home
