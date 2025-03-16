import { JSX } from "react";
import styles from './ChangeTheme.module.css';
import { PropsChangeTheme } from "./ChangeTheme.props";
import changeTheme from "../../../scripts/visual/changeTheme";

export default function ChangeTheme({className}: PropsChangeTheme):JSX.Element {

    const classNameTheme = styles['switch'] + ' ' + className;

    return (
        <div className={classNameTheme} onClick={() => changeTheme('toggle')}>
            <div className={styles['switch__toggle']}>
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
        </div>
    );
}