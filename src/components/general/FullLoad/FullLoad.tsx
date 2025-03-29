import { JSX, useEffect } from "react";
import styles from './FullLoad.module.css';
import { PropsFullLoad } from "./FullLoad.props";
import cn from "classnames";
import changeTheme from "../../../scripts/visual/changeTheme";

export default function FullLoad({ cls = '', text = "Загрузка..", type = "full_page"}: PropsFullLoad): JSX.Element {

    useEffect(() => {
        changeTheme('set');
    });

    if (type === 'full_page') {
        return (
            <div className={cn(styles['load'], styles['--full-page'], cls)}>
                <div className={cn(styles['load__wrapper'])}>
                    <div className={styles['title']}>{text}</div>
                    <div className={styles['anchor']}>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                        <div className={styles['anchor__front']}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'test') {
        return (
            <div className={cn(styles['load'], styles['--full-page'], cls)}>
                <div className={cn(styles['load__wrapper'])}>
                    <div className={styles['title']}>{text}</div>
                    <div className={styles['wave']}>
                    </div>
                    <div className={styles['ship']}>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(styles['logo'], cls)}>
            загрузка
        </div>
    );
}