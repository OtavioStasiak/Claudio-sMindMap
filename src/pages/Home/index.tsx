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

export type wordsData = {
    id: string;
    brand?: string;
    logo?: string;
    words?: [string];

}[];


export function Home(){
    const history = useHistory();
    const { user, brandSearch } = useAuth(); 
    const [wordsSelected, setWordsSelected] = useState(0);
    const [visible, setVisible] = useState(false);

    const [go, setGo] = useState(false);    
    const [word1, setWord1] = useState("");
    const [word2, setWord2] = useState("");
    const [word3, setWord3] = useState("");
    const [word4, setWord4] = useState("");
    const [word5, setWord5] = useState("");

    const [words, setWords] = useState<wordsData>();

    async function fetchWords(){
        const q = query(wordsRef, where('brand', '==', brandSearch ))
        const response = await getDocs(q)
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setWords(data);
    }

    useEffect(() => {fetchWords();}, []);

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
        { id: '1',type: "special", data: { label: words !== undefined ? words[0]?.logo : ''}, position:{x: width, y: height} },
    ];    


   async function handleGoToMindMap(){
       const newWords = [];
       word1 !== "" && newWords.push(word1);
       word2 !== "" && newWords.push(word2);
       word3 !== "" && newWords.push(word3);
       word4 !== "" && newWords.push(word4);
       word5 !== "" && newWords.push(word5);

       const wordSelectedEditable = wordSelected.concat(...newWords);
       
       const lastElements = wordSelectedEditable.map((item, index) => {return{
        id: (index + 2).toString(),
        type: "special",
        data: {
            label: item
        },
        position: positions[index].position
        }});

        const finalElements = initialElements.concat(...lastElements);
        const brand = words !== undefined && words[0].brand;
        await addDoc(mindMapRef, {
            user: user.email,
            initialMap: finalElements,
            brand: brand
        });

        history.push('/mind-map/');
    };
    
    const [instuctions, setInstructions] = useState(true);

    function onFirstContinueClick(){
        setInstructions(false);
        setVisible(true);
    };

    return(
        <div className="container">

            <h1>Bem Vindo(a)!</h1>

            <div className="title">
                <p className="description">Escolha as palavras abaixo, clicando nos retângulos. Após escolher todas que queira, clique em continuar.</p>
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

            <div className="continue-footer">

                <h2>Palavras Selecionadas: {wordsSelected}</h2>

                <button onClick={() => setGo(true)} className="continue-button">
                    <p>Continuar</p>
                    <img src={arrowRight} color="#fff" />
                </button>

            </div>

            <Modal overlayClassName="react-modal-overlay" className="react-modal-content" isOpen={instuctions}>
                <div className='first-instruction'>
                    <h2>Bem Vindo(a)!</h2>

                    <div>
                        INSTRUÇÕES
                    </div>

                    <p>Para a criação do Mapa Mental você deve escolher, na próxima<br/>
                      tela, as palavras que tenham maior relação com a marca.</p>

                    <ul>
                        <li>Não existe limite, escolha quantas palavras quiser.</li>
                        <li>Não é necessário utilizar todas as palavras.</li>
                        <li>Escolha somente aquelas que façam sentido na<br/>sua visão sobre a marca.</li>
                    </ul>

                    <button onClick={() => onFirstContinueClick()}>
                        Continuar
                    </button>
                </div>
            </Modal>

            <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
                <div>
                </div>
            </Modal>

            <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={go}>
               <div className='new-words'>
                    <p>Existe alguma palavra que não esteja na lista anterior e você<br/> acredita que tenha alinhamento com a marca?</p>
                    <p><strong>Adicione até 5 palavras digitando nos espaços abaixo e<br/>depois clique em continuar. Caso não ache necessário,<br/>clique diretamente em continuar.</strong></p>
                   
                    <input placeholder='Palavra 1...' onChange={(event) => setWord1(event.target.value)}/>
                    <input placeholder='Palavra 2...' onChange={(event) => setWord2(event.target.value)}/>
                    <input placeholder='Palavra 3...' onChange={(event) => setWord3(event.target.value)}/>
                    <input placeholder='Palavra 4...' onChange={(event) => setWord4(event.target.value)}/>
                    <input placeholder='Palavra 5...' onChange={(event) => setWord5(event.target.value)}/>

                    <div>
                        <button onClick={() => setGo(false)}>
                            Cancelar
                        </button>

                        <button onClick={handleGoToMindMap}>
                            <p>Continuar</p>
                        </button>
                    </div>
                    <span><strong>OBS: </strong>Você pode adicionar até 5 NOVAS palavras.</span>
                </div>
            </Modal>
           
        </div>
    )
}