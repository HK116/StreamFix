import userSWR from 'swr';
import fetcher from '../lib/fetcher';

const userMovieList = () => {
    const {data, error, isLoading} = userSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading
    }
}

export default userMovieList;