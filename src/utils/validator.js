export const isRequired = () => {
    return {
        checkValidate: (value) => {
            console.log(value)
            return value.trim() ? undefined : "The field is required"
        }
    }
}

export const isEmail = () => {
    return {
        checkValidate: (value) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value) ? undefined : "The field must be email"
        }
    }
}

export const isUsername = () => {
    return {
        checkValidate: (value) => {
            const re = /^[a-zA-Z0-9]+$/;
            return re.test(value) ? undefined : "The field must be username"
        }
    }
}

export const isPhoneNumber = () => {
    return {
        checkValidate: (value) => {
            const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            return re.test(value) ? undefined : "The field must phone number"
        }
    }
}

export const isPassword = () => {
    return {
        checkValidate: (value) => {
            const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
            return re.test(value) ? undefined : "Password must contain at least 1 digit, 1 lower case"
        }
    }
}

export const isConfirmPaswword = (confirmPassword) => {
    return {
        checkValidate: (value) => {
            return value === confirmPassword ? undefined : `Password and confirm password aren't match`
        }
    }
}

export const minLength = (min) => {
    return {
        checkValidate: (value) => {
            return value.length >= min ? undefined : `This field must have at least ${min} character`
        }
    }
}

export const isPrice = () => {
    return {
        checkValidate: (value) => {
            return value > 0 ? undefined : `Price must be greater than equal to 0`
        }
    }
}


export const validateOneElement = (target, rules) => {
    for (let i = 0; i < rules.length; i++) {
        const res = rules[i].checkValidate(target.value)
        if (res) {
            // target.classList.add("invalid")
            target.style.borderColor = 'red'
            return res
        }
    }
    // target.classList.remove("invalid")
    target.style.borderColor = '#d9d9d9'
}
