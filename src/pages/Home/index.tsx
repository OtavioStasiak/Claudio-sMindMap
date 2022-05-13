import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { addDoc } from 'firebase/firestore';

import Modal from "react-modal";
import {firestore, mindMapRef, wordsRef} from '../../services/firebase';
import { WordSelection } from '../../components/WordSelection';
import {getDocs} from 'firebase/firestore';
import arrowRight from '../../assets/images/right-arrow.svg';
import sicrediImg from '../../assets/images/logo-sicredi.png';
import unimedImg from '../../assets/images/unimed-logo.png';

import './styles.scss';
import { useAuth } from '../../hooks/useAuth';

type wordsData = {
    id: string;
    brand?: string;
    words?: [string];

}[];


export function Home(){
    const history = useHistory();
    const [wordsSelected, setWordsSelected] = useState(0);
    const [visible, setVisible] = useState(false);
    const { user } = useAuth(); 

    function onSelectSicredi(){
        setVisible(false);
    };

    function onSelectUnimed(){
        setVisible(false);
    };

    const [words, setWords] = useState<wordsData>();

    async function fetchWords(){
        const response = await getDocs(wordsRef)
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setWords(data);
    }
    
    useEffect(() => {fetchWords()}, []);

    const [wordSelected, setWordSelected] = useState<string []>([]);

    function DeleteWord(word: string){
        const wordsEditable = wordSelected;
        const indexToRemove = wordsEditable.findIndex(item => item === word);
        if(indexToRemove >= 0){
            wordsEditable.splice(indexToRemove, 1);
            setWordSelected(wordsEditable);
        };
    };
    const width = 50%window.innerWidth;
    const height = 50%window.innerHeight;
    const initialElements = [
        { id: '1', data: { label: words !== undefined ? words[0]?.brand : ''}, position:{x: width, y: height} },
    ];    

    const otherElements = wordSelected.map((item, index) => {return{
        id: (index + 2).toString(),
        data: {
            label: item
        },
        position:{
            x: Math.random() * ((width * 6) - (width *3)) + (width * 2),
            y: Math.random() * ((height *3) - (height - (height * 2))) +(height *2)  
        }
    }});

    const finalElements = initialElements.concat(...otherElements);

   async function handleGoToMindMap(){
        await addDoc(mindMapRef, {
            user: user.email,
            initialMap: finalElements
        });

        history.push('/mind-map/');
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
                { 
                  words !== undefined 
                  &&
                  words[0].words?.map((item, index) => 
                    <WordSelection 
                     deleteInWordSelected={(word) => DeleteWord(word)}
                     pushInWordsSelected={(value) => setWordSelected(prevState => prevState.concat([value]))}
                     key={index}
                     onSelectWord={(value) => setWordsSelected(wordsSelected + value)} 
                     word={item}/>)
                }
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