import { JSX } from "react";
import styles from './Logo.module.css';
import { PropsLogo } from "./Logo.props";

export default function Logo({className = '', size = 'big'}:PropsLogo):JSX.Element {

    const classNameLogo = styles['logo'] + ' ' + className;

    return (
        <div className={classNameLogo}>
            <div className={styles['logo__title']}>
                <div className={styles['logo__title-txt'] + ' ' + styles['--' + size]}>
                    МОРСКОЙ БОЙ
                </div>
            </div>
            <div className={styles['logo__author']}>
                <div className={styles['logo__author-txt'] + ' ' + styles['--' + size]}>
                    By djakuzi
                </div>
            </div>
        </div>
    );
}