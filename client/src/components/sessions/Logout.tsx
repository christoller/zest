import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Logout(props: any) {
    const navigate = useNavigate();
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');

    axios.post('/api/sessions/logout').then(() => {
        navigate('/');
    });

    return (
        <div>
            <p>You have now been logged out.</p>
        </div>
    );
}
