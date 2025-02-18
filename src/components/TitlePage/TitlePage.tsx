import { JSX } from "react";
import styles from './TitlePage.module.css';
import { PropsTitlePage } from "./TitlePage.props";

export default function TitlePage({children, className, size = 'big'}:PropsTitlePage):JSX.Element {

    const classNameTitle = styles['title'] + ' ' + className;

    return (
        <div className={classNameTitle}>
            <div className={styles['title-txt'] + ' ' + styles['--' + size]}>
                {children}
            </div>
        </div>
    );
}