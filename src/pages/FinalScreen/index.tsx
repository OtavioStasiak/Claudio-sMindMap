import Lottie from "react-lottie";
import sucess from '../../animations/success.json';

import './styles.scss';

export function FinalScreen(){
    return(
        <div className="finished">

            <Lottie options={{loop: false, autoplay:true, animationData: sucess, rendererSettings: {
                    preserveAspectRatio: 'xMidYmid slice'
                }}}
                style={{paddingRight:20}}
                height={400}
                width={400}
                />
            <h2>Teste Finalizado com Sucesso!</h2>
            <span>Seu Mapa Mental foi enviado, agradeço a sua disponibilidade em participar dessa dinâmica.</span>
        </div>
    )
}