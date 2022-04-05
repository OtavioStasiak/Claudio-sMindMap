import { LoginButton } from "../../components/LoginButton";
import Lottie from 'react-lottie';
import animation from '../../animations/login.json';
import './styles.scss';

export function Login(){
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
                    <LoginButton title="Entrar com Google" />

        </div>
    )
}