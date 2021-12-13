export const Login_Start = () => ({
    type: "LOGIN_START"
})
export const Login_Success = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})
export const Login_Failure = () => ({
    type: "LOGIN_FAILURE"
})
export const Logout = () => ({
    type: "LOGOUT"
})
