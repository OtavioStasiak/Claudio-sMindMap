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

            <div className="user-previews">

            </div>

            <footer className="footer">
                <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
            </footer>

        </div>
    )
}