
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import TeamListing from 'features/Team/listing';
import { fetchTeamList } from 'features/Team/api';

const Home = () => {
    const dipatch = useDispatch();

    useEffect(() => {
        dipatch(fetchTeamList())
    }, [dipatch])

    return (
        <div>
            <TeamListing />
        </div>
    )
}

export default Home
