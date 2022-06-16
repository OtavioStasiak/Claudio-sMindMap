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

type Params = {
    brand: string;
}

export function Login(){
    const history = useHistory();
    const { signInWithGoogle, setBrandSearch } = useAuth();
    const [visible, setVisible] = useState(false);
    const [lgpdVisible, setLGPDVisible] = useState(false);

    const {brand} = useParams<Params>();

    useEffect(() => {setBrandSearch(brand)}, []);

    async function handleLogin(){
        signInWithGoogle();
    };

    function handleLoginAdmin(){
        setVisible(true);
    };

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
                <LGPDModal onAccept={handleLogin} visible={lgpdVisible} onRequestClose={() => setLGPDVisible(false)}/>
                <LoginButton isAdmin onClick={handleLoginAdmin} title="Acesso Restrito" />
                <RestrictModal visible={visible} onRequestClose={() => setVisible(false)}/>

        </div>
    )
}