import React, { useEffect, useState } from 'react';
import { getBezierPath, getMarkerEnd, Position, getEdgeCenter, ArrowHeadType } from 'react-flow-renderer';
import { useEdge } from '../../hooks/useEdge';
import deleteIcon from "../../assets/images/delete.svg";
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
    style: {
      stroke: string;
    }
}


export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId,
  style
}: Props) {
  const {onForceChange, mapActual, setMapActual, setHasDeleted, connectionForce} = useEdge();

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

  
  const forceToConnection = {
    connectionId: id,
    force: value
  };

  function onChangeValue(){
    if(value < 3){
      setValue(value + 1);
      onForceChange({connectionId: id, force: value+1})
    };
    if(value === 3){
      setValue(1);
      onForceChange({connectionId: id, force: 1})

    }
  };

  useEffect(() => {
   const item = connectionForce.find((item) => item.connectionId === id);
   console.log("aquiiii", id, item)

   if(!item?.force){
    setValue(1);
    return;
   };

   setValue(item?.force);

  }, []);
  const strokeAndColor = value === 1 ? {stroke: '#861012', strokeWidth: value+1} : value === 2 ? {stroke: '#ac111b', strokeWidth: value+1} : {stroke: '#e21e35', strokeWidth: value+1};

  function EditActualMap(){
    const mapEditable = mapActual;
    const edgeIndex = mapEditable.findIndex(item => item.id === id);

    if(edgeIndex > -1){
      const mapEdited = mapEditable.filter(item => item.id !== id);

      setMapActual(mapEdited);
      setHasDeleted(true);
    };
  };

  return (
    <>
      <path
        style={strokeAndColor}
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize +40}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize /2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
          <button
            className="custom-button"
            onClick={() => onChangeValue()}
          >
           {value} 
          </button>
          <button onClick={() => EditActualMap()} className="delete-button">
            <img src={deleteIcon} />
          </button> 
    </foreignObject>
  </>
  );
}