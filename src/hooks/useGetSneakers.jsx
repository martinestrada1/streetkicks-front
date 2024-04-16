import { useState, useEffect } from 'react';
import axios from '../libs/axios';

export function useGetSneakers() {
    const [sneakers, setSneakers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/product')
            .then((response) => {
                setSneakers(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);
    return { sneakers, error };
}
