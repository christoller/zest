import axios from 'axios';

export function Logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user_id');

    axios.post('/api/sessions/logout').then(() => {
        console.log('logged out');
    });

    return (
        <div>
            <p>You have now been logged out.</p>
        </div>
    );
}
