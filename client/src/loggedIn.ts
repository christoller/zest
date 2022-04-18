export function LoggedIn(){
    if(sessionStorage.getItem('user')){
        return true
    } else {
        return false
    }
}