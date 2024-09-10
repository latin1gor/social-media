import {createContext, PropsWithChildren, useState} from "react";
import {User} from "@supabase/auth-js";

interface IAuthContext {
    user: User | null
    setAuth: (user: User | null) => void
    setUserData: (user: User | null) => void
}

const defaultValue: IAuthContext = {
    user: null,
    setAuth: () => {},
    setUserData: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultValue)

const AuthProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null)

    const setAuth = (authUser: User | null) => setUser(authUser)

    const setUserData = (data: User | null) => setUser(prevUser => ( prevUser ? {...prevUser, ...data} : data))

    return (
        <AuthContext.Provider value={{user, setAuth, setUserData}}>{children}</AuthContext.Provider>
    )

}

export default AuthProvider