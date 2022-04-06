import { DrawerAdmin } from "../../components/DrawerAdmin";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import './styles.scss';

export function Admin(){
    return(
        <div className="admin-container">

            <header className="welcome-header">
                <p>Bem vindo Cláudio!</p>
            </header>
            <DrawerAdmin />


            <div className="content">
                <div className="indicator-container">
                    <p>Usuários: 50</p>
                </div>

                <div className="map-container">
                    <p>Mapas Criados: 50</p>
                </div>  
            </div>

            <div className="preview-indicator">
                 <p>Mapas Mais Recentes</p>
            </div>

            <div className="previews">

            </div>

            <footer className="footer">
                <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
            </footer>

        </div>
    )
}