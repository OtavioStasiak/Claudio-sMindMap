import { DrawerAdmin } from "../../components/DrawerAdmin";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import closeImg from "../../assets/images/close.svg";
import {getDocs} from 'firebase/firestore';

import './styles.scss';
import { useEffect, useState } from "react";
import { wordsRef } from "../../services/firebase";
import { wordsData } from "../Home";
import { BrandSelectionButton } from "../../components/BrandSelectionButton";


export function Banners(){

  const [brandSelected, setBrandSelected] = useState('');
  const [words, setWords] = useState<wordsData>();

  async function FetchBrands(){
      const response = await getDocs(wordsRef);
      const data = response.docs.map((item) => {return{id: item.id, ...item.data()}});
      setWords(data);
  };

  useEffect(() => {FetchBrands();}, []);

  function FetchBrandImages(){


  };
  

  function HandleUploadImage(brand: string){

  };

  return(
      <div className="admin-container">

          <header className="welcome-header">
              <p>Banners</p>
          </header>

          <DrawerAdmin />

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

            <div>

            </div>

            { brandSelected !== '' &&
              <button onClick={() => HandleUploadImage(brandSelected)}>
               Fazer Upload
              </button>
            }

            <div>
              <button>
                Descartar
              </button>

              <button>
                Confirmar
              </button>
            </div>
          </div>

          <footer className="footer">
              <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
          </footer>

      </div>
  )
}