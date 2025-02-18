const validateEmail = (email)=>{
    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return regex.test(email);
}

const validatePassword = (pwd)=>{
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return regex.test(pwd);
}

export default {
    validateEmail,
    validatePassword
}