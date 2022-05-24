import { Handle, Position } from 'react-flow-renderer';



export function CustomNode(data: any){

    const customNodeStyles = {
        background: '#fff',
        color: '#000',
        padding:15,
        width: 160,
        borderRadius: 3,
        alignItems: 'center',
        display: "flex",
        justifyContent: "center",
        
      };
    
      
    return(
        
        <div style={customNodeStyles}>
            <Handle type="target" position={Position.Top} style={{ width: 12, height: 12, borderRadius: 7.5, background: '#1CAD36' }} />
            <div style={{textAlign: "center"}}>{data.data.label}</div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={{  width: 12, height: 12, borderRadius: 7.5, background: '#1CAD36'  }}
            />
        </div>
    )
}