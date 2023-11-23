import { createContext, useContext, useEffect, useState } from "react";


const authContext = createContext(null)
const loginAuthContext = createContext(null)

export function useAuth() {
    const auth = useContext(authContext)
    const [login, register, logout] = useContext(loginAuthContext)
    return [auth, login, register, logout]
}


function AuthProvider({children}) {
    const [auth, setAuth] = useState({
        state: 'loading'
    })

    useEffect(() => {
        const authString = localStorage.getItem('auth')

        if(!authString) {
            setAuth({state: 'logged-out'})
        } else {
            const authData = JSON.parse(authString)
            setAuth({state: 'logged-in', ...authData})
        }
    }, [])

    async function login(emailAddress, password) {
        const data = {
            username: "joshpickardme",
            fullName: "Josh Pickard",
            emailAddress: "josh.pickard@gmail.com",
            role: "admin",
            token: "TOKEN"
          };
          localStorage.setItem("auth", JSON.stringify(data));
          setAuth({ state: "logged-in", ...data });
          return true
    }

    async function register(username, fullName, emailAddress, password) {
        
    }

    async function logout() {
        localStorage.removeItem("auth")
        setAuth({state: 'logged-out'})
    }

    

    return (
        <authContext.Provider value={auth}>
            <loginAuthContext.Provider value={[login, register, logout]}>
                {children}
            </loginAuthContext.Provider>
        </authContext.Provider>
    )
}

export default AuthProvider