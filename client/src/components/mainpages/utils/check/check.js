export const isMatch = (password,repassword) => {
    if(password === repassword) return true
    return false
}

export const isEmpty = (input) => {
    if(input === '') return true;
    return false;
}