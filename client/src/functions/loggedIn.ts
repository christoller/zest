import axios from "axios";


export async function loggedIn(){
    const checkLogin = await axios.get('/api/sessions').then((response: any) => {
        if (response.data === localStorage.getItem('user_id')) {
            return true

        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('user_id');
            return false
        }
    });
    return checkLogin
}