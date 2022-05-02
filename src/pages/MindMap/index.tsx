import { useState } from 'react';
import ReactFlow, {addEdge, MiniMap, Controls  } from 'react-flow-renderer';

import './styles.scss';

const width = 50%window.innerWidth;
const height = 50%window.innerHeight;
const initialElements = [
    { id: '1', data: { label: <button>McDonalds</button> }, position:{x: width, y: height} },
  ];    

export function MindMap(){

    const [elements, setElements] = useState(initialElements);
    
    function onConnect(params: any){
        const elementsAlterated = elements;
        const test = addEdge(params, elementsAlterated);
        setElements(test as any);
    };

    function onLoad(reactFlowInstance: any){
    reactFlowInstance.fitView();
    };

    return(
    <div className='mindmapContainer'>
        <ReactFlow 
        onLoad={onLoad} 
        elements={elements} 
        onConnect={onConnect} > 
        <MiniMap /> 
        <Controls />
        </ReactFlow>   
    </div>

)
}