import closeImg from "../../assets/images/close.svg";
import {deleteObject, ref} from 'firebase/storage';
import './styles.scss';
import { storage } from "../../services/firebase";
import { wordsData } from "../../pages/Home";

type Props = {
    brand: string;
    imageURL: string;
    handleDeleteImage: () => void;
};

export function ImageSelection({brand, imageURL, handleDeleteImage}: Props){

    return(
        <div className='banner-image'>
            <button onClick={handleDeleteImage}>
                <img src={closeImg} alt='Descartar Imagem' />
            </button>

            <img src={imageURL} alt={brand} />
        </div>
    )
}