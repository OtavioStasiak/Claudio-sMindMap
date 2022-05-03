import { useState } from 'react';
import {useHistory} from 'react-router-dom';

import Modal from "react-modal";

import { WordSelection } from '../../components/WordSelection';

import arrowRight from '../../assets/images/right-arrow.svg';
import sicrediImg from '../../assets/images/logo-sicredi.png';
import unimedImg from '../../assets/images/unimed-logo.png';

import './styles.scss';

export function Home(){
    const history = useHistory();
    const [wordsSelected, setWordsSelected] = useState(0);
    const [visible, setVisible] = useState(true);

    function handleGoToMindMap(){
        history.push('/mind-map/');
    };

    function onSelectSicredi(){
        setVisible(false);
    };

    function onSelectUnimed(){
        setVisible(false);
    };
    
    return(
        <div className="container">

            <h1>Bem Vindo(a)!</h1>

            <div className="title">

                <div className="circleIndicator">
                   <p>1º</p> 
                </div>

                <p className="description">Selecione as Palavras para criar o mapa mental.</p>

            </div>

            <div className='word-field'>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Felicidade'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Tristeza'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Lanche'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Coca Gelada salva'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Big Mac'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Brinquedo'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)}word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)}word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)}word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)}word='Teste'/>
                    <WordSelection onSelectWord={(value) => setWordsSelected(wordsSelected + value)} word='Teste'/>               
            </div>

            <footer className="continue-footer">

                <h2>Palavras Selecionadas: {wordsSelected}</h2>

                <button onClick={handleGoToMindMap} className="continue-button">
                    <p>Continuar</p>
                    <img src={arrowRight} color="#fff" />
                </button>

            </footer>

            <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
               <div className='selection-brand'>
                    <h2 className='selection-brand-title'>Escolha uma Marca:</h2>

                    <div className='buttons-select-brand'>
                        <button onClick={onSelectSicredi} className='button-brand-select'>
                            <img src={sicrediImg} alt='Logo do Banco Sicredi' />
                        </button>

                        <button onClick={onSelectUnimed} className='button-brand-select'>
                            <img className='unimed'  src={unimedImg} alt='Logo do Plano de Saúde Unimed' />
                        </button>
                    </div>
                </div>
            </Modal>
           
        </div>
    )
}