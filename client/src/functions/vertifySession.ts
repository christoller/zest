import axios from "axios";

export function vertifySession(setAuth: any) {
    let sessionData = ''
    axios.get('/api/sessions').then((response: any) => {
        if (response.data == localStorage.getItem('user_id')) {
            setAuth(true);   
            sessionData = response.data
        } else {
            setAuth(false);
        }
    });
    
    return sessionData
}