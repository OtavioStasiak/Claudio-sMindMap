import { useEffect, useState } from 'react';
import './styles.scss';

type Props = {
    imageURL: string | undefined;
    brand: string | undefined;
    onBrandClick: (brand: string) => void;
    brandSelected: string;
};

export function BrandSelectionButton({imageURL, brand, onBrandClick, brandSelected}: Props){
    const [selected, setSelected] = useState(false);

    function onSelect(){
        setSelected(!selected);

        if(selected === false){
            onBrandClick(brand!);
        }else{
            onBrandClick("");
        };

    };
 
    useEffect(() => {
        if(brandSelected !== brand){
            setSelected(false);
        }}, [brandSelected]);


    return(
        <button onClick={onSelect} type='button' className={selected === false ? 'selection-brand' : 'brand-selected'}>
            <img src={imageURL} alt={brand} />
        </button>
    )
}