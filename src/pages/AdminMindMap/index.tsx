import { useEffect, useMemo, useState } from 'react';
import ReactFlow, {addEdge, MiniMap, Controls  } from 'react-flow-renderer';
import {getDocs, query, where, updateDoc, collection, addDoc, doc, getDoc} from 'firebase/firestore';
import './styles.scss';
import { finishedMapRef, mindMapRef } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { CustomEdge } from '../../components/CustomEdge';
import { useEdge } from '../../hooks/useEdge';
import { useHistory, useParams } from 'react-router-dom';
import { CustomAdminEdge } from '../../components/CustomAdminEdge';
import { CustomNode } from '../../components/CustomNode';

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

export type itemData = {
    id: string;
    brand?:string;
    force?: [{connectionId: string, force: number}];
    map?: [any];
    user?: {
        id: string;
        email: string;
        avatar: string;
        name: string;
    }
}

type Params = {
    email: string;
}
export function AdminMindMap(){

    const {setMapActual, connectionForce} = useEdge();

    const {email} = useParams<Params>();

    const [words, setWords] = useState<any []>([]);
 
    async function fetchElements(){
        const q = doc(finishedMapRef, email);
        const response = await getDoc(q);
        setWords(response.get("map"))
    };
    
    useEffect(() => {fetchElements()}, []);


    const [elements, setElements] = useState(initialElements);
    const initialMap = words !== undefined ? words.map((item, index) => index === 0 ? {data: {label: <img className='image-central' src={item.data.label}/>}, id: item.id, position: item.position} : item) : [];

    useEffect(() => {setElements(initialMap as any)}, [words]);

    const edgeTypes = {
        buttonedge: CustomAdminEdge,
    };

    function onConnect(params: any){
        const elementsAlterated = elements;
        const test = addEdge(Object.assign(params,
             {type: 'buttonedge', }), elementsAlterated!);
        setElements(test as any);
        setMapActual(test);
    };

    function onLoad(reactFlowInstance: any){
        reactFlowInstance.fitView();
    };

    const history = useHistory();

    function onReturn(){
        history.push('/admin/1hsai5Dsuha10Jc7y428xc/')
    }

    const nodeTypes = {
        special: CustomNode,
    };

    return(
        <div className='mindmapContainer'>
            <ReactFlow
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onLoad={onLoad} 
            elements={elements} 
            onConnect={onConnect} > 
                <MiniMap /> 
                <Controls />
            </ReactFlow>  
            <button onClick={onReturn}  className='continue-button'>
                Voltar
            </button> 
        </div>
    )
}