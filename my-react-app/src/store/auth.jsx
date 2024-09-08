
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userdata, setUser] = useState(null)
    const [isLoading , setIsLoding] = useState(true)
    const authorization = `Bearer ${token}`

    const API = import.meta.env.VITE_API_URI_API || `https://ngo-backend-new.onrender.com`;

    console.log('api auth',import.meta.env)

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('token',serverToken)
        setToken(serverToken)
    }
    let isLoggedIn = !!token

    const LogoutUser = () => {
        setToken('');
        return localStorage.removeItem('token')
    } 

    const userAuthentication = async () => {
        if(!token) return;
        try {
            setIsLoding(true)
            const response = await fetch(`${API}/api/auth/user`,{
                method: 'GET',
                headers: {
                    Authorization: authorization
                }
            });
            if(response.ok) {
                const data = await response.json();
                console.log(data)
                setUser({username:data.username,
                    email:data.email,
                    phone:data.phone,
                    isAdmin:data.isAdmin
                });
                setIsLoding(false)
            }else {
                console.log('error fething user data')
                setIsLoding(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        userAuthentication()
    },[token])

    return <AuthContext.Provider value={{storeTokenInLS,LogoutUser,isLoggedIn, userdata,authorization,isLoading,API}}>
        {children}
     </AuthContext.Provider>
};

   
export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if(!authContextValue) {
        throw new Error('useAuth use outside of the provider')
    }
    return authContextValue
}



