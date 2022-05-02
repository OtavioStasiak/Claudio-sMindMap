import { LoginButton } from "../../components/LoginButton";
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';
import animation from '../../animations/login.json';

import { useAuth } from "../../hooks/useAuth";
import './styles.scss';
import { useState } from "react";
import { RestrictModal } from "../../components/RestrictModal";

export function Login(){
    const history = useHistory();
    const { signInWithGoogle, user } = useAuth();
    const [visible, setVisible] = useState(false);

    async function handleLogin(){
        signInWithGoogle()
    };

    function handleLoginAdmin(){
        setVisible(true);
    };

    return(
        <div id="container">
           
                <Lottie options={{loop: true, autoplay:true, animationData: animation, rendererSettings: {
                    preserveAspectRatio: 'xMidYmid slice'
                }}}
                style={{paddingRight:20}}
                height={400}
                width={400}
                />

                <h1>Mapa Mental</h1>

                <LoginButton onClick={handleLogin} title="Entrar com Google" />
                <LoginButton isAdmin onClick={handleLoginAdmin} title="Acesso Restrito" />

                <RestrictModal visible={visible} onRequestClose={() => setVisible(false)}/>

        </div>
    )
}