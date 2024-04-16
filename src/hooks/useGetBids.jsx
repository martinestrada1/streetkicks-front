import { useState, useEffect } from 'react';
import axios from '../libs/axios';

export function useGetBids() {
    const [bids, setBids] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/comment')
            .then((response) => {
                setBids(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);
    return { bids, error };
};