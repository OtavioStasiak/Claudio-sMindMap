import { useState } from 'react';
import './styles.scss';

export function WordSelection(){
    const [selected, setSelected] = useState(false);

    function handleSelectWord(){
        setSelected(!selected);
    };

    return(
        <button onClick={handleSelectWord} className={`${selected === true ? 'wordSelected' : 'word'}`}>
            <p>title</p>
        </button>
    )
}