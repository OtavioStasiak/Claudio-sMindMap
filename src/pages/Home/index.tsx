import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { addDoc, query, where } from 'firebase/firestore';
import { positions } from '../../services/positions';
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
    logo?: string;
    words?: [string];

}[];


export function Home(){
    const history = useHistory();
    const { user } = useAuth(); 
    const [wordsSelected, setWordsSelected] = useState(0);
    const [visible, setVisible] = useState(true);

    const [go, setGo] = useState(false);    
    const [word1, setWord1] = useState("");
    const [word2, setWord2] = useState("");
    const [word3, setWord3] = useState("");
    const [word4, setWord4] = useState("");
    const [word5, setWord5] = useState("");

    function onSelectSicredi(brand: string){
        fetchWords(brand);
        setVisible(false);
    };

    function onSelectUnimed(brand: string){
        fetchWords(brand);
        setVisible(false);
    };

    const [words, setWords] = useState<wordsData>();

    async function fetchWords(brand: string){
        const q = query(wordsRef, where('brand', '==', brand ))
        const response = await getDocs(q)
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setWords(data);
    }


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
        { id: '1', data: { label: words !== undefined ? words[0]?.logo : ''}, position:{x: width, y: height} },
    ];    

    const otherElements = wordSelected.map((item, index) => {return{
        id: (index + 2).toString(),
        data: {
            label: item
        },
        position: positions[index].position
    }});

    const finalElements = initialElements.concat(...otherElements);

   async function handleGoToMindMap(){
       const wordSelectedEditable = wordSelected.concat(...[word1,word2,word3,word4,word5]);
       const lastElements = wordSelectedEditable.map((item, index) => {return{
        id: (index + 2).toString(),
        data: {
            label: item
        },
        position: positions[index].position
    }});

    const finalElements = initialElements.concat(...lastElements);

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

                <button onClick={() => setGo(true)} className="continue-button">
                    <p>Continuar</p>
                    <img src={arrowRight} color="#fff" />
                </button>

            </footer>

            <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
               <div className='selection-brand'>
                    <h2 className='selection-brand-title'>Escolha uma Marca:</h2>

                    <div className='buttons-select-brand'>
                        <button onClick={() => onSelectSicredi('Sicredi')} className='button-brand-select'>
                            <img src={sicrediImg} alt='Logo do Banco Sicredi' />
                        </button>

                        <button onClick={() => onSelectUnimed('Unimed')} className='button-brand-select'>
                            <img className='unimed'  src={unimedImg} alt='Logo do Plano de Saúde Unimed' />
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={go}>
               <div className='new-words'>
                    <h2>Deseja adicionar alguma outra palavra?</h2>
                   
                    <input placeholder='Palavra 1...' onChange={(event) => setWord1(event.target.value)}/>
                    <input placeholder='Palavra 2...' onChange={(event) => setWord2(event.target.value)}/>
                    <input placeholder='Palavra 3...' onChange={(event) => setWord3(event.target.value)}/>
                    <input placeholder='Palavra 4...' onChange={(event) => setWord4(event.target.value)}/>
                    <input placeholder='Palavra 5...' onChange={(event) => setWord5(event.target.value)}/>

                    <div>
                        <button onClick={handleGoToMindMap}>
                            <p>Continuar</p>
                        </button>
                        <button onClick={() => setGo(false)}>
                            Cancelar
                        </button>
                    </div>
                    <span><strong>OBS: </strong>Você pode adicionar até 5 NOVAS palavras.</span>
                </div>
            </Modal>
           
        </div>
    )
}