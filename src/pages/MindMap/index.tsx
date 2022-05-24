import { useEffect, useState } from 'react';
import ReactFlow, {addEdge, MiniMap, Controls  } from 'react-flow-renderer';
import {getDocs, query, where, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import './styles.scss';
import { finishedMapRef, mindMapRef, usersRef } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { CustomEdge } from '../../components/CustomEdge';
import { useEdge } from '../../hooks/useEdge';
import { useHistory } from 'react-router-dom';
import Modal from "react-modal";
import { CustomNode } from '../../components/CustomNode';

const width = 50%window.innerWidth;
const height = 50%window.innerHeight;
const initialElements = [
    { id: '1', data: { label: "McDonalds" }, position:{x: width, y: height} },
  ];    

type initialData = {
    id: string;
    user?: string;
    brand?: string;
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

    const [visible, setVisible] = useState(true);

    const {user} = useAuth();
    const {setMapActual, connectionForce, mapActual, hasDeleted, setHasDeleted} = useEdge();

    const [words, setWords] = useState<initialData>();

    async function fetchElements(){
        const q = query(mindMapRef, where("user", '==', user.email));
        const response = await getDocs(q);

        const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
  
        setWords(data);
    };

    const [elements, setElements] = useState(initialElements);
    const initialMap = words !== undefined ? words[0]?.initialMap?.map((item, index) => index === 0 ? {data: {label: <img className='image-central' src={item.data.label}/>}, id: item.id, position: item.position, type: "special"} : item) : [];

    useEffect(() => {fetchElements()}, []);
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

       const brand = words !== undefined && words[0].brand;
       
       await addDoc(finishedMapRef, {
            map: elementsEditable,
            force: connectionForce,
            user,
            brand: brand
        });
        
        const q = query(usersRef ,where("email", "==", user.email));
        const fetchDocID = getDocs(q);
        const data = (await fetchDocID).docs.map((item) => {return{id: item.id, ...item.data()}});
        const userDocRef = doc(usersRef, data[0].id);

        updateDoc(userDocRef,{hasMap: 1});
        
        deleteDoc(docRef);
        
        history.push('/finished/');
    };


    function onChangePosition(changed: ChangePositionData | any){
        const elementsEditable = elements; 
        const x = changed.screenX * 0.7;
        const y = changed.screenY * 0.5;
        const labelToChange = changed.target.innerText;

        const findIndexToEdit = elementsEditable.findIndex(item => item.data.label === labelToChange);

        if(findIndexToEdit !== -1){
            elementsEditable[findIndexToEdit].position.x = x;
            elementsEditable[findIndexToEdit].position.y = y;

            setElements(elementsEditable);
            return;
        }else{
            console.log('aqui')
            elementsEditable[0].position.x = x;
            elementsEditable[0].position.y = y;
            setElements(elementsEditable);
            return;
        }

    };

    useEffect(() => {
        if(hasDeleted === true){
            setElements(mapActual as any);
            setHasDeleted(false);
            return;
        }
    }, [mapActual, hasDeleted]);

    function onOk(){
        setVisible(false); 
    };

    const nodeTypes = {
        special: CustomNode,
    };


    window.onpopstate = function(){
        const docRef = doc(mindMapRef, words![0].id);

        deleteDoc(docRef);
    };
    
    return(
        <div className='mindmapContainer'>
             <Modal overlayClassName="react-modal-overlay" className="react-modal-content"  isOpen={visible}>
               <div className='instruction'>
                    <h1>MAPA MENTAL</h1>

                    <div>
                        INSTRUÇÕES
                    </div>

                    <span>
                      Para a construção do Mapa Mental você pode arrastar as<br/>palavras pela tela para organizá-las.
                    </span>

                    <ul>
                      <li>Deixe as palavras que considera mais importantes<br/>próximas da marca.</li>
                      <li>Para criar as conexões entre as palavras e a marca, clique<br/>na bolinha preta (em baixo ou em cima da palavra) e<br/>arraste até a bolinha preta da marca ou de outra palavra.</li>
                      <li>Você não precisa conectar todas as palavras diretamente<br/>na marca.</li>
                      <li>Você também pode conectar uma palavra a outra,<br/>criando uma conexão segundária (mais longe da marca).</li>
                      <li>Após conectar uma palavra (na marca ou à outra palavra)<br/>irá aparecer uma linha com um número.</li>
                      <li>Após a conexão você pode dar um peso maior para essa<br/>conexão clicando no número:<br/>1 - conexão fraca;<br/>2 - conexão média;<br/>3 - conexão forte.</li>
                      <li>Caso precise apagar a conexão clique na lixeira ao lado<br/>do número.</li>
                    </ul>
                   
                    <button onClick={onOk}>
                        Ok, vamos lá!
                    </button>
                </div>
            </Modal>
           { visible === false  &&
            <ReactFlow
                onNodeDragStop={(item) => onChangePosition(item)}
                edgeTypes={edgeTypes}
                onLoad={onLoad} 
                elements={elements!} 
                onConnect={onConnect} 
                nodeTypes={nodeTypes}> 
                    <MiniMap /> 
                    <Controls />
                </ReactFlow> 
            } 
            <div className='bottom-map'>
                <button onClick={() => setVisible(true)} className='continue-button'>
                 REVER INSTRUÇÕES 
                </button>
                <button onClick={onFinishMap} className='continue-button'>
                 FINALIZAR MAPA
                </button> 
            </div>
            
           
        </div>
    )
}