import React from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState();
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
