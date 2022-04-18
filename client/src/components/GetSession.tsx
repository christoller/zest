import axios from 'axios';
import { useEffect, useState } from 'react';

export function GetSession() {
    const [session, setSession] = useState('');

    useEffect(() => {
        axios
            .get('/api/sessions')
            .then((response) => {
                setSession(`Hello ${response.data}!`);
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    }, []);

    return (
        <div>
            <p>{session}</p>
        </div>
    );
}
