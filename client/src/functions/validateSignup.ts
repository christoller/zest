export function validateSignup(body: any) {
    let error = ''

    if (body.username === ''){
        error = 'Username is required'
    } else if(body.email === '') {
        error = 'Email is required'
    } else if (body.password === ''){
        error = 'Password is required'
    } else if (body.username < 4) {
        error = 'Username must be at least 4 characters.';
    } else if (body.username.length > 30) {
        error = 'Username must not exceed 30 characters.';
    } else if (
        !body.password.match(/[a-z]+/) || 
        !body.password.match(/[A-Z]+/) || 
        !body.password.match(/[!@#$%^&*()~<>\[\]\\\/?{}'";:,.=+|_-`]+/) || !body.password.match(/[0-9]+/)) {
        error = 'Password must be at least 8 characters, contain a lower case letter, uppercase letter, special character and a number.'
    } else if (!body.email.match(/[@]+/)) {
        error = 'Invalid email address.'
    }
  
    console.log(`error is: ${error}`)
    return error
}