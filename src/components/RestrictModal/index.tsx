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
};

export function RestrictModal({visible, onRequestClose}: Props){
    const history = useHistory();
    const email = "mindmap.claudio@gmail.com";
    const [password, setPassword] = useState('');

    function onLogin(){
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {history.push('/admin/');})
        .catch((error) => console.log(error));
    };
    
    return(
        <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
            
            <button type="button" className="modal-close-button" onClick={onRequestClose}>
                <img src={closeImg} alt="close-button" className="react-modal-close" /> 
            </button>

            <div className="modal_login_content">
                <h2>Acesso Restrito</h2>

                <input placeholder="Insira sua Senha..." type="password" value={password}  onChange={(event) => setPassword(event.target.value)}/>

                <button onClick={onLogin} type="submit">
                    Entrar
                </button>
            </div>
        </Modal>
    )
}