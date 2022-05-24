import { DrawerAdmin } from "../../components/DrawerAdmin";
import Lottie from 'react-lottie';
import { useEffect, useState } from "react";
import { userData } from "../../hooks/useAuth";
import { getDocs, query, where } from "firebase/firestore";
import { finishedMapRef, mindMapRef, usersRef } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import { useEdge } from "../../hooks/useEdge";
import closeImg from "../../assets/images/close.svg";

import Modal from "react-modal";

import login from "../../animations/loading.json";
import './styles.scss';
import { itemData } from "../AdminMindMap";

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

    const [visible, setVisible] = useState(false);

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

    const [userMaps, setUserMaps] = useState<itemData[]>([]);
    const [userSelected, setUserSelected] = useState<userData>({} as userData);
    async function openModal(user: userData){
        const q = query(finishedMapRef, where("user.email", '==', user.email));
        const response = await getDocs(q);
        setUserSelected(user);

        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
        setUserMaps(data); 

        setVisible(true);
    };

    function ViewMap(id: string){
        setEmailSelected(id);
        history.push(`/admin/adminmindmap/${id}`);
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
                         <button onClick={() => openModal(item)}>
                            Ver Mapas
                        </button>
                    }
                </div>)}

              

           
            <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
                <button type="button" className="modal-profile-button" onClick={() => setVisible(false)}>
                    <img src={closeImg} alt="close-button" className="react-modal-close" /> 
                </button>
               <div className='user-modal'>
                   <img src={userSelected.avatar} />
                   <h2>{userSelected.name}</h2>
                   <span>{userSelected.email}</span>

                   <strong>Mapas:</strong>
                    {userMaps.map((item) => 
                    <div>
                        <div>
                            <strong>{item?.brand}</strong>
                            <p>{item?.id}</p>
                        </div>
                        <button onClick={() => ViewMap(item.id)}>
                            Abrir Mapa
                        </button>
                    </div>)}
                </div>
            </Modal>
        </div>
    )
}