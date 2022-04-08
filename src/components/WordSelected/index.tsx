import { useState } from 'react';
import Draggable, {DraggableEventHandler} from 'react-draggable';

import './styles.scss';

export function WordSelected(){
    const [selected, setSelected] = useState(false);

    function handleSelectWord(){
        setSelected(!selected);
    };

    return(
        <Draggable axis='x' handle='.handle' grid={[25, 25]} 
        scale={1}>
            <button onClick={handleSelectWord} className={`${selected === true ? 'wordSelected' : 'word'}`}>
                <p>Title</p>
            </button>
        </Draggable>
    )
}