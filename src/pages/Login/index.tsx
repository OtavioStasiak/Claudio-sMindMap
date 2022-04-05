import { LoginButton } from "../../components/LoginButton";
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';

import animation from '../../animations/login.json';
import './styles.scss';

export function Login(){
    const history = useHistory();

    function handleLogin(){
        history.push('/select-words/');
    };

    function handleLoginAdmin(){
        history.push('/admin/');
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


        </div>
    )
}