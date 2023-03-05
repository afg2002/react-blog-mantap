import { createContext,useState } from "react";


const AuthContext  = createContext()

export function AuthProvider({children}){
    const [auth, setAuth] = useState(false);
    const [session,setSession] = useState(null)

    
    return(
        <AuthContext.Provider value={{auth,setAuth,session,setSession}}>
            {/* {auth == false ? 'belum' : 'udah'} */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext