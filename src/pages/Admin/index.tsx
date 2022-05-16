import { DrawerAdmin } from "../../components/DrawerAdmin";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import './styles.scss';
import { useEffect, useState } from "react";
import { userData } from "../../hooks/useAuth";
import { getDocs } from "firebase/firestore";
import { usersRef } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import { useEdge } from "../../hooks/useEdge";

export function Admin(){

    const [users, setUsers] = useState<userData []>([]);
    const {setEmailSelected} = useEdge();

    async function fetchUsers(){
        const response = await getDocs(usersRef);
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setUsers(data as userData[]);
    };

    useEffect(() => {fetchUsers()}, []);

    async function fetchMaps(){
    }

    const history = useHistory();

    function ViewMap(user: userData){
        setEmailSelected(user.email);
        history.push(`/admin/adminmindmap/${user.email}`);
    };

    return(
        <div className="admin-container">

            <header className="welcome-header">
                <p>Bem vindo Cláudio!</p>
            </header>
            <DrawerAdmin />


            <div className="content">
                <div className="indicator-container">
                    <p>Usuários: {users.length}</p>
                </div>

                <div className="map-container">
                    <p>Mapas Criados: 0</p>
                </div>  
            </div>

            <div className="preview-indicator">
                <h2>Usuários</h2>
            </div>

           {users.map((item, index) => 
                <div key={index} className="item-admin">
                    <img src={item.avatar} alt="profile-photo" />
                    <div>
                        <strong>{item.name}</strong>
                        <a><i>{item.email}</i></a>
                    </div>
                    <button onClick={() => ViewMap(item)}>
                        Abrir Mapa
                    </button>
                </div>)}

            <footer className="footer">
                <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
            </footer>

        </div>
    )
}