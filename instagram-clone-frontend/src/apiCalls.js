import axiosInstance from "./axios"

export const apiLogin = async (userCredentials, dispatch) => {
    dispatch({ type: 'LOGIN_START' })
    try {
        const res = await axiosInstance.post(`/auth/login`, userCredentials)
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE' })
    }
}