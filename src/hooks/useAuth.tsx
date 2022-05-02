import React, {useState, useEffect, createContext, useContext} from "react";
import { signInWithPopup } from "firebase/auth";
import {provider, auth} from '../services/firebase';
import { useHistory } from "react-router-dom";
type AuthContextData = {
    signInWithGoogle: () => void;
    user: {id: string, name: string, avatar: string};
  };

  type AuthProviderProps = {
    children: React.ReactNode;
  };

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

      const [user, setUser] = useState({id: '', name: '', avatar: ''});
      const history = useHistory();
      
      async function signInWithGoogle() {

        const result = await signInWithPopup(auth, provider);
              
        if(result.user) {
            const {displayName, photoURL, uid} = result.user;

            if(!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            };

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            });
            
            history.push('/select-words/')
        };
    };
       
      useEffect(() => {const unsubscribe = auth.onAuthStateChanged(user => {
        if (user){
          const {displayName, photoURL, uid} = user;

          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
        };

        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
        });
        
        return () => {
          unsubscribe();
        }
        }
      })}, []);
 
    return (
        <AuthContext.Provider 
        value={{
          signInWithGoogle,
          user
        }}>
          {children}
        </AuthContext.Provider>
      )
    }

    function useAuth() {
        const context = useContext(AuthContext);
      
        return context;
      }

      export {
        AuthProvider,
        useAuth
      }