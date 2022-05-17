import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DrawerAdmin } from "../../components/DrawerAdmin";
import { wordsRef } from "../../services/firebase";
import { wordsData } from "../Home";
import deleteIcon from "../../assets/images/delete.svg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

export type newUserData = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
    hasMap: number;
};

export function AddWords(){

    const [words, setWords] = useState<wordsData>();

    async function fetchMaps(){
        const response = await getDocs(wordsRef);
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setWords(data);
    };

    useEffect(() => {fetchMaps()}, []);

    async function deleteBrand(id: string){
        const docRef = doc(wordsRef, id);
        await deleteDoc(docRef);
        fetchMaps();
    };

    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [newWords, setNewWords] = useState('');

    async function addBrand(){
        const newWordsFinished = newWords.split(',').map(item => item.replace(' ', ''));

        await addDoc(wordsRef, {
            brand: name,
            logo: logo,
            words: newWordsFinished
        });

        fetchMaps();
        setName('');
        setLogo('');
        setNewWords('');
    };

    return(
        <div className="admin-container">
            <ToastContainer />
            <header className="welcome-header">
                <p>Adicionar Marca</p>
            </header>
            <DrawerAdmin />
           <div className="word-container">

            <span>Nome da Marca:</span>
            <input placeholder="Insira o Nome da Marca aqui..." value={name} onChange={(event) => setName(event.target.value)}/>

            <span>Logo da Marca:</span>
            <input placeholder="Insira a URL da Logo aqui..." value={logo} onChange={(event) => setLogo(event.target.value)}/>


            <span>Palavras:</span>
            <input placeholder="Insira as palavras aqui" value={newWords} onChange={(event) => setNewWords(event.target.value)}/>

            <button onClick={() => addBrand()}>
              ADICIONAR +
            </button>

            <span className="obs"><strong>OBS: </strong>Insira no seguinte Padrão: palavraI, palavraII, ... </span>

            <h2>Marcas Atuais</h2>
            <div className="bottom-div">
                {
                    words?.map((item, index) => 
                        <div key={index}>
                            <div className="actual-brands">
                                <img src={item.logo} />
                            </div>
                            <button onClick={() => deleteBrand(item.id)} className="delete-brand">
                                <img src={deleteIcon} />
                            </button>
                        </div>
                    )
                }
            </div>

           </div>
            <footer className="footer">
                <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
            </footer>
        </div>
    )
}