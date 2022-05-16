import { getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { getBezierPath, getMarkerEnd, Position, getEdgeCenter, ArrowHeadType } from 'react-flow-renderer';
import { useEdge } from '../../hooks/useEdge';
import { itemData } from '../../pages/AdminMindMap';
import { finishedMapRef } from '../../services/firebase';

import "./styles.scss";

type Props = {
    id: string;
    sourceX: number;
    sourceId: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: Position;
    targetPosition: Position;
    markerEndId: string | undefined;
    data: {
        text: string
    },
    arrowHeadType: ArrowHeadType;

}


export function CustomAdminEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId
}: Props) {

  const {emailSelected} = useEdge();

  const foreignObjectSize = 40;
  const [value, setValue] = useState(1);
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const [words, setWords] = useState<itemData []>([]);

  async function fetchForce(){
    const q = query(finishedMapRef, where("user.email", '==', emailSelected));
    const response = await getDocs(q);

    const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
    setWords(data); 
  };

  useEffect(() => {fetchForce()}, [emailSelected]);

  const [force, setForce] = useState(0)
  async function verifyForce(){
    const data = words[0].force;

    let findForce = data?.find(item => item.connectionId === id);

    console.log(data, findForce)
    setForce(findForce?.force!)
  }

  useEffect(() => {verifyForce()}, [words, emailSelected]);
  
  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
          <div
            className="custom-button"
          >
           {force}
          </div>
    </foreignObject>
  </>
  );
}