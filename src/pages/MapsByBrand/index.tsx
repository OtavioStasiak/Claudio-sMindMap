import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DrawerAdmin } from "../../components/DrawerAdmin";
import { finishedMapRef, wordsRef } from "../../services/firebase";
import { wordsData } from "../Home";
import deleteIcon from "../../assets/images/delete.svg";
import { query, where } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';
import { userData } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

export type newUserData = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
    hasMap: number;
};

export function MapsByBrand(){

    const [words, setWords] = useState<wordsData>();

    async function fetchMaps(){
        const response = await getDocs(wordsRef);
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setWords(data);
    };

    useEffect(() => {fetchMaps()}, []);

    const [maps, setMaps] = useState<any []>([]);
    async function findMapBrand(brandSelected: string){
       const q = query(finishedMapRef, where("brand", "==", brandSelected));
       const response = await getDocs(q);
       const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
       setMaps(data);
    };

    console.log(maps)

    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [newWords, setNewWords] = useState('');
    const [modal, setModal]  = useState(false);

    const [emailSelected, setEmailSelected] = useState('');
    const history = useHistory();

    function ViewMap(id: string){
        console.log()
        setEmailSelected(id);
        history.push(`/admin/adminmindmap/${id}`);
    };

    return(
        <div className="admin-container">
            <ToastContainer />
            <header className="welcome-header">
                <p>Mapas por Marca</p>
            </header>
            <DrawerAdmin />
           <div className="word-container">

            <h2>Selecione uma marca</h2>
            <div className="bottom-div">
                {
                    words?.map((item, index) => 
                        <div key={index}>
                            <button onClick={() => findMapBrand(item.brand!)} className="delete-brand">
                            <div className="actual-brands">
                                <img src={item.logo} />
                            </div>
                            </button>
                        </div>
                    )
                }
            </div>

            <div className="list-map">
                {
                    maps.map((item, index) => 
                    <div key={index} className="item-admin">
                        <img src={item.user.avatar} alt="profile-photo" />
                        <div>
                            <strong>{item.user.name}</strong>
                            <a><i>{item.user.email}</i></a>
                        </div>
                        
                         {item.map.length > 0 &&
                             <button onClick={() => ViewMap(item.id)}>
                                Ver Mapa
                            </button>
                        }
                    </div>)
                    
                }
            </div>
           </div>
          
        </div>
    )
}