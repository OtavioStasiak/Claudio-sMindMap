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

import './styles.scss';
import { useHistory } from "react-router-dom";
import { useState } from "react";


export function Users(){


const rows = [
  
];


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


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