import closeImg from "../../assets/images/close.svg";

import './styles.scss';

type Props = {
    brand: string;
    imageURL: string;
    bucketCode: string;

};

export function ImageSelection({brand, imageURL, bucketCode}: Props){

    function handleDeleteImage(){
        
    };

    return(
        <div className='banner-image'>
            <button onClick={handleDeleteImage}>
                <img src={closeImg} alt='Descartar Imagem' />
            </button>

            <img src={imageURL} alt={brand} />
        </div>
    )
}