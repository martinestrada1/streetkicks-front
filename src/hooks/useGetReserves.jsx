import { useState, useEffect } from 'react';
import axios from '../libs/axios';

export function useGetReserves() {
    const [reserves, setReserves] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/apartado')
            .then((response) => {
                setReserves(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);
    return { reserves, error };
}