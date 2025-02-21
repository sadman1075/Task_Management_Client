import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import AuthContext from './AuthContext';
import { useEffect, useState } from 'react';
import auth from '../Firebase/Firebase';

const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const provider = new GoogleAuthProvider()
    const createGoogleuser = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)

    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateProfileuser = (updateuserProfile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateuserProfile)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const authinfo = { setLoading, createGoogleuser, logout, user, createUser, updateProfileuser, setUser, loginUser }
    return (
        <div>
            <AuthContext.Provider value={authinfo}>
                {
                    children
                }
            </AuthContext.Provider>
        </div>
    );
};

export default ContextProvider;