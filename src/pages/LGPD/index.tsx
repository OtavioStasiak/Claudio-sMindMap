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

export function Lgpd(){
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
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [titleSelected, setTitleSelected] = useState<string []>([]);

  function addTitle(){
    setTitleSelected(prevState => prevState.concat([title]));
    setTitle('');
  };

  const [textSelected, setTextSelected] = useState<string []>([]);

  function addText(){
    setTextSelected(prevState => prevState.concat([text]));
    setText('');
  };

  const finalArray = titleSelected.map((item, index) => {return{title: item, body: textSelected[index]}});

  function AtualizeEndText(){
    const brandDocRef = words !== undefined && doc(wordsRef, brandId);
    updateDoc(brandDocRef as DocumentReference, {
      lgpdBanner: finalArray
    }).then(() => alert('Alteração feita com sucesso!'))
  };

  return(
      <div className="admin-containerII">
        
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
          <div className="banner-content-lgpd">
            <header className="welcome-header">
              <p>Texto LGPD</p>
            </header>
            <h3>Primeiramente Selecione a marca Desejada</h3>

            <div className="specialII">
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
            { 
              brandSelected !== '' &&
              
            <h3>Agora vamos escrever o texto!</h3>
            }

            { 
              brandSelected !== '' &&
              <>
                <h3>Título Aqui</h3>
                <input value={title} type="text" placeholder="Insira o título..." className="styled-input" onChange={item => setTitle(item.target.value)}/>
                <button onClick={addTitle} className="upload-button">
                  Enviar Título
                </button>
              </>
            }

            { 
              brandSelected !== '' &&
              <>
                <h3>Parágrafo aqui</h3>
                <input value={text} type="text" placeholder="Insira o texto..." className="styled-input" onChange={item => setText(item.target.value)}/>
                <button onClick={addText} className="upload-button">
                  Enviar Texto
                </button>
              </>
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
        <div className="lgpd-Text">
          {
            finalArray.map((item, index) => 
            <>
              <h3 key={index}>{item.title}</h3>
              <p key={index}>{item.body}</p>
            </>)
          }
        </div>

      </div>
  )
}