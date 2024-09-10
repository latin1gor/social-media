import {createContext, PropsWithChildren, useState} from "react";
import {User} from "@supabase/auth-js";


export const AuthContext = createContext({})

const AuthProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null)

    const setAuth = (authUser: User) => setUser(authUser)

    const setUserData = (data: any) => setUser(prevUser => ({...prevUser, ...data}))

    return (
        <AuthContext.Provider value={{user, setAuth, setUserData}}>{children}</AuthContext.Provider>
    )

}

export default AuthProvider