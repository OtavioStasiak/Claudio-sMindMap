import React, {useState, useEffect, createContext, useContext} from "react";
import { signInWithPopup } from "firebase/auth";
import {provider, auth, wordsRef, usersRef} from '../services/firebase';
import { useHistory } from "react-router-dom";
import { addDoc, query, where, getDocs } from 'firebase/firestore';


export type userData = {
  name: string;
  avatar: string;
  email: string | null;
  hasMap: number;
}

type AuthContextData = {
    signInWithGoogle: () => void;
    user: { name: string, avatar: string, email: string | null};
  };

  type AuthProviderProps = {
    children: React.ReactNode;
  };

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

      const [user, setUser] = useState<userData>({} as userData);
      const history = useHistory();
    


      async function signInWithGoogle() {

        const result = await signInWithPopup(auth, provider);
              
        if(result.user) {
            const {displayName, photoURL, email} = result.user;

            if(!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            };

            setUser({
                name: displayName,
                avatar: photoURL,
                email: email,
                hasMap: 0
            });
            const q = query(usersRef, where("email", '==', result.user.email));
            const response = await getDocs(q);
            const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

            if(data.length === 0 ){
              addDoc(usersRef, {
                name: displayName,
                avatar: photoURL,
                email: email,
                hasMap: 0
              }).then(() => history.push('/select-words/'))
            }
           
            history.push('/select-words/')
        };
      } ;


      

      useEffect(() => {const unsubscribe = auth.onAuthStateChanged(user => {
        if (user){
          const {displayName, photoURL, email} = user;

          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
        };

        setUser({
            name: displayName,
            avatar: photoURL,
            email: email,
            hasMap: 0
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