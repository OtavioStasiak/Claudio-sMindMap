import { LoginButton } from "../../components/LoginButton";
import Lottie from 'react-lottie';
import { useHistory, useParams } from 'react-router-dom';
import animation from '../../animations/login.json';
import logo from '../../assets/images/logoPuc.png';
import { useAuth } from "../../hooks/useAuth";
import './styles.scss';
import { useEffect, useState } from "react";
import { RestrictModal } from "../../components/RestrictModal";
import { LGPDModal } from "../../components/LGPDModal";
import { wordsData } from "../Home";
import { getDocs, query, where } from "firebase/firestore";
import { wordsRef } from "../../services/firebase";

type Params = {
    brand: string;
}

export function Login(){
    const history = useHistory();
    const { signInWithGoogle, setBrandSearch } = useAuth();
    const [visible, setVisible] = useState(false);
    const [lgpdVisible, setLGPDVisible] = useState(false);

    const {brand} = useParams<Params>();
    const [words, setWords] = useState<wordsData >();

    async function fetchWords(){
        const q = query(wordsRef, where('brand', '==', brand ))
        const response = await getDocs(q)
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setWords(data);
    }

    useEffect(() => {fetchWords(); setBrandSearch(brand);}, []);

    async function handleLogin(){
        signInWithGoogle();
    };

    function handleLoginAdmin(){
        setVisible(true);
    };

    const lgpd = words !== undefined ? words[0].lgpdBanner : [];

    return(
        <div id="container">
           
                <img src={logo}/>
                <Lottie options={{loop: true, autoplay:true, animationData: animation, rendererSettings: {
                    preserveAspectRatio: 'xMidYmid slice'
                }}}
                style={{paddingRight:20}}
                height={350}
                width={400}
                />
                
                <div>
                    <h1>Mapa Mental</h1>
                    <span>Pesquisa de Mestrado</span>
                </div>
                <LoginButton onClick={() => setLGPDVisible(true)} title="Entrar com Google" />
                <LGPDModal lgpdBanner={lgpd} onAccept={handleLogin} visible={lgpdVisible} onRequestClose={() => setLGPDVisible(false)}/>
                <LoginButton isAdmin onClick={handleLoginAdmin} title="Acesso Restrito" />
                <RestrictModal visible={visible} onRequestClose={() => setVisible(false)}/>

        </div>
    )
}