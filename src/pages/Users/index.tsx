import { DrawerAdmin } from "../../components/DrawerAdmin";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import './styles.scss';
import { useHistory } from "react-router-dom";

export function Users(){


    return(
        <div className="admin-container">

            <header className="welcome-header">
                <p>Participantes</p>
            </header>

            <DrawerAdmin />

            <div className="user-indicator">
                <div className="division"/>  
                <p>Foto</p> 
                <div className="division"/> 
                <p>Nome</p>
                <div className="division"/> 
                <p>E-mail</p> 
                <div className="division"/>
                <p>Possui Mapa</p>
                <div className="division"/>
            </div>

            <div className="user-previews">

            </div>

            <footer className="footer">
                <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
            </footer>

        </div>
    )
}