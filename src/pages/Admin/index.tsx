import { DrawerAdmin } from "../../components/DrawerAdmin";
import Lottie from 'react-lottie';
import { useEffect, useState } from "react";
import { userData } from "../../hooks/useAuth";
import { getDocs } from "firebase/firestore";
import { finishedMapRef, usersRef } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import { useEdge } from "../../hooks/useEdge";


import login from "../../animations/loading.json";
import './styles.scss';

export type newUserData = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
    hasMap: number;
}

export function Admin(){

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<userData []>([]);
    const {setEmailSelected} = useEdge();
    const [maps, setMaps] = useState([]);
    async function fetchUsers(){
        setLoading(true);
        const response = await getDocs(usersRef);
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setUsers(data as newUserData[]);
        setLoading(false);
    };

    useEffect(() => {fetchUsers()}, []);

    async function fetchMaps(){
        const response = await getDocs(finishedMapRef);
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setMaps(data as any);
    };

    useEffect(() => {fetchMaps();}, []);

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
                    <p>Mapas Criados: {maps.length}</p>
                </div>  
            </div>

            <div className="preview-indicator">
                <h2>Usuários</h2>
            </div>

           { loading === true
            ?
            <Lottie options={{loop: true, autoplay:true, animationData: login, rendererSettings: {
                preserveAspectRatio: 'xMidYmid slice'
            }}}
            style={{paddingRight:20}}
            height={100}
            width={100}
            />
            :
            users.map((item, index) => 
                <div key={index} className="item-admin">
                    <img src={item.avatar} alt="profile-photo" />
                    <div>
                        <strong>{item.name}</strong>
                        <a><i>{item.email}</i></a>
                    </div>
                    
                     {item.hasMap > 0 &&
                         <button onClick={() => ViewMap(item)}>
                        Abrir Mapa
                    </button>}
                </div>)}

            <footer className="footer">
                <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
            </footer>

        </div>
    )
}