import { useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/images/close.svg";
import { useHistory } from "react-router-dom";

import './styles.scss';

type Props = {
    visible: boolean;
    onRequestClose: () => void;
    onAccept: () => void;
    lgpdBanner: {title: string; body: string}[] | undefined;
}

export function LGPDModal({visible, onRequestClose, onAccept, lgpdBanner}: Props){
    
    return(
        <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
            <button type="button" className="modal-close-button" onClick={onRequestClose}>
                <img src={closeImg} alt="close-button" className="react-modal-close" /> 
            </button>
 
                    <div className="banner-lgpd"> 
                    {   lgpdBanner !== undefined &&
                        lgpdBanner.map((item, index) => 
                        <>
                        <h3 key={index}>{item.title}</h3>
                        <p key={index}>{item.body}</p>
                        </>)
                    }
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