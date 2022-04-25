export function getUsername() {
    const id = localStorage.getItem('user');
    if(id) {
        return id
    }
}