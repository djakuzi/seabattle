import { JSX } from "react";
import styles from './ToggleSliderMainScreen.module.css';
import { PropsToggleSliderMainScreen } from "./ToggleSliderMainScreen.props";

export default function ToggleSliderMainScreen({ className = '' }: PropsToggleSliderMainScreen):JSX.Element {

    const cls = styles['logo'] + ' ' + className;

    return (
        <div className={cls}>
        </div>
    );
}