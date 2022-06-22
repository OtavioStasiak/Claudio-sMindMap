import { DrawerAdmin } from "../../components/DrawerAdmin";
import {doc, DocumentReference, getDocs} from 'firebase/firestore';
import {updateDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL, listAll, deleteObject, list } from 'firebase/storage';
import { useEffect, useState } from "react";
import { wordsRef, storage, firestore } from "../../services/firebase";
import { wordsData } from "../Home";
import { BrandSelectionButton } from "../../components/BrandSelectionButton";
import { ImageSelection } from "../../components/ImageSelection";
import Lottie from 'react-lottie';
import load from "../../animations/loading.json";

import './styles.scss';

export function FinalMessage(){
  const [loading, setLoading] = useState(false);
  const [brandSelected, setBrandSelected] = useState('');

  const [words, setWords] = useState<wordsData>();

  async function FetchBrands(){
      setLoading(true);
      const response = await getDocs(wordsRef);
      const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
      setWords(data);
      setLoading(false);
  };

  useEffect(() => {FetchBrands();}, []);

  const brandId = words?.find((item) => item.brand === brandSelected)?.id;
  const [text, setText] = useState('');

  function AtualizeEndText(){
    const brandDocRef = words !== undefined && doc(wordsRef, brandId);
    updateDoc(brandDocRef as DocumentReference, {
      FinalMessage: text
    }).then(() => alert('Alteração feita com sucesso!'))
  };

  
  return(
      <div className="admin-container">

          <header className="welcome-header">
              <p>Mensagem Final</p>
          </header>

          <DrawerAdmin />
        { 
          loading
          ?
          <Lottie options={{loop: true, autoplay:true, animationData: load, rendererSettings: {
                preserveAspectRatio: 'xMidYmid slice'
            }}}
            style={{paddingRight:20}}
            height={100}
            width={100}
          />
          :
          <div className="banner-content">
            <h3>Primeiramente Selecione a marca Desejada</h3>

            <div>
              {
                words?.map((item, index) => 
                <BrandSelectionButton 
                 brandSelected={brandSelected} 
                 onBrandClick={(brand) => setBrandSelected(brand!)} 
                 key={index} 
                 brand={item.brand} 
                 imageURL={item?.logo}
                  />)
              }
            </div>
            
            <h3>Agora escreva a mensagem final</h3>
            { 
              brandSelected !== '' &&
              <input type="text" placeholder="Insira a Mensagem Final..." className="styled-input" onChange={item => setText(item.target.value)}/>
            }


            { 
              brandSelected !== '' &&
              <>
                <button onClick={AtualizeEndText} className="upload-button">
                  CONCLUIR ALTERAÇÕES
                </button>
              </>
            }

          </div>
        }

          <footer className="footer">
              <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
          </footer>

      </div>
  )
}