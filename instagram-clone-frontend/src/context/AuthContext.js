import { createContext, useEffect, useReducer } from "react"
import { AuthReducers } from "./AuthReducers"

const initial_state = {
    user: JSON.parse(localStorage.getItem('user_login')) || null,
    isFetching: false,
    errors: false
}
export const AuthContext = createContext(initial_state)
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducers, initial_state)
    useEffect(() => {
        localStorage.setItem('user_login', JSON.stringify(state.user))
    }, [])

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            errors: state.errors,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )

}