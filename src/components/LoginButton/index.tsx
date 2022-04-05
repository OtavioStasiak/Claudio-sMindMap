import Glogo from '../../assets/images/google-icon.svg';
import './styles.scss';

type Props = {
    title: string;
};

export function LoginButton({title}: Props) {
    return(
        <button >
            <img src={Glogo} />
            <p id='title'>{title}</p>
        </button>
    )
}