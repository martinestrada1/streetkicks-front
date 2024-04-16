import { useState, useEffect } from 'react';
import axios from '../libs/axios';

export function useGetUsers() {
    const [user, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/user')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);
    return { user, error };
};