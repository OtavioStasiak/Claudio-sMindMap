import { useEffect, useState } from 'react';
import ReactFlow, {addEdge, MiniMap, Controls  } from 'react-flow-renderer';
import {getDocs, query, where} from 'firebase/firestore';
import './styles.scss';
import { mindMapRef } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

const width = 50%window.innerWidth;
const height = 50%window.innerHeight;
const initialElements = [
    { id: '1', data: { label: "McDonalds" }, position:{x: width, y: height} },
  ];    

type initialData = {
    id: string;
    user?: string;
    initialMap?: [
        {
        id: string;
        data:{
          label: string;
        },
        position: {
            x: number;
            y: number;
        }

    }];

}[];


export function MindMap(){

    const {user} = useAuth();

    const [words, setWords] = useState<initialData>();

    async function fetchElements(){
        const q = query(mindMapRef, where("user", '==', user.email));
        const response = await getDocs(q);

        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
        setWords(data);
    };
    
    useEffect(() => {fetchElements()}, []);

    const [elements, setElements] = useState(initialElements);
    const initialMap = words !== undefined ? words[0]?.initialMap : [];
    useEffect(() => {setElements(initialMap as any)}, [words])

    function onConnect(params: any){
        const elementsAlterated = elements;
        const test = addEdge(params, elementsAlterated!);
        setElements(test as any);
    };

    function onLoad(reactFlowInstance: any){
        reactFlowInstance.fitView();
    };

    return(
    <div className='mindmapContainer'>
        <ReactFlow
     
        onLoad={onLoad} 
        elements={elements!} 
        onConnect={onConnect} > 
            <MiniMap /> 
            <Controls />
        </ReactFlow>   
    </div>

)
}