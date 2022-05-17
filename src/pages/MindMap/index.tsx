import { useEffect, useState } from 'react';
import ReactFlow, {addEdge, MiniMap, Controls  } from 'react-flow-renderer';
import firestore, {getDocs, query, where, addDoc, deleteDoc, doc} from 'firebase/firestore';
import './styles.scss';
import { finishedMapRef, mindMapRef } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { CustomEdge } from '../../components/CustomEdge';
import { useEdge } from '../../hooks/useEdge';
import { useHistory } from 'react-router-dom';

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

type ChangePositionData = {
    screenX: number;
    screenY: number;
    path: [];
    target: {
        children:  {
            props: string
        }
    }
}

export function MindMap(){

    const {user} = useAuth();
    const {setMapActual, connectionForce, mapActual, hasDeleted, setHasDeleted} = useEdge();

    const [words, setWords] = useState<initialData>();

    async function fetchElements(){
        const q = query(mindMapRef, where("user", '==', user.email));
        const response = await getDocs(q);

        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
  
        setWords(data);
    };
    
    useEffect(() => {fetchElements()}, []);


    const [elements, setElements] = useState(initialElements);
    const initialMap = words !== undefined ? words[0]?.initialMap?.map((item, index) => index === 0 ? {data: {label: <img className='image-central' src={item.data.label}/>}, id: item.id, position: item.position} : item) : [];

    useEffect(() => {setElements(initialMap as any)}, [words]);

    const edgeTypes = {
        buttonedge: CustomEdge,
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

    async function onFinishMap(){
       const docRef = doc(mindMapRef, words![0].id);
        const elementsEditable = elements;
        const wordsInitial = words !== undefined ? words[0].initialMap![0] : {id: "",
            data: {
                label: ""
            },
            position: {
                x: 0,
                y: 0
            }};

        elementsEditable[0] = wordsInitial;

       await addDoc(finishedMapRef, {
            map: elementsEditable,
            force: connectionForce,
            user
        });
        
        deleteDoc(docRef);
        
        history.push('/finished/');
    };

    function onChangePosition(changed: ChangePositionData | any){
        const elementsEditable = elements; 
        const x = changed.screenX/2;
        const y = changed.screenY/2 ;
        const idToChange = changed.target.children[0].outerHTML.split('<div data-nodeid=')[1].split(' ')[0].split('"')[1];

        const findIndexToEdit = elementsEditable.findIndex(item => item.id === idToChange);

        if(findIndexToEdit !== -1){
            elementsEditable[findIndexToEdit].position.x = x;
            elementsEditable[findIndexToEdit].position.y = y;

            console.log(elementsEditable)
            setElements(elementsEditable);
        };

    };

    useEffect(() => {
        if(hasDeleted === true){
            setElements(mapActual as any);
            setHasDeleted(false);
            return;
        }
    }, [mapActual, hasDeleted]);

    return(
        <div className='mindmapContainer'>
            <ReactFlow
            onNodeDragStop={(item) => onChangePosition(item)}
            edgeTypes={edgeTypes}
            onLoad={onLoad} 
            elements={elements!} 
            onConnect={onConnect} > 
                <MiniMap /> 
                <Controls />
            </ReactFlow>  
            <button onClick={onFinishMap} className='continue-button'>
                CONTINUAR
            </button> 
        </div>
    )
}