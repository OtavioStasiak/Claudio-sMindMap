import { DrawerAdmin } from "../../components/DrawerAdmin";
import {doc, DocumentReference, getDocs} from 'firebase/firestore';
import {updateDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL, listAll, deleteObject, list } from 'firebase/storage';
import { useEffect, useState } from "react";
import { wordsRef, storage } from "../../services/firebase";
import { wordsData } from "../Home";
import { BrandSelectionButton } from "../../components/BrandSelectionButton";
import { ImageSelection } from "../../components/ImageSelection";
import Lottie from 'react-lottie';
import load from "../../animations/loading.json";

import './styles.scss';

export function Banners(){
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

  
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  async function HandleUploadImage(brand: string){
    if(imageUpload === null){
      return;
    };
    const brandId = words?.find((item) => item.brand === brandSelected)?.id;
    const imageRef = ref(storage, `${brandSelected}/${imageUpload.name}`);


    uploadBytes(imageRef, imageUpload)
    .then((response) => AssociateImage(response.metadata.name));

  };

  async function AssociateImage(name: string){
    const imageListRef = ref(storage, `${brandSelected}/`);
    const brandDocRef = doc(wordsRef, brandId);
    const brandDeleteRef = words?.find((item) => item.brand === brandSelected)?.deleteRef;

     await listAll(imageListRef).then((result) => {
      console.log('isHere', brandDeleteRef)
      getDownloadURL(result.items.find(item => item.name === name)!)
      .then(url => {
        if(brandDeleteRef?.[0] === undefined){
          console.log('aqui')
          updateDoc(brandDocRef, 
            {deleteRef: [
              {ref:`${brandSelected}/${name}`,
              url: url
          }]}).then(() =>{FetchBrands();}); 
          return;
        };
        updateDoc(brandDocRef, 
          {deleteRef: [...brandDeleteRef!,
            {ref:`${brandSelected}/${name}`,
            url: url
        }]}).then(() => FetchBrands()); 
        
      } )
    });


  };

  const brandId = words?.find((item) => item.brand === brandSelected)?.id;

  async function DeleteImage(reference: string){
     const brandDocRef = words !== undefined && doc(wordsRef, brandId);
     const deleteRef = ref(storage, reference);
     const deletedArray =  words?.find((item) => item.brand === brandSelected)!.deleteRef?.filter(item => item.ref !== reference);

     await deleteObject(deleteRef).then(() => {});
     updateDoc(brandDocRef as DocumentReference, 
      {deleteRef: deletedArray} as object).then(() => FetchBrands());
  };

  return(
      <div className="admin-container">

          <header className="welcome-header">
              <p>Banners</p>
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
            
            <h3>Agora gerencie os banners</h3>

            <div className="images-organize">
              { words !== undefined && brandSelected !== '' &&
                words?.find((item) => item.brand === brandSelected)!.deleteRef?.map((item, index) => 
                 <ImageSelection 
                  key={index} 
                  handleDeleteImage={() => DeleteImage(item.ref)}
                  imageURL={item.url} 
                  brand={brandSelected} 
                />)
              }
            </div>

            { 
              brandSelected !== '' &&
              <>
                <input className="input-archive" type='file' onChange={(event) => setImageUpload(event.target.files![0])} />
                <button className="upload-button" onClick={() => HandleUploadImage(brandSelected)}>
                  Fazer Upload
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