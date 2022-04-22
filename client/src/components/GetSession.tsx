import { useEffect, useState } from 'react';

export function GetSession() {
    const id = sessionStorage.getItem('user');
    const [session, setSession] = useState('');

    useEffect(() => {
        if (id) {
            setSession(id);
        }
    }, []);

    return (
        <div>
            <p>Hello {session}!</p>
        </div>
    );
}
