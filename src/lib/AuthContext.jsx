import { createContext,useState } from "react";


const AuthContext  = createContext()

export function AuthProvider({children}){
    const [auth, setAuth] = useState(false);



    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {auth == false ? 'belum' : 'udah'}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext