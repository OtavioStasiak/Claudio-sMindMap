import { useState } from "react";
import Modal from "react-modal";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

import closeImg from "../../assets/images/close.svg";
import { useHistory } from "react-router-dom";

import './styles.scss';

type Props = {
    visible: boolean;
    onRequestClose: () => void;
    onAccept: () => void;
};

export function LGPDModal({visible, onRequestClose, onAccept}: Props){
    const history = useHistory();
    const email = "mindmap.claudio@gmail.com";
    const [password, setPassword] = useState('');

    function onLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {history.push('/admin/1hsai5Dsuha10Jc7y428xc/');})
        .catch((error) => {});
    };
    
    return(
        <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
            <button type="button" className="modal-close-button" onClick={onRequestClose}>
                <img src={closeImg} alt="close-button" className="react-modal-close" /> 
            </button>
 
            <div className="banner-lgpd"> 
                <h3>TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO</h3>
                <p>Você está sendo convidado(a) como voluntário(a) a participar do estudo Mapa Conceitual de Associações de Marca, que tem como objetivo investigar de que modo a comunicação das marcas afeta a estrutura de redes de associação mental dos consumidores. Acreditamos que esta pesquisa seja importante porque investigamos as redes de associação em contextos pouco estudados nas questões de brand equity, contribuiremos com direcionadores importantes para a definição de estratégias de marca e comunicação por parte da alta gestão destas organizações.</p>
                <h3>PARTICIPAÇÃO NO ESTUDO</h3>
                <p>A sua participação no referido estudo será responder uma pesquisa efetuada por meio de um aplicativo digital em que serão apresentadas diversas palavras que deverão ser relacionadas a marca alvo do estudo. O aplicativo contém todas as orientações para o desenvolvimento deste mapa, apresentadas passo a passo, além de mostrar um modelo referencial desenvolvido para funcionar como exemplo a ser seguido. A pesquisa objetiva a elaboração de um mapa que represente a sua visão da marca estudada em uma rede de associações entre a marca e diversos valores, conceitos ou atributos ao qual ela está vinculada.</p>
                <h3>RISCOS E BENEFÍCIOS</h3>
                <p>Através deste Termo de Consentimento Livre e Esclarecido você está sendo alertado de que, da pesquisa não resultará nenhum benefício pessoal direto, a não ser o de apoiar o desenvolvimento da pesquisa em nosso país. Bem como, também alertamos que não incorrerá em risco, a não ser dedicar um tempo de sua rotina de vida para o preenchimento do instrumento de pesquisa e a liberação de seus dados básicos (nome, idade, e-mail) para registro do estudo. Para minimizar tais riscos, nós pesquisadores tomaremos as seguintes medidas: um instrumento de pesquisa ágil e interativo para facilitar o processo e reduzir o tempo de dedicação necessário para a efetivação dos mapas e manutenção de sigilo sobre todos os dados pessoais coletados, pois as informações serão divulgadas apenas em formato consolidado e sem qualquer identificação dos respondentes.</p>
                <h3>SIGILO E PRIVACIDADE</h3>
                <p>Nós pesquisadores garantiremos a você que sua privacidade será respeitada, ou seja, seu nome ou qualquer outro dado ou elemento que possa, de qualquer forma, lhe identificar, será mantido em sigilo. Nós pesquisadores nos responsabilizaremos pela guarda e confidencialidade dos dados, bem como a não exposição de informação em qualquer formato que possa indicar sua identidade</p>
                <h3>AUTONOMIA</h3>
                <p>Nós lhe asseguramos assistência durante toda pesquisa, bem como garantiremos seu livre acesso a todas as informações e esclarecimentos adicionais sobre o estudo e suas consequências. Também informamos que você pode se recusar a participar do estudo, ou retirar seu consentimento a qualquer momento, sem precisar justificar.</p>
                <h3>RESSARCIMENTO E INDENIZAÇÃO</h3>
                <p>No entanto, caso tenha qualquer despesa decorrente da participação nesta pesquisa, haverá ressarcimento dos valores gastos na forma seguinte: depósito bancário via pix.<br/>Caso ocorra algum dano decorrente de sua participação no estudo, você será devidamente indenizado, conforme determina a lei.</p>
                <h3>CONTATO</h3>
                <p>Os pesquisadores envolvidos com o referido projeto são Carlos Roberto Romaniello – PUCPR Claudio Thiele – PUCPR e Dr. Paulo Batista – PUCPR e com eles você poderá manter contato pelos telefones: (41) 99968-0408 / (41) 99946-3031 / (41) 99983-0133 e ou e-mails c.romaniello@pucpr.br, claudio.fonseca@pucpr.br e p.baptista@pucpr.br<br/>O Comitê de Ética em Pesquisa em Seres Humanos (CEP) é composto por um grupo de pessoas que estão trabalhando para garantir que seus direitos como participante de pesquisa sejam respeitados. Ele tem a obrigação de avaliar se a pesquisa foi planejada e se está sendo executada de forma ética. Se você achar que a pesquisa não está sendo realizada da forma como você imaginou ou que está sendo prejudicado de alguma forma, você pode entrar em contato com o Comitê de Ética em Pesquisa da PUCPR (CEP) pelo telefone (41) 3271-2103 entre segunda e sexta-feira das 08h00 às 17h30 ou pelo e-mail nep@pucpr.br.</p>
                <h3>DECLARAÇÂO</h3>
                <p>Declaro que li e entendi todas as informações presentes neste Termo de Consentimento Livre e Esclarecido e tive a oportunidade de discutir as informações deste termo. Todas as minhas perguntas foram respondidas e eu estou satisfeito com as respostas. Entendo que, caso queira, poderei solicitar uma via assinada e datada deste documento e que outra via assinada e datada será arquivada pelo pesquisador responsável do estudo.<br/>Enfim, tendo sido orientado quanto ao teor de todo o aqui mencionado e compreendido a natureza e o objetivo do já referido estudo, manifesto meu livre consentimento em participar, estando totalmente ciente de que não há nenhum valor econômico, a receber ou a pagar, por minha participação</p>
                
                <div>
                    <button onClick={onRequestClose} type="button">
                        Recusar
                    </button>
                    <button onClick={onAccept} type="button">
                        Aceitar
                    </button>
                </div>
            
            </div>
        </Modal>
    )
}