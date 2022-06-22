import { Drawer } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

import './styles.scss';
import { useHistory } from "react-router-dom";


export function DrawerAdmin(){
    const drawerWidth = 240;
    const history = useHistory();

    function handleNavigateToHome(){
      history.push('/admin/1hsai5Dsuha10Jc7y428xc/');
    };

    function handleNavigateToMap(){
      history.push('/admin/addwords/');
    };

    function handleNavigateToUsers(){
      history.push('/admin/banners');
    };

    function handleNavigateToFinalEdit(){
      history.push('admin/finalmessage/');
    }

    function handleLogOut(){
      history.push('/');
    };

    return(
    <Drawer
    variant="permanent"
    sx={{
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, alignItems: 'center', paddingTop: 10, backgroundColor: '#0e1012' },
    }}
    open>

      <AccountCircleIcon sx={{fontSize:  100, color: "white" }} />

      <div className="main-buttons">

      <button onClick={handleNavigateToHome} className="drawer-button">
            <HomeIcon sx={{ color: "white" }} />
            <p className="title-button">Home</p>
        </button>

        {/*
        <button className="drawer-button">
            <AccountTreeIcon sx={{ color: "white" }} />
            <p className="title-button">Mapas</p>
        </button>*/}

        <button onClick={handleNavigateToMap} className="drawer-button">
            <AddBoxIcon  sx={{ color: "white" }} />
            <p className="title-button">Adicionar Marca</p>
        </button> 

        <button onClick={handleNavigateToUsers} className="drawer-button">
            <CollectionsIcon sx={{ color: "white" }} />
            <p className="title-button">Gerenciar Banners</p>
        </button>

        <button onClick={handleNavigateToFinalEdit} className="drawer-button">
            <TextSnippetIcon sx={{ color: "white" }} />
            <p className="title-button">Gerenciar link final</p>
        </button>

      </div>

        <button onClick={handleLogOut} className="bottom-button">
            <LogoutIcon  sx={{ color: "white "}} />
            <p className="title-button">Sair</p>
        </button>

        <strong className="final-footer">Desenvolvido por Otávio Stasiak</strong>
    
  </Drawer>
    );
};