import { JSX } from "react";
import styles from './TitlePage.module.css';
import { PropsChangeTheme } from "./ChangeTheme.props";

export default function ChangeTheme({ children, className, size = 'big' }: PropsChangeTheme):JSX.Element {

    const classNameTitle = styles['title'] + ' ' + className;

    return (
        <div className={classNameTitle}>
            <div className={styles['title-txt'] + ' ' + styles['--' + size]}>
                {children}
            </div>
        </div>
    );
}