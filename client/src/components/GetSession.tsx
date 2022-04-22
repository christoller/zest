import { useEffect, useState } from 'react';

export function GetSession(props: any) {
    const id = sessionStorage.getItem('user');
    const [session, setSession] = useState('');
    const auth = props.auth;

    useEffect(() => {
        if (id) {
            setSession(id);
        }
    }, [id]);

    if (!auth) {
        return (
            <div>
                <p>Welcome! Please Login or Sign up below.</p>
            </div>
        );
    }
    return (
        <div>
            <p>Hello {session}!</p>
        </div>
    );
}
