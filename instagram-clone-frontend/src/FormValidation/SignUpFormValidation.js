import React from 'react'

function SignUpFormValidation(values) {
    let errors = {};
    const passwordRegex = /(?=.*[0-9])/;
    if (!values.username) {
        errors.username = "Username is required .";
    }
    if (!values.email) {
        errors.email = "Email is required .";
    }
    else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid .";
    }
    if (!values.password) {
        errors.password = "Password id required .";
    } else if (values.password.length < 8) {
        errors.password = "Password must contain at least 8 caracter .";
    } else if (!passwordRegex.test(values.password)) {
        errors.password = "Invalid password. Must contain one number.";
    }
    if (!values.password_confirm) {
        errors.password_confirm = "Password Confirmation is required .";
    } else if (values.password != values.password_confirm) {
        errors.password_confirm = "Password didnt match ."
    }

    return errors;
}

export default SignUpFormValidation
