import { useState } from 'react';
import './styles.scss';

type Props = {
    word: string;
    onSelectWord: (value: number) => void;
};

export function WordSelection({word, onSelectWord}: Props){
    const [selected, setSelected] = useState(false);

    function handleSelectWord(){
        setSelected(!selected);
        if(selected === false){
            onSelectWord(+1);
        }else{
            onSelectWord(-1);
        }

    };

    return(
        <button onClick={handleSelectWord} className={`${selected === true ? 'wordSelected' : 'word'}`}>
            <p>{word}</p>
        </button>
    )
}