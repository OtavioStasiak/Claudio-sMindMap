import { Drawer } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import './styles.scss';
import { useHistory } from "react-router-dom";


export function DrawerAdmin(){
    const drawerWidth = 240;
    const history = useHistory();

    function handleNavigateToHome(){
      history.push('/admin/');
    };

    function handleNavigateToMap(){
      history.push('/mind-map/');
    };

    function handleNavigateToUsers(){
      history.push('/admin/users');
    };

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

        <button onClick={handleNavigateToUsers} className="drawer-button">
            <GroupIcon sx={{ color: "white" }} />
            <p className="title-button">Participantes</p>
        </button>

        <button className="drawer-button">
            <AccountTreeIcon sx={{ color: "white" }} />
            <p className="title-button">Mapas</p>
        </button>

        <button onClick={handleNavigateToMap} className="drawer-button">
            <PsychologyIcon  sx={{ color: "white" }} />
            <p className="title-button">Criar um mapa</p>
        </button>
      </div>

        <button onClick={handleLogOut} className="bottom-button">
            <LogoutIcon  sx={{ color: "white "}} />
            <p className="title-button">Sair</p>
        </button>
    
  </Drawer>
    );
};