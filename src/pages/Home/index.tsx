import { WordSelection } from '../../components/WordSelection';
import arrowRight from '../../assets/images/right-arrow.svg';
import {useHistory} from 'react-router-dom';
import './styles.scss';

export function Home(){
    const history = useHistory();

    function handleGoToMindMap(){
        history.push('/mind-map/');
    };
    return(
        <div className="container">

            <h1>Bem Vindo(a)!</h1>

            <div className="title">

                <div className="circleIndicator">
                   <p>1º</p> 
                </div>

                <p className="description">Selecione as Palavras para criar o mapa mental.</p>

            </div>

            <div className='word-field'>

                <div className='word-lines'>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                </div>

                <div className='word-lines'>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                </div>

                <div className='word-lines'>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                </div>

                <div className='word-lines'>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                </div>

                <div className='word-lines'>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                    <WordSelection/>
                </div>
               
            </div>

            <footer className="continue-footer">

                <h2>Palavras Selecionadas: 2</h2>

                <button onClick={handleGoToMindMap} className="continue-button">
                    <p>Continuar</p>
                    <img src={arrowRight} color="#fff" />
                </button>

            </footer>
           
        </div>
    )
}