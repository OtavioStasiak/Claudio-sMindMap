import { ButtonHTMLAttributes } from 'react';
import Glogo from '../../assets/images/google-icon.svg';
import padlock from '../../assets/images/padlock.svg';
import './styles.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    isAdmin?: boolean;
};

export function LoginButton({title, isAdmin = false, ...rest}: Props) {
    return(
        <button className={`${isAdmin === false ? 'button' : 'padlockButton'}`} {...rest}>

            { isAdmin === false
            ?
            <img src={Glogo} />
            :
            <img src={padlock} />
            }
            <p id='title'>{title}</p>
        </button>
    )
}