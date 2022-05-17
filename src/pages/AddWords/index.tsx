import { DrawerAdmin } from "../../components/DrawerAdmin";

import './styles.scss';

export type newUserData = {
    id: string;
    name: string;
    avatar: string;
    email: string | null;
    hasMap: number;
};

export function AddWords(){

    return(
        <div className="admin-container">

            <header className="welcome-header">
                <p>Adicionar Marca</p>
            </header>
            <DrawerAdmin />
           <div>

            <span>Nome da Marca:</span>

            <span>Logo da Marca:</span>

            <span>Palavras:</span>

            <input placeholder="Insira as palavras aqui"/>

            <span><strong>OBS: </strong>Insira no seguinte Padrão: palavraI, palavraII,... .</span>

           </div>
            <footer className="footer">
                <p className="footer-title">Desenvolvido por Otávio Stasiak</p>
            </footer>

        </div>
    )
}