import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import sucess from '../../animations/success.json';
import { useAuth } from "../../hooks/useAuth";
import { wordsData } from "../Home";
import { addDoc, query, where } from 'firebase/firestore';
import {getDocs} from 'firebase/firestore';

import './styles.scss';
import { wordsRef } from "../../services/firebase";

export function FinalScreen(){
    const {finalText, brandSearch} = useAuth();
    const [words, setWords] = useState<wordsData >();

    async function fetchWords(){
        const q = query(wordsRef, where('brand', '==', brandSearch ))
        const response = await getDocs(q)
        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});

        setWords(data);
    }

    useEffect(() => {fetchWords();}, []);

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
            <span>{words !== undefined && words[0].FinalMessage}</span>
        </div>
    )
}