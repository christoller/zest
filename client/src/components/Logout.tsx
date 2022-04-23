import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Logout(props: any) {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    let navigate = useNavigate();

    axios.post('/api/sessions/logout').then(() => {
        props.setAuth(false);
        navigate('/');
    });

    return (
        <div>
            <p>You have now been logged out.</p>
        </div>
    );
}
