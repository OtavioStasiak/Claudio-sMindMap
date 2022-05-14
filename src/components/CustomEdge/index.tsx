import React from 'react';
import { getBezierPath, getMarkerEnd, Position } from 'react-flow-renderer';

type Props = {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: Position;
    targetPosition: Position;
    markerEnd: string | undefined;
    data: {
        text: string
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
  markerEnd,
}: Props) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
     
        <body>
          <button className="edgebutton" onClick={(event) => console.log(event, id)}>
            oaisaosoi
          </button>
        </body>
    </>
  );
}