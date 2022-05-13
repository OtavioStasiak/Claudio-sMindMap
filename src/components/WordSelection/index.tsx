import { useState } from 'react';
import './styles.scss';

type Props = {
    word: string;
    onSelectWord: (value: number) => void;
    pushInWordsSelected: (word: string) => void;
    deleteInWordSelected: (word: string) => void;
};

export function WordSelection({word, onSelectWord, pushInWordsSelected, deleteInWordSelected}: Props){
    const [selected, setSelected] = useState(false);

    function handleSelectWord(){
        setSelected(!selected);
        if(selected === false){
            onSelectWord(+1);
            pushInWordsSelected(word)
        }else{
            onSelectWord(-1);
            deleteInWordSelected(word);
        }

    };

    return(
        <button onClick={handleSelectWord} className={`${selected === true ? 'wordSelected' : 'word'}`}>
            <p>{word}</p>
        </button>
    )
}