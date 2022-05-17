import React, {useState, useEffect, createContext, useContext} from "react";
import {provider, auth, wordsRef, usersRef} from '../services/firebase';
import { useHistory } from "react-router-dom";
import { addDoc, query, where, getDocs } from 'firebase/firestore';
import { Elements } from "react-flow-renderer";

type forceData = {
  connectionId: string;
  force: number;
}
type AuthContextData = {
    setMapActual: (item: Elements<any>) => void;
    mapActual: Elements<any>;
    onForceChange: (force: forceData) => void;
    connectionForce: forceData[];
    emailSelected: string | null;
    setEmailSelected: (email: string | null) => void;
    hasDeleted: boolean;
    setHasDeleted: (hasDeleted: boolean) => void;
  };

  type AuthProviderProps = {
    children: React.ReactNode;
  };
export const AuthContext = createContext({} as AuthContextData);

function EdgeProvider({ children }: AuthProviderProps) {

    const [mapActual, setMapActual] = useState([] as Elements);
    const [connectionForce, setConnectionForce] = useState<forceData []>([]);
    const [emailSelected, setEmailSelected] = useState<string | null>('');

    function onForceChange(obj: forceData){
      const cfEditable = connectionForce;
      const isEdition = cfEditable.findIndex(item => item.connectionId === obj.connectionId);

      if(isEdition === -1){
        setConnectionForce(prevState => prevState.concat(...[obj]));
        return;
      }else{
        const valueEditted = connectionForce;
        valueEditted[isEdition] = obj;
        setConnectionForce(valueEditted);
      };
    };

    const [hasDeleted, setHasDeleted] = useState(false);

    return (
        <AuthContext.Provider 
        value={{
          setMapActual,
          mapActual,
          onForceChange,
          connectionForce,
          setEmailSelected,
          emailSelected,
          setHasDeleted,
          hasDeleted
        }}>
          {children}
        </AuthContext.Provider>
      )
    }

    function useEdge() {
        const context = useContext(AuthContext);
      
        return context;
      }

      export {
        EdgeProvider,
        useEdge
      }