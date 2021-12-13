export const AuthReducers = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                errors: false,
                isFetching: true
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                errors: false,
                isFetching: false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                errors: true,
                isFetching: false
            }
        case "LOGOUT":
            return {
                user: null,
                errors: false,
                isFetching: false
            }

        default:
            return state
    }
}