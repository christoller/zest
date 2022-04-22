export function loggedIn(){
    if(sessionStorage.getItem('user')){
        return true
    } else {
        return false
    }
}